'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const config = require('./config.json');
const getDetections = require('./image_analysis/cat_attr').getDetections;
const parseVisionData = require('./image_analysis/cat_attr').parseVisionData;
const getPets = require('./util/petfinder')

const Shelter = require('./util/mongo')
const shelterAuth = require('./util/shelterAccounts')


var app = express();

var cookieParser = require('cookie-parser');
var session = require('cookie-session');

app.use(cookieParser());
app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));




// 3rd party middleware
app.use(cors())

app.use(bodyParser.json({
	limit : config.bodyLimit
}));


var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

var db = mongoose.connect(uri);

app.use(passport.initialize());
app.use(passport.session());

passport.use(Shelter.createStrategy());
passport.serializeUser(Shelter.serializeUser());
passport.deserializeUser(Shelter.deserializeUser());



app.use('/shelterAuth', shelterAuth);



app.get('/test', (req, res) => {
	res.send("Api call complete!")
});

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
	var image = new Buffer(req.file.buffer)
	handleUpload(image, res);
		//at scale : will just upload to aws lambda function

});

function handleUpload(image, res) {
	getDetections(image)
		.then( (detections) => {

			if(detections[0] !== 'cat') {
				res.send({'isCat' : false});

			} else {
				parseVisionData(detections)
					.then( (params) => {

						res.send({
							'isCat' : true,
							'breed': params.breed,
							'size': params.size
						})
				});
			}
		})

}


app.post('/search', (req, res) => {
	var params = req.body;
	getPets(params, res);

});



module.exports = app;

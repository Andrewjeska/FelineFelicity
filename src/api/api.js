'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const config = require('./config.json');
const getDetections = require('./image_analysis/cat_attr').getDetections;
const parseVisionData = require('./image_analysis/cat_attr').parseVisionData;
const getPets = require('./lib/petfinder')


var app = express();

// 3rd party middleware
app.use(cors())

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

//var temp = {};


app.get('/test', (req, res)=> {
	res.send("Api call complete!")
});

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
							'params': params
						})
				});
			}
		})

}

app.post('/search', (req, res) => {
	var params = req.body;
	console.log(params);
	getPets(params, res);

});



module.exports = app;

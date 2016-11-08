'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const config = require('./config.json');
const getDetections = require('./image_analysis/cat_attr').getDetections;
const parseVisionData = require('./image_analysis/cat_attr').parseVisionData;

var app = express();

// 3rd party middleware
app.use(cors())

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

//var temp = {};


app.get('/api/test', (req, res)=> {
	res.send("Api call complete!")
});

app.post('/api/upload', upload.single('file'), (req, res) => {
	//temp = req.file.buffer;
	console.log(req.file);
	handleUpload(req, res);
	//at scale : will just upload to aws lambda function

});

function handleUpload(req, res) {
	getDetections(req.file.buffer)
		.then( (detections) => {

			if(detections[0] !== 'cat') {
				res.send({'isCat' : false});

			} else {
				parseVisionData(detections)
					.then( (params) => {
						//res.send(response from petfinder api), append isCat
						res.send({'isCat' : true})
					});
			}
		})

	//res.send({'error':'functions did not run'})

}


//starting app
app.listen(config.port)
//server.listen(process.env.PORT || config.port);

console.log(`API server started on port 3000`);



//module.exports = app;

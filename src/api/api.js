'use strict';
//const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//import createEngine from 'express-react-views';
//const createEngine = require('express-react-views').createEngine;
//const initializeDb = require('./db')
//const middleware = require('./middleware');
//const api = require('./api');
const config = require('./config.json');
//import reload from 'reload'


var app = express();
//var server = http.createServer(app);

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

//app.use(express.static(__dirname + '/public'));

//app.set('views', __dirname + '/views');
//app.set('view engine', 'jsx');
//app.engine('jsx', createEngine());


//reload(server, app, true);

	// internal middleware
//app.use(middleware(config));

// api router
//app.use('/api', api(config));
app.get('/api/test', (req, res)=> {
	res.send("Api call complete!")
});

app.post('api/upload', (req, res) => {
	res.send('attempt file upload')
});


//starting app
app.listen(config.port)
//server.listen(process.env.PORT || config.port);

console.log(`API server started on port 3000`);



//module.exports = app;
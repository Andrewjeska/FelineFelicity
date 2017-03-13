
var mongoose = require('mongoose');
//var db = require('../api').db
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');


var Shelter = Schema(
											{
												name: String,
												city: String,
												state: String,
												postal: Number

											});

Shelter.plugin(passportLocalMongoose);


module.exports = mongoose.model('shelterModel', Shelter);
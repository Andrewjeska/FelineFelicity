var Shelter = require('./mongo');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('express')();





routes.post('/register', (req, res) => {
	Shelter.register(new Shelter({name: req.body.name, city: req.body.city, state: req.body.state, postal: req.body.postal, username: req.body.username}), req.body.password, (err) => {
		if (err) {
			console.log(err)
      return res.send(err);
    }

    console.log('shelter registered')

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
      //redirect to dashboard
      //else we just send a positive response if this doesn't work
    });



	})
});

routes.post('/login', passport.authenticate('local'), (req, res) => {
	res.redirect('/');
	//redirect to dashboard
});



routes.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});



module.exports = routes
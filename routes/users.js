var express = require('express');
var router = express.Router();
var User = require('../models/User');
var md5 = require('md5');

// REGISTER FUNCTION
router.register = function(req,res) {
	if(req.body.username && req.body.password && req.body.name && req.body.type)
	{
		let username = req.body.username;
		let password = md5(req.body.password); //HASHING PASSWORD
		let name = req.body.name;
		let type = req.body.type;

		let newUser = new User({
			username: username,
			password: password,
			name: name,
			type: type,
			created_at: new Date()
		})

		newUser.save(function(err){
			if(!err)
				return res.json({status: true, message: 'User created.'});
			else
				return res.json({status: false, message: 'Error'});
		})

	}
	else
		return res.json({status: false, message: 'All fields are required'});
}

// LOGIN FUNCTION
router.login = function(req,res) {

	if(req.body.username && req.body.password)
	{
		let username = req.body.username;
		let password = md5(req.body.password);

		User.count({username: username, password: password},function(err,count){
			if(!err)
			{

				if(count)
				{
					User.find({username: username}, function(err,user){

						if(!err)
						{
							// SETTING SESSIONS
							req.session.username = username;
							req.session.type = user[0].type;

							return res.json({status: true, message: 'Logged in'});		
						}
						else
							return res.json({status: false, message: 'Error.'});		
					})
					
					
				}
				else
					return res.json({status: false, message: 'Invalid credentials'});
			}
			else
				return res.json({status: false, message: 'Error.'});
		})
	}
}




module.exports = router;

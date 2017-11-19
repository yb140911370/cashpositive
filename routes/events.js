var express = require('express');
var router = express.Router();
var Event = require('../models/Event');
var Comment = require('../models/Comment');


// GET ALL EVENTS
router.getAll = function(req,res) {
	Event.find({},function(err,events){
		return res.json({events: events});
	})
}


// GET DETAILS OF A PARTICULAR EVENT
router.fetch = function(req,res) {
	let title = req.params.title;
	
	Event.findOne({title: title},function(err,event){
		if(event)
		{
			event = event.toJSON();	
			event.comments = [];
			Comment.find({title: title},function(err,comments){
				for(let i = 0;i < comments.length;i++)
					event.comments.push({comment:comments[i].comment,username: comments[i].username,date: comments[i].date});
				

				res.json(event);
				
			})
		}
	})
}

// CREATE AN EVENT

router.create = function(req,res) {
	// CHECK FOR SESSION AND IF THE USER IS AN ORGANISER
	if(req.session.username && req.session.type == 2)
	{
		if(req.body.title && req.body.location && req.body.date && req.body.organiser && req.body.description && req.body.price)
		{
			let newEvent = new Event({
				title : req.body.title,
				location : req.body.location,
				date : req.body.date,
				organiser : req.body.organiser,
				description : req.body.description,
				price : req.body.price
			});

			newEvent.save(function(err){
				if(!err)
					return res.json({status: true, message: 'Created.'});
				else
				{
					console.log(err)
					return res.json({status: false, message: 'Error.'});
				}
			})

		}
		else
			return res.json({status: false, message: 'All fields are required.'});
	}
	else
		return res.json({status: false, message: 'You must be logged in and must be an organiser to create an event.'});
}

// DELETE AN EVENT

router.delete = function(req,res) {
	// CHECK FOR SESSION AND IF THE USER IS AN ORGANISER
	if(req.session.username && req.session.type == 2)
	{
		if(req.params.title)
		{
			Event.findOneAndRemove({title: req.params.title},function(err){
				if(!err)
					return res.json({status: true, message: 'Deleted.'});
				else
					return res.json({status: false, message: 'Error.'});
			})
		}
		else
			return res.json({status: false, message: 'All fields are required.'});
	}
	else
		return res.json({status: false, message: 'You must be logged in and must be an organiser to delete an event.'});
}

// UPDATE AN EVENT

router.update = function(req,res) {
	// CHECK FOR SESSION AND IF THE USER IS AN ORGANISER
	if(req.session.username && req.session.type == 2)
	{
		if(req.body.title && req.body.location && req.body.date && req.body.organiser && req.body.description && req.body.price)
		{
			Event.findOneAndUpdate({title: req.body.title},{title:req.body.titlenew,location : req.body.location,
				date : req.body.date,
				organiser : req.body.organiser,
				description : req.body.description,
				price : req.body.price},function(err,event){
					if(!err)
						return res.json({status: true, message: 'Updated.'});
					else
						return res.json({status: false, message: 'Error.'});
				})
		}
		else
			return res.json({status: false, message: 'All fields are required'});
	}
	else
		return res.json({status: false, message: 'You must be logged in and must be an organiser to update an event.'});
}

// ADD COMMENTS

router.addComment = function(req,res) {
	// CHECK FOR SESSION AND IF THE USER IS A PARTICIPANT
	if(req.session.username && req.session.type == 1) 
	{
		if(req.body.title && req.body.comment)
		{
			let newComment = new Comment({
				username: req.session.username,
				title: req.body.title,
				comment: req.body.comment,
				date: new Date()
			})

			newComment.save(function(err){
				if(!err)
					res.json({status: true, message: 'Comment added'});
				else
					res.json({status: false, message: 'Error'});
				

			})
		}
		else
			res.json({status: false, message: 'All fields are required'});
	}
	else
		res.json({status: false, message: 'You must be logged in and must be an participant to add a comment.'});

}

module.exports = router;
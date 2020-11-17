const {Post} = require('../model/db')
const multer = require('multer')
const path = require('path');
//modifies storage path and file name
const storage = multer.diskStorage({
	destination: './uploads/',
	filename: function(req, file, cb){
		cb(null, file.originalname);
  }
});

var upload = multer({storage : storage});

//Adds new posts to database also adds uploaded files to filesystem
addPost = async function(req,res) {
	decodedToken = req.decodedToken
	postData = {
		userId : decodedToken.userId,
		topic : req.body.topic,
		summary : req.body.summary,
		publicationType : req.body.publicationType,
		deadline : req.body.deadline,
		requirements : req.body.requirements,
		isFunded : req.body.funded,
		privacy : req.body.privacy
	}
	try {
		postDb = await Post.create(postData)
		res.send(201,{"message" : "Post is created", "id" : postDb.id})
	}catch (error){
		res.send(500,{"error": error})
		console.log(error)
	}
	//database table for storing path of uploaded file will be created
	//after that this function will be extended for handling this database operation. 
}

//updates posts with respect to their post id
updatePost = async function (req,res){
	postData = {
		topic : req.body.topic,
		summary : req.body.summary,
		publicationType : req.body.publicationType,
		deadline : req.body.deadline,
		requirements : req.body.requirements,
		isFunded : req.body.fund,
		privacy : req.body.privacy
	}
	try {
		await Post.update(postData, {
		where : {
			id : req.body.id
			}
		});
		res.send(201,{"message" : "Post is updated"})		
	}catch(error) {
		res.send(500,{"error": error})
		console.log(error)
	}
}

//deletes posts with respect to their post id
deletePost = async function (req,res){
	try {
		await Post.destroy({
			where : {
				id : req.body.id
			}
		});
		res.send(201,{"message" : "Post is deleted"})
	}catch(error) {
		res.send(500,{"error": error})
		console.log(error)
	}				 
}

//gathers posts from database according to parameters
//function can extend according to frontend wishes
getPosts = async function(req,res){
	try {
		userId = req.body.userId
		if(userId == null){
			posts = await Post.findAll({
				where : {
					privacy : 1
				}
			});
		}else{
			posts = await Post.findAll({
				where: {
					userId: userId
				}
			});		
		}
		res.send(201,posts)
	}catch(error) {
		res.send(500,{"error": error})
		console.log(error)
	}
}


module.exports = {
	addPost,
	updatePost,
	deletePost,
	getPosts,
	upload
}
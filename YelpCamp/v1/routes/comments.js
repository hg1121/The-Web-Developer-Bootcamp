const express = require("express");
const router = express.Router({mergeParams:true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
//../middleware will automatically find the main file which is named as index.js
const middleware = require("../middleware");

//comments/new
router.get("/new", middleware.isLoggedIn, (req,res)=>{
	//find campground by id
	Campground.findById(req.params.id,(err,campground)=>{
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground:campground});
			
		}
	});
});

//comments create
router.post("/", middleware.isLoggedIn, (req,res)=>{
	//lookup campground use id
	Campground.findById(req.params.id,(err,campground)=>{
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			//creat new comment
			Comment.create(req.body.comment,(err,comment)=>{
				if(err){
					req.flash("error","Something went wrong");
					console.log(err);
				}else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					//connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					//redirect to campground showpage
					req.flash("success","successfully added comment");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req,res)=>{
	Comment.findById(req.params.comment_id,(err,foundComment)=>{
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{campground_id:req.params.id, comment:foundComment});
		}
	});
});

//comments update
router.put("/:comment_id", middleware.checkCommentOwnership, (req,res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

//comment destory route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req,res)=>{
	Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

module.exports = router;
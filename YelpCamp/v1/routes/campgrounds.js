const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
//../middleware will automatically find the main file which is named as index.js
const middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/",(req,res)=>{
	//get all campgrounds from DB
	Campground.find({},(err,allcampgrounds)=>{
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds:allcampgrounds, currentUser:req.user});
		};			
	});	
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, (req,res)=>{
	//get data from form and add to campgrounds array
		const name = req.body.name;
		const image = req.body.image;
		const price = req.body.price;
		const desc = req.body.description;
		const author = {
			id:req.user._id,
			username:req.user.username
		} ;
		const newCampground = {name:name, image:image, price:price, description:desc,author:author};
		//Create a new campground and save to DB
		Campground.create(newCampground,(err,newCampground)=>{
			if(err){
				console.log(err);
			}else{
				//redirect back to /campgrounds page
				res.redirect("/campgrounds");
			};			  
		});
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req,res)=>{
	res.render("campgrounds/new");
});

//Show - show the information about one campground
router.get("/:id",(req,res)=>{
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
		if(err){
			console.log(err);
		}else{
			//render show template with that campground
			res.render("campgrounds/show",{campground:foundCampground});
		}
	});
});

//EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundOwnerShip,  (req,res)=>{		
	Campground.findById(req.params.id,(err,foundCampground)=>{
		res.render("campgrounds/edit",{campground:foundCampground});					
	});
});

//update campground route
router.put("/:id",middleware.checkCampgroundOwnerShip, (req,res)=>{
	//find and update the campground 
	Campground.findByIdAndUpdate(req.params.id, req.body.campground,(err,updatedCampground)=>{
		if(err){
			res.redirect("/campgrounds");	
		}else{
			res.redirect("/campgrounds/" + req.params.id);	
		}
	});
});

//Destory campground route
router.delete("/:id", middleware.checkCampgroundOwnerShip, (req,res)=>{
	Campground.findByIdAndRemove(req.params.id,(err)=>{
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;

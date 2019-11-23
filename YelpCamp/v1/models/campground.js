const mongoose = require("mongoose");

//Schema set up
const campgroundSchema = new mongoose.Schema({
	name:String,
	price:String,
	image:String,
	description:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	},
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
});

// module.export is the key that app.js can use require to inport this file
module.exports = mongoose.model("Campground",campgroundSchema);
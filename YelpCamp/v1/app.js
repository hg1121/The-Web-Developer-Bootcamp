const express 	    = require("express"),
	  app 		    = express(),
	  bodyParser    = require("body-parser"),
	  mongoose      = require("mongoose"),
	  flash			= require("connect-flash"),
	  passport	    = require("passport"),
	  LocalStrategy = require("passport-local"),
	  methodOverride= require("method-override"),
	  Campground    = require("./models/campground"),
	  Comment       = require("./models/comment"),
	  User    	    = require("./models/user"),   
	  seedDB	    = require("./seeds");

//requiring routes
const commentRoutes   	= require("./routes/comments"),
	  campgroundRoutes 	=  require("./routes/campgrounds"),
	  indexRoutes 	=  require("./routes/index");
	  
mongoose.connect('mongodb://localhost/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public")); // more safer
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // everytime start server over this  will run

//PASSPORT CONFIG
app.use(require("express-session")({
	secret:"I have losen two pounds hahahha",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(3000,()=>console.log("YelpCamp is under working!"));
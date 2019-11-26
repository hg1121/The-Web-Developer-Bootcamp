const express    	   = require("express"),
	  app        	   = express(),
	  bodyParser 	   = require("body-parser"),
	  mongoose   	   = require("mongoose"),
	  methodOverride   = require("method-override"),
	  expressSanitizer = require("express-sanitizer");

//App config
mongoose.connect('mongodb://localhost/restful_blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//mongoose/model config
const blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog",blogSchema);

// Blog.create({
// 	title:"Test Blog",
// 	image:"https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2569&q=80",
// 	body:"Hello, Japan!"
// })

//+++++++++++ROUTS+++++++++++++

app.get("/",(req,res)=>{
	res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs",(req,res)=>{
	Blog.find({},(err,blogs)=>{
		if(err){
			console.log("ERROR");
		}else{
			res.render("index",{blogs:blogs});
		}	  
	})
});

//New Route
app.get("/blogs/new",(req,res)=>{
	res.render("new");
});

//Create Route
app.post("/blogs",(req,res)=>{
	//create blog
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog,(err, newBlog)=>{
		if(err){
			res.render("new");
		}else{
			//redirect to index
			res.redirect("/blogs");
		}
	});
});

//Show Route
app.get("/blogs/:id",(req,res)=>{
	Blog.findById(req.params.id,(err,foundBlog)=>{
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show",{blog:foundBlog});
		}
	});
});

//Edit Route
app.get("/blogs/:id/edit",(req,res)=>{
	Blog.findById(req.params.id,(err,foundBlog)=>{
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("edit",{blog:foundBlog});
		}
	})
});

//Update Route
app.put("/blogs/:id",(req,res)=>{
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog,(err,updatedBlog)=>{
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//Destory Route
app.delete("/blogs/:id",(req,res)=>{
	//destory blog
	Blog.findByIdAndRemove(req.params.id,(err)=>{
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
			
		}
	});
});

app.listen(3000,()=>console.log("Server is running!"));
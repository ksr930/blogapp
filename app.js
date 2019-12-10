var express = require("express")
var expresssanitizer =require("express-sanitizer")
var methodoverride=require("method-override")
var app = express()
var bodyparser = require("body-parser")
var mongoose = require("mongoose")


mongoose.connect("mongodb://localhost/blogapp", { useNewUrlParser: true }, (err) => {
    if (!err) { console.log("mongodb connected") }
    else {
        console.log("not connected")
    }
}

);


var bodyparser = require("body-parser")
app.use(methodoverride("_method"))
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(expresssanitizer())

//schema setup
var blogschema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var blog = mongoose.model("blog", blogschema)


app.get("/",function(req,res){
    res.redirect("/blogs")
})
app.get("/blogs", function (req, res) {

   blog.find({},function(err,blogs){
       if(err){
           console.log("error")
       }
       else{
           res.render("index",{blogs:blogs})
       }
   })

})

app.get("/blogs/new",function(req,res){
    res.render("new")
})

app.post("/blogs",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    blog.create(req.body.blog,function(err,newblog){
        if(err){
            res.render("new")
        }
        else
        res.redirect("/blogs")
    })
})

app.get("/blogs/:id",function(req,res){
    blog.findById(req.params.id,function(err,foundblog)
    {
         if(err){
             res.redirect("blogs");
         }
         else{
             res.render("show",{ blog:foundblog})
         }
    })
})

app.get("/blogs/:id/edit",function(req,res){
    blog.findById(req.params.id,function(err,foundblog){
        if(err){
            res.redirect("/blog")

        }
        else{
            res.render("edit",{blog:foundblog})
        }
    })

})

app.put("/blogs/:id",function(req,res){
blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updateblog){
    if(err){
        res.redirect("/blogs")
    }
    else{
        res.redirect("/blogs/"+req.params.id)
    }
})
})

app.delete("/blogs/:id",function(req,res){
    blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs")
        }
        else{
            res.redirect("/blogs")
        }
    })
})

app.listen(3000, function () {
    console.log("server run")
})
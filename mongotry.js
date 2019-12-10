var mongoose =require("mongoose");

mongoose.connect("mongodb://localhost/postapp", { useNewUrlParser: true }, (err) => {
    if (!err) { console.log("mongodb connected") }
    else {
        console.log("not connected")
    }
}

);


var postschema = new mongoose.Schema({
    title: String,
    content: String
});
var post = mongoose.model("post", postschema);


var userschema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[postschema]
});
var user =mongoose.model("user",userschema);



// var newuser = new user({
//     email:"karan@brown.edu"
//     , name:"karan brown",

// })
// newuser.posts.push({
//     title:"how to bre polyjuice potion",
//     content:"just kidding"
// })

user.findOne({name:"karan brown"},function (err,user) {
    if(err){
        console.log(err)
    }
    else{
        user.posts.push({
            title:"welcome to india"
            , content:"voldemart voldemart voldemart"
        })
        user.save(function(err,user){
            if(err){
                console.log(err)
            }
            else{
                console.log(user)
            }
        })
    }
    
})




// newuser.save(function(err,user){
// if(err)
// {
//     console.log(err);

// }
// else{
//     console.log(user)
// }

// }

// )

// var newpost = new post({
//     title: "Reflection on Apples"
//     , name: "They are delicious"
// })

// newpost.save(function (err, user) {
//     if (err) {
//         console.log(err);

//     }
//     else {
//         console.log(user)
//     }

// }

// )


















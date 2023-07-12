const express = require("express");
const bodyParser = require("body-parser");
const request = require("request")
const https = require("https")
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
  console.log("Server uploaded")
})


app.post("/", function(req,res){
  const firstName =req.body.fName;
  const lastName =req.body.lName;
  const email =req.body.email;

  const data = {
    members:[
      {
        email_adress: email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };

  app.post("/failure.html", function(req,res){
    res.redirect("/");
  })

  const jsonData = JSON.stringify(data);

  const url="https://us9.api.mailchimp.com/3.0/lists/dfc0eef5c3";

  const options = {
    method:"POST",
    auth:"tuna:7a58678d4482b307b268613d2ff33acb-us9"
  }

  const request = https.request(url,options,function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname+"/succes.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
});




app.listen(process.env.PORT || 3000, function(){
  console.log("Server has started on port 3000");
});



// api key
// 7a58678d4482b307b268613d2ff33acb-us9

// list id
// dfc0eef5c3

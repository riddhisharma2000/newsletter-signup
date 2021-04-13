// jshint esversion: 6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const { urlencoded } = require("body-parser");

const https = require("https");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
res.sendFile( __dirname + "/signup.html");

})


app.post("/", function(req, res){
    const firstName =  req.body.FirstName;
    const lastName = req.body.LastName;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    //to covert this data from javascript object to json we use stringify.
    
    const jsonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/Lists/922076179b";

    const options = {
        method: "POST",
        auth: "Riddhi:506373ba4011f650d5da4305836235e3-us1" 
    }

    // request to get response in json format from api;
   const request = https.request(url, options ,function(response){
          
        response.on("data" , function(data){
            //console.log(JSON.parse(data));

           

            if(response.statusCode === 200)
            {
                //res.send("Successfully subscribed");
                res.sendFile(__dirname + "/success.html");
            }
            else
            {
               // res.send("There was an error signing up,please try again!");
               res.sendFile(__dirname + "/failure.html");
;            }
        })
    })

   // request.write(jsonData);
    request.end();

    //Now we want to post data to external resource(i.e api)
})


app.post("/failure", function(req,res){
    res.redirect("/");
})


app.listen(3000, function(req, res){
    console.log("Server is running on port 3000");  
})

//api key
//506373ba4011f650d5da4305836235e3-us1

// list id : identifies in which list we want to keep our audiences info.
//922076179b
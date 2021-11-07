//Template - Sid
const express = require("express");
const cors = require("cors");
const faker = require("faker");
const app = express();
const port = 3000;
const headers = {
    'Content-Type': 'application/json',
    //Add Needed Headers

};

//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static('../client'));

//Try sending a request to http://localhost:3000/test to test if app is working
app.get('/test', (req, res) => {
    res.set(headers);
    res.send('API running');
});

//For URL formats, use "/nameOfPage/details"
//Make sure to set the headers before sending the response
//Retrieves post data
app.get('/forum/getPostData', (req, res) => {
  res.set(headers);
  let respJSON = {"commentTitle": "", "user": "", "upvotes": 0, "downvotes": 0}
  respJSON.commentTitle = faker.lorem.sentences();
  respJSON.user = faker.internet.userName();
  respJSON.upvotes = Math.floor(Math.random() * 100);
  respJSON.downvotes = Math.floor(Math.random() * 100);
  res.send(JSON.stringify(respJSON));
});

//Adds a comment to a specific post
app.post('/forum/addComment', (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  //Store new comment appropriately
  res.send(JSON.stringify(200));
});

//Adds upvote to a post
app.post('/forum/upvote', (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  res.send(JSON.stringify(200));
});

//Adds upvote to a post
app.post('/forum/downvote', (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  res.send(JSON.stringify(200));
});

//Gets comments for a specific spost
app.post('/forum/getCommentforPost', (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  //Get the comments for the specific post
  let commentData = {"users": [], "comments": []};
  for (let i = 0; i < 5; ++i) {
    commentData.users.push(faker.internet.userName());
    commentData.comments.push(faker.lorem.sentences());
  }
  res.send(JSON.stringify(commentData));
});

//Adds new post to server
app.post('/forum/makePost', (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  //Store new post appropriately
  res.send(JSON.stringify(200));
});

//Retrieves posts made by current user
app.post('/forum/myPosts', (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  let respJSON = {"title":[]};

  for (let i = 0; i < 5; ++i) {
    respJSON.title.push(faker.lorem.words());
  }
  res.send(JSON.stringify(respJSON));
});

//Retrives appropriate crop and weather data based on zip and region inputs 
app.post('/crops/getCropWeatherData', (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  let respJSON = {"weatherData": "", "cropData": ""};
  respJSON.weatherData = faker.lorem.sentences();
  respJSON.cropData = faker.lorem.sentences();
  res.send(JSON.stringify(respJSON));
});

//Add your endpoints addUserDetail vidya
app.get('/user/getUserData', (req, res) => {
  res.set(headers);
let data = req.body;
  let respJSON = {"userid": "BillClinton","password": "Hillary", "fname": "Bill", "lname": "Clinton"};
  respJSON.interests = [{"interest" : "potato"} , {"interest" : "potato"}, {"interest" : "potato"}];
  res.send(JSON.stringify(respJSON));
});

app.post('/users/getUserDetail', (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  console.log("getUserDetail userid " + data.userid);
  console.log("modifyUserDetail password "+data.password);
  console.log("modifyUserDetail fname "+data.fname);
  console.log("modifyUserDetail lname "+data.lname);
  console.log("modifyUserDetail zip "+data.zip);
  console.log("modifyUserDetail birthday "+data.dob);
  console.log("modifyUserDetail email "+data.email);
  console.log("modifyUserDetail phone "+data.phone);  
  console.log("modifyUserDetail interested "+data.interested);
  console.log("modifyUserDetail grown "+data.grown);
  
  let respJSON = {"fname": "", "lname": "", "interests" : ""};
 // respJSON.fname = "Bill";
 // respJSON.lname = "Clinton";
  //respJSON.interests = "apples,grapes,cauliflower";
  res.send(JSON.stringify(respJSON));
});


app.post('/users/addUserDetail', (req, res) => {
  console.log("inside modifyUserDetail");
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  console.log("addUserDetail userid " + data.userid);
  console.log("addUserDetail password "+data.password);
  console.log("addUserDetail fname "+data.fname);
  console.log("addUserDetail lname "+data.lname);
  console.log("addUserDetail zip "+data.zip);
  console.log("addUserDetail birthday "+data.dob);
  console.log("addUserDetail email "+data.email);
  console.log("addUserDetail phone "+data.phone);  
  console.log("addUserDetail interested "+data.interested);
  console.log("addUserDetail grown "+data.grown);
  
  let respJSON = {"userid": "", "message": ""};
  respJSON.userid = data.userid;
  if (data.userid === "dupe") {
    respJSON.message = "Sorry. Please pick a different User id.";	  
  }
  else {
	respJSON.message = "Success! User " + data.userid +" added";
	
  }
  res.send(JSON.stringify(respJSON));
});

app.post('/listings/addListing', (req, res) => {
  res.set(headers);
  let data = req.body;
  console.log(req.bodd)
  console.log("addListing name" + data.name);
  console.log("addListing location" + data.location);
  console.log("addListing details" + data.details);
  console.log("addListing contact" + data.contact);

  let respJSON = {"name" : "", "message" : ""};
  if (data.name === "dupe") {
    respJSON["message"] = "That name is not allowed.";
  } else {
    respJSON["message"] = "Success! Listing added under name " + data.name + ".";
  }
});

app.post('/users/modifyUserDetail', (req, res) => {
  console.log("modify modifyUserDetail");
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  console.log("modifyUserDetail userid " + data.userid);
  console.log("modifyUserDetail password "+data.password);
  console.log("modifyUserDetail fname "+data.fname);
  console.log("modifyUserDetail lname "+data.lname);
  console.log("modifyUserDetail zip "+data.zip);
  console.log("modifyUserDetail birthday "+data.dob);
  console.log("modifyUserDetail email "+data.email);
  console.log("modifyUserDetail phone "+data.phone);  
  console.log("modifyUserDetail interested "+data.interested);
  console.log("modifyUserDetail grown "+data.grown);
  
  let respJSON = {"userid": "", "message": ""};
  respJSON.userid = data.userid;
  if (data.userid === "none") {
    respJSON.message = "Sorry. Invalid modification.";	  
  }
  else {
	respJSON.message = "Success! User " + data.userid +" modified";
	
  }
  res.send(JSON.stringify(respJSON));
});

app.get('/listings/getListings', (req, res) => {
  let data = req.body;
  n_entries = 3;
  let respList = [];
  res.set(headers);
  for(let i = 0; i < n_entries; i++) {
    let singleEntry = { "name": "", "location": "", "details": 0, "contact": 0 }
    singleEntry.name = faker.name.firstName() + " " + faker.name.lastName();
    singleEntry.location = faker.address.zipCode();
    singleEntry.details = faker.lorem.sentence();
    singleEntry.contact = faker.internet.email();
    respList.push(singleEntry);
  }
  
  res.send(JSON.stringify(respList));
});

//
app.post('/users/searchUserDetail', (req, res) => {
  res.set(headers);
  let data = req.body;
  console.log("Here " + data.userid);
  
  let respJSON = {matchrows : 0,results : []};
  
  respJSON.results[0] = ["bobama","Barack","Obama","02111","obama@ob.com","123-444-2255","Mangoes,Plums","Cherry,Tomato"];
  respJSON.results[1] = ["obama","Barack","Obama","02111","obama@ob.com","123-444-2255","Potato,Plums","Lemon,Tomato"];
  respJSON.results[2] = ["gbush","George","Bush","02111","obama@ob.com","123-444-2255","Mangoes,Lime","Cherry,Peas"];
  respJSON.results[3] = ["jcarter","Jimmy","Carter","02111","jc@gm.com","123-444-2255","Mangoes,Lime","Cherry,Peas"];
  respJSON.matchrows = respJSON.results.length;
  res.send(JSON.stringify(respJSON));
});


app.listen(port, () => {
  console.log('FarmerLink Backend Listening on port 3000');
})

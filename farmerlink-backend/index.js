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

//Try sending a request to http://localhost:3000/ to test if app is working
app.get('/', (req, res) => {
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

//Add your endpoints here

app.listen(port, () =>
  console.log('FarmerLink Backend Listening on port 3000'),
);
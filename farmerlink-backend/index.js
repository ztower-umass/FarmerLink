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

//Try seding a request to http://localhost:3000/ to test if app is working
app.get('/', (req, res) => {
    res.set(headers);
    res.send('API running');
});

//For URL formats, use "/nameOfPage/details"
//Make sure to set the headers before sending the response
app.get('/forum/getSampleCommentData', (req, res) => {
  res.set(headers);
  let respJSON = {"commentTitle": "", "user": "", "upvotes": 0, "downvotes": 0}
  respJSON.commentTitle = faker.lorem.sentences();
  respJSON.user = faker.internet.userName();
  respJSON.upvotes = Math.floor(Math.random() * 100);
  respJSON.downvotes = Math.floor(Math.random() * 100);
  console.log("CALLED");
  res.send(JSON.stringify(respJSON));
});

app.post('/crops/getCropWeatherData', (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  let respJSON = {"weatherData": "", "cropData": ""};
  respJSON.weatherData = faker.lorem.sentences();
  respJSON.cropData = faker.lorem.sentences();
  res.send(JSON.stringify(respJSON));
});

app.listen(port, () =>
  console.log('FarmerLink Backend Listening on port 3000'),
);
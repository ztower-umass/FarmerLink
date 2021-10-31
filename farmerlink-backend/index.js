//Template - Sid
const express = require('express');
const app = express();
const port = 3000;
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers too */
    'Content-Type': 'application/json'
};

//Try seding a request to http://localhost:3000/ to test if app is working
app.get('/', (req, res) => {
    res.set(headers);
    res.send('API running');
})

//For URL formats, use "/nameOfPage/details"
//Make sure to set the headers before sending the response
app.get('/forum/getCommentData', (req, res) => {
  res.set(headers);
  res.send('Sample Comment Data');
})

app.listen(port, () =>
  console.log('FarmerLink Backend Listening on port 3000!'),
);
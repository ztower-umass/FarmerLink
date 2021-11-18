// Vidya changes for database
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://uzrpwoqpcedeke:e09a1c5fc9d3e0921caa79a61792058366c4248343857f4d2a447c1d8687d0c9@ec2-54-174-172-218.compute-1.amazonaws.com:5432/d1it1qanjcljmu",
  ssl: {
    rejectUnauthorized: false
  }
});
// Vidya database changes end
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

// App configuration
//For URL formats, use "/nameOfPage/details"
//Make sure to set the headers before sending the response
//Retrieves post data
app.get('/forum/getPostData', async (req, res) => {
  res.set(headers);
  let respJSON = {"commentTitle": "", "userID": "", "postID": ""}
  respJSON.commentTitle = faker.lorem.sentences();
  respJSON.user = faker.internet.userName();


  const client = await pool.connect();
  let assembled_query = `SELECT * FROM Posts;`;
  const result = await client.query(assembled_query);
  
  let arr = [];
  for (let i = 0; i < result.rows.length; ++i) {
    arr.push({"commentTitle": result.rows[i].title, "userID": result.rows[i].user_id, "postID": result.rows[i].post_id});
  }
  
  client.release();
  res.send(JSON.stringify(arr));
});

//Adds a comment to a specific post
app.post('/forum/addComment', async (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  let userID = data.user_id;
  let postID = data.post_id;
  let commentTitle = data.title;
  //Store new comment appropriately
  const client = await pool.connect();
  let assembled_query = `INSERT INTO Comments VALUES ('${userID}', '${postID}', '${commentTitle}');`;
  const result = await client.query(assembled_query);
  
  client.release();
  res.send(JSON.stringify(200));
});

//Gets comments for a specific spost
app.post('/forum/getCommentforPost', async (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  let pID = data.post_id;
  //Get the comments for the specific post
  const client = await pool.connect();
  let assembled_query = `SELECT * FROM Comments WHERE post_id = '${pID}';`;
  const result = await client.query(assembled_query);

  client.release();
  res.send(JSON.stringify(result.rows));
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

app.post('/listings/addListing', async (req, res) => {
  res.set(headers);
  let data = req.body;
  console.log(req.body);
  console.log("addListing name" + data.name);
  console.log("addListing location" + data.location);
  console.log("addListing details" + data.details);
  console.log("addListing contact" + data.contact);

  const insertQuery = `INSERT INTO listings VALUES ('${data.name}', '${data.location}', '${data.details}', '${data.contact}');`;
  const client = await pool.connect();
  const result = await client.query(insertQuery);
  client.release();
  let respJSON = {"name" : "", "message" : ""};
  if (data.name === "dupe") {
    respJSON["message"] = "That name is not allowed.";
  } else {
    respJSON["message"] = "Success! Listing added under name " + data.name + ".";
  }
});


app.get('/listings/getListings', async (req, res) => {
  let data = req.body;
  let respList = [];
  res.set(headers);

  // fetch SQL listing data
  let listingsQuery = `SELECT * FROM listings ORDER BY name LIMIT 100;`
  const client = await pool.connect();
  const result = await client.query(listingsQuery);
  client.release();
  // loop through responses and attach it to response list
  for(let i = 0; i < result.rows.length; i++) {
    let currRow = result.rows[i];

    let singleEntry = { "name": "", "location": "", "details": 0, "contact": 0 }
    singleEntry.name = currRow.name;
    singleEntry.location = currRow.location;
    singleEntry.details = currRow.details;
    singleEntry.contact = currRow.contact;
    respList.push(singleEntry);
  }
  
  res.send(JSON.stringify(respList));
});

//Add your endpoints addUserDetail vidya
//User related end points start here-----------------------------------------------------
app.post('/users/addUserDetail', async (req, res) => {
  try {
      let respJSON = {};
      res.set(headers);
    // Use request body appropriately when implementing full back-end functionality
      let data = req.body;
      const client = await pool.connect();
      validUser = await validateUsers(client,data.userid);
      console.log("valid adduserdetail" + JSON.stringify(validUser));
      console.log("valid length " + validUser.results.length);
      if (validUser.results.length !== 0) {
        const results_null  = {results : []};
        console.log("Userid exists");
        respJSON = results_null 
        respJSON.message = 'Userid Exists.  Please pick another userid';
        res.send(JSON.stringify(respJSON));
      } else {
      // Assemble query
      // let assembled_query = `SELECT fname,lname,zip,to_char(dob,'yyyy-mm-dd') as dob,email,phone,interests,grown FROM FARMERLINK_USERS where userid = '${data.userid}'`;
        let assembled_query = `INSERT INTO FARMERLINK_USERS VALUES ('${data.userid}','${data.password}','${data.fname}','${data.lname}','${data.zip}',to_date('${data.dob}','YYYY-MM-DD'),
                                                                    '${data.email}','${data.phone}','${data.interests}','${data.grown}')`
        console.log("assembled query ->" + assembled_query)
        const result = await client.query(assembled_query);
        client.release();
        const results = { 'results': (result) ? result.rows : null};
        console.log("Inside query -> " + JSON.stringify(results));
        console.log("Inside query1");
        console.log("Inside query1");
        respJSON = results;
        console.log("Inside query afters -> " + JSON.stringify(respJSON));
        //Send success message and results back
        respJSON.message = 'Success.  User Added';
        res.send(JSON.stringify(respJSON));
      }
} catch (err) {
      console.error(err);
      const results = { 'results': {}};
      respJSON = results;
      respJSON.message = "Database Error.  Please contact our helpline";
      console.log("Error " + err);
      res.send(JSON.stringify(respJSON));
}
});

app.get('/user/getUserData', (req, res) => {
  res.set(headers);
let data = req.body;
  let respJSON = {"userid": "BillClinton","password": "Hillary", "fname": "Bill", "lname": "Clinton"};
  respJSON.interests = [{"interest" : "potato"} , {"interest" : "potato"}, {"interest" : "potato"}];
  res.send(JSON.stringify(respJSON));
});

app.post('/users/getUserDetail', async (req, res) => {
  try {
    let respJSON = {};
    res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
    let data = req.body;
    const client = await pool.connect();
   // Validate users
   validUser = await validateUsers(client,data.userid);
   console.log("valid " + JSON.stringify(validUser));
   console.log("valid length " + validUser.results.length);
   validPw = await validatePassword(client,data.userid,data.password);
   console.log("valid " + JSON.stringify(validPw));
   console.log("valid length " + validPw.results.length);
    if ( validUser.results.length === 0 || validPw.results.length === 0) {
      const results_null  = {results : null};
      console.log("pwuwerid rejected");
      respJSON = results_null 
      respJSON.message = 'Failure';
      res.send(JSON.stringify(respJSON));
    } else {
    // Assemble query
      let assembled_query = `SELECT fname,lname,zip,to_char(dob,'yyyy-mm-dd') as dob,email,phone,interests,grown FROM FARMERLINK_USERS where userid = '${data.userid}'`;
      console.log("assembled query ->" + assembled_query)
      const result = await client.query(assembled_query);
      client.release();
      const results = { 'results': (result) ? result.rows : null};
      console.log("Inside query -> " + JSON.stringify(results));
      console.log("Inside query1");
      console.log("Inside query1");
      respJSON = results;
      console.log("Inside query afters -> " + JSON.stringify(respJSON));
      //Send success message and results back
      respJSON.message = 'Success';
      res.send(JSON.stringify(respJSON));
    }
    } catch (err) {
      console.error(err);
      const results = { 'results': null};
      respJSON = results;
      respJSON.message = "Database Error.  Please contact our helpline";
      console.log("Error " + err);
      res.send(JSON.stringify(respJSON));
  }
})





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

async function validateUsers(client,userid) {
  let nullUseridPw = {"results":[{"userid" : "", "password" : ""}]}   
  console.log(`In validate users - userid is ${userid}` );
    // Assemble query
    // let assembled_query = `SELECT fname,lname,zip,to_char(dob,'yyyy-mm-dd') as dob,email,phone,interests,grown FROM FARMERLINK_USERS where userid = '${data.userid}'`;
      let assembled_query = `SELECT userid from FARMERLINK_USERS WHERE userid = '${userid}'`
      console.log("assembled query ->" + assembled_query)
      const result = await client.query(assembled_query);

      const results = { 'results': (result) ? result.rows : null};
      console.log("Inside query -> " + JSON.stringify(results));
      return results;
}
async function validatePassword(client,userid,password) {
  let nullUseridPw = {"results":[{"userid" : "", "password" : ""}]}   
  console.log(`In validate users - userid is ${userid} password is ${password}` );
    // Assemble query
    // let assembled_query = `SELECT fname,lname,zip,to_char(dob,'yyyy-mm-dd') as dob,email,phone,interests,grown FROM FARMERLINK_USERS where userid = '${data.userid}'`;
      let assembled_query = `SELECT userid from FARMERLINK_USERS WHERE userid = '${userid}' and password = '${password}'`
      console.log("assembled query ->" + assembled_query)
      const result = await client.query(assembled_query);

      const results = { 'results': (result) ? result.rows : null};
      if (results.length === 0) {
        results[0] = '{"userid" : "", "password" : ""}';
      }
      console.log("Inside query -> " + JSON.stringify(results));
      return results;
}
//User related end points ends here-----------------------------------------------------
app.listen(process.env.PORT || port, () => {
  console.log('FarmerLink Backend Listening on port 3000');
})

// Vidya changes for database
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
const { v4: uuidv4 } = require('uuid');

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
app.post('/forum/makePost', async (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  let title = data.postTitle;
  let postID = uuidv4();
  let userID = data.userID;
  //Store new post appropriately

  
  const client = await pool.connect();
  let assembled_query = `INSERT INTO Posts VALUES ('${userID}', '${postID}', '${title}');`;
  const result = await client.query(assembled_query);
  
  client.release();
  res.send(JSON.stringify({"userID": userID, "postID": postID, "title": title}));
});

//Retrieves posts made by current user
app.post('/forum/myPosts', async (req, res) => {
  res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
  let data = req.body;
  let userID = data.userID;

  const client = await pool.connect();
  let assembled_query = `SELECT * FROM Posts WHERE user_id = '${userID}';`;
  const result = await client.query(assembled_query);

  client.release();
  res.send(JSON.stringify(result.rows));
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
  for(let i = 0; i < result["rowCount"]; i++) {
    let currRow = result.rows[i];

    let singleEntry = { "name": "", "location": "", "details": 0, "contact": 0 }
    singleEntry.name = currRow.name;
    singleEntry.location = currRow.location;
    singleEntry.details  = currRow.details;
    singleEntry.contact  = currRow.contact;
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
      
      if (validUser) {
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
        console.log("(addUserDetail) Inside query -> " + JSON.stringify(results));
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

  // cleaning up this code a bit...

  console.log("getUserDetail running...");

  try {
    res.set(headers);

    // Use request body appropriately when implementing full back-end functionality
    let data = req.body;


    console.log(`data=${JSON.stringify(data)}`);

    // connect to SQL DB
    const client = await pool.connect();

    // validate username and password
    validUser = await validateUsers(client,data["userid"]);
    validPw   = await validatePassword(client,data.userid,data.password);

    // console.log("valid " + JSON.stringify(validUser));
    // console.log("valid length " + validUser.results.length);
    // console.log("valid " + JSON.stringify(validPw));
    // console.log("valid length " + validPw.results.length);

    // now we check if username and password came back correctly
    if ( !validUser || !validPw) { // incorrect username / pass
      console.log("invalid username");
      const results_null  = {
        //body: {
          "results": null,
          "message": "Failure (incorrect username or password)"
       // }
      };
      
      // send the failure message back
      res.send(JSON.stringify(results_null));

    } 
    else { // username correct
      // Assemble query
      console.log("username + pass correct");
      let assembled_query = `SELECT fname,lname,zip,to_char(dob,'yyyy-mm-dd') as dob,email,phone,interests,grown FROM FARMERLINK_USERS where userid = '${data.userid}'`;
      // console.log("assembled query ->" + assembled_query)

      // hit DB and close DB connection
      const queryResult = await client.query(assembled_query);
      client.release();

       // construct response object
      const responseObj = { 
        'results': (queryResult) ? queryResult.rows : null,
        'message': 'Success'
      };
      // console.log("Inside query -> " + JSON.stringify(results));
      // console.log("Inside query1");
      // console.log("Inside query1");
      // console.log("Inside query afters -> " + JSON.stringify(respJSON));
      //Send success message and results back
      console.log(`Response is ${JSON.stringify(responseObj)}`)
      res.send(JSON.stringify(responseObj));
    }
  } catch (err) {
    console.log("Database error");
    console.error(err);
    const responseObj = {
      'results': null,
      'message': 'Database error'
    };
    
    // console.log("Error " + err);
    res.send(JSON.stringify(responseObj));
  }
})





app.post('/users/modifyUserDetail', async (req, res) => {
  try {
    let respJSON = {};
    res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
    let data = req.body;
    const client = await pool.connect();
    validUser = await validatePassword(client,data.userid,data.password);
    console.log("valid adduserdetail" + JSON.stringify(validUser));
    if (!validUser) {
      const results_null  = {results : []};
      console.log("Userid exists");
      respJSON = results_null 
      respJSON.message = 'Userid/Password is invalid.  Please Double Check';
      res.send(JSON.stringify(respJSON));
    } else { 
    // Assemble query
    // let assembled_query = `SELECT fname,lname,zip,to_char(dob,'yyyy-mm-dd') as dob,email,phone,interests,grown FROM FARMERLINK_USERS where userid = '${data.userid}'`;
      let assembled_query = `UPDATE FARMERLINK_USERS set (fname,lname,zip,dob,email,phone,interests,grown) = ('${data.fname}','${data.lname}',
                            '${data.zip}',to_date('${data.dob}','YYYY-MM-DD'),
                            '${data.email}','${data.phone}','${data.interests}','${data.grown}')
                             where userid = '${data.userid}'`;
      console.log("assembled query ->" + assembled_query);
      const result = await client.query(assembled_query);
      client.release();
      const results = { 'results': (result) ? result.rows : null};
      respJSON = results;
      console.log("Inside query afters -> " + JSON.stringify(respJSON));
      //Send success message and results back
      respJSON.message = 'Success! User Updated';
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



//
app.post('/users/searchUserDetail', async (req, res) => {
  try {
    console.log("entering searchUserDetail");
    let respJSON = {};
    res.set(headers);
  // Use request body appropriately when implementing full back-end functionality
    let data = req.body;
    const client = await pool.connect();
    console.log("entering after pool connect");    
    let where_sw = true; // for SQL first condition should be where and others should be AND
    let searchArr = []; //  build all conditions in this array
    i = 0;
    if (data.userid !== "") {
       searchArr [i++] = `userid = '${data.userid}'`
    }
    if (data.zip !== "") {
      searchArr [i++] = `zip = '${data.zip}'`
    }
    if (data.lname !== "") {
      searchArr [i++] = `lname = '${data.lname}'`
    }
    
    if (data.fname !== "") {
      searchArr [i++] = `fname = '${data.fname}'`
    }
    //for interested and grown, the condition will be OR with 
    //the items chosen
    ("before if "+searchArr);
    if (data.interested != "") {
      console.log("data " + data.interested); 
      let intr = data.interested.split(",");
      intr_in = " ("
      for (let j = 0;j < intr.length; j++) {
        if (j === 0) {
           intr_in = intr_in + `interests like '%${intr[j]}%'`
        } else {
           intr_in =  intr_in +" OR " + `interests like '%${intr[j]}%'`
        }
      }
      intr_in = intr_in + ')';
      searchArr[i++] = intr_in;
    }
    console.log("i is " + i);
    if (data.grown != "") {
      let grown = data.grown.split(",");
      grown_in = "("
      for (let j = 0;j < grown.length; j++) {
        if (j === 0) {
           grown_in = grown_in + `grown like '%${grown[j]}%'`;
        } else {
           grown_in =  grown_in + " OR " + `grown like '%${grown[j]}%'`;
        }
      }
      grown_in = grown_in + ')';
      searchArr[i++] = grown_in
    }
    console.log("i is " + i);
    // Assemble query
    let assembled_query = `SELECT userid,fname,lname,zip,to_char(dob,'yyyy-mm-dd') as dob,email,phone,interests,grown FROM FARMERLINK_USERS `;
     let where_clause = "";
     for (let i = 0; i < searchArr.length; i++) {
       if (where_sw) {
          where_clause = ' WHERE '  + searchArr[i];
          where_sw = false;
       } else {
          where_clause = where_clause + ' AND ' + searchArr[i];
       }
     }

      assembled_query = assembled_query + where_clause;
      console.log("assembled query ->" + assembled_query);
      const result = await client.query(assembled_query);
      const results = { 'results': (result) ? result.rows : null};
      client.release();
      respJSON = results;
      console.log("Inside query afters -> " + JSON.stringify(respJSON));
      //Send success message and results back
      respJSON.message = 'Success';
      respJSON.matchrows = respJSON.results.length;
      console.log("matched rows -> " + respJSON.results.length);
      res.send(JSON.stringify(respJSON));
    } catch (err) {
      console.error(err);
      const results = { 'results': {}};
      respJSON = results;
      respJSON.message = "Database Error.  Please contact our helpline";
      console.log("Error " + err);
      res.send(JSON.stringify(respJSON));
  }
});

async function validateUsers(client,userid) {
  /*
  Return true if userid is in the database.
  @param client database
  @param userid user id string
  @retur true if userid in database, false otherwise
  */
  //console.log(`In validate users - userid is ${userid}` );
  // Assemble query
  // let assembled_query = `SELECT fname,lname,zip,to_char(dob,'yyyy-mm-dd') as dob,email,phone,interests,grown FROM FARMERLINK_USERS where userid = '${data.userid}'`;
  let assembled_query = `SELECT userid from FARMERLINK_USERS WHERE userid = '${userid}'`
  //console.log("assembled query ->" + assembled_query)
  const result = await client.query(assembled_query);

  return result != null && result['rowCount'] > 0;
}
async function validatePassword(client,userid,password) {
  //console.log(`In validate users - userid is ${userid} password is ${password}` );
    // Assemble query
    // let assembled_query = `SELECT fname,lname,zip,to_char(dob,'yyyy-mm-dd') as dob,email,phone,interests,grown FROM FARMERLINK_USERS where userid = '${data.userid}'`;
  let assembled_query = `SELECT userid from FARMERLINK_USERS WHERE userid = '${userid}' and password = '${password}'`
  //console.log("assembled query ->" + assembled_query)
  const result = await client.query(assembled_query);
  //console.log("validatePassword result: -> " + JSON.stringify(result));
  return result != null && result['rowCount'] > 0;
}
//User related end points ends here-----------------------------------------------------
app.listen(process.env.PORT || port, () => {
  console.log('FarmerLink Backend Listening on port 3000');
})

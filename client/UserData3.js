let myStorage = window.localStorage;

function clearSw() {
    let intrList = ["citrus" , "livestock" , "wheat" , "grapes" , "apples" , "banana" , 
    "strawberry" , "cabbage" , "cauliflower" , "peas"];
    let intrArr  = [];
    let intrArrLen = intrArr.length;
    for (const intr of intrList)  {
        console.log("Intr is " + intr);
        intrID = intr + "Sw";
        grID   = intr + "GrSw"
        console.log("IntrID is "+intrID);
        const swVal = document.getElementById(intrID);
        swVal.checked = false;
        const grswVal = document.getElementById(grID);
        grswVal.checked = false;
    }
}
function getFormData()
{
  const formUID = document.getElementById("userid");
  let useridVal = formUID.value;
  let passwordc = document.getElementById ("password");
  let passwordVal = passwordc.value;  
  const fname = document.getElementById("fname");
  let fnameVal = fname.value;
  const lname = document.getElementById("lname");
  let lnameVal = lname.value;
  const zip = document.getElementById("zip");
  let zipVal = zip.value;
  const dob = document.getElementById("dob");
  let dobVal = dob.value;
  const email = document.getElementById("email");
  let emailVal = email.value;
  const phone = document.getElementById("phone");
  let phoneVal = phone.value;  
  //let inDataStr = '{"userid":"' + useridVal + '"}';
  
  // Get List of items selected for interested and 
  let intrList = ["citrus" , "livestock" , "wheat" , "grapes" , "apples" , "banana" , 
				  "strawberry" , "cabbage" , "cauliflower" , "peas"];
  let intrArr  = [];
  let intrArrLen = intrArr.length;
  for (const intr of intrList)  {
	  console.log("Intr is " + intr);
	  intrID = intr + "Sw";
	  console.log("IntrID is "+intrID);
	  const swVal = document.getElementById(intrID);
	  if (swVal.checked) {
		  intrArr[intrArrLen++] = intr;
	  }
  }
  intrCsv = intrArr.join(",");
  console.log("Selected Interested Elements : " +intrArr.join(","));
  
  // Get List of items selected for grown and 
  let grownList = ["citrus" , "livestock" , "wheat" , "grapes" , "apples" , "banana" , 
				  "strawberry" , "cabbage" , "cauliflower" , "peas"];
  let grownArr  = [];
  let grownArrLen = grownArr.length;
  for (const grown of grownList)  {
	  console.log("Grown is " + grown);
	  grownID = grown + "GrSw";
	  console.log("grownID is "+grownID);
	  const grSwVal = document.getElementById(grownID);
	  if (grSwVal.checked) {
		  grownArr[grownArrLen++] = grown;
	  }
  }
  grownCsv = grownArr.join(",");
  console.log("Selected Interested Elements : " +grownArr.join(","));  
  
  let inDataStr = '{"userid":"' + useridVal+'"' +", "+
                  ' "password":'+'"' +passwordVal+'"'+", " +
				   '"fname":'+'"' +fnameVal+'"'+", "+
				   '"lname":'+'"' +lnameVal+'"'+", "+
				   '"zip":'+'"' +zipVal+'"'+", "+
				   '"dob":'+'"' +dobVal+'"'+", "+
				   '"email":'+'"' +emailVal+'"'+", "+
				   '"phone":'+'"' +phoneVal+'"'+", "+
				   '"grown":'+'"' +grownCsv+'"'+", "+
				   '"interests":'+'"' +intrCsv+'"'+
				   '}';
  return inDataStr;
}

function getFormDataSearch () {
	const formUID = document.getElementById("userid");
	let useridVal = formUID.value; 
	const fname = document.getElementById("fname");
	let fnameVal = fname.value;
	const lname = document.getElementById("lname");
	let lnameVal = lname.value;
	const zip = document.getElementById("zip");
	let zipVal = zip.value;
	
	//making sure the link works
	 console.log("User id "+useridVal+" fname "+fnameVal+" lname "+lnameVal+" zip "+zipVal);
	
	let intrList = ["citrus" , "livestock" , "wheat" , "grapes" , "apples" , "banana" , 
					"strawberry" , "cabbage" , "cauliflower" , "peas"];
	let intrArr  = [];
	let intrArrLen = intrArr.length;
	for (const intr of intrList)  {
		console.log("Intr is " + intr);
		intrID = intr + "Sw";
		console.log("IntrID is "+intrID);
		const swVal = document.getElementById(intrID);
		if (swVal.checked) {
			intrArr[intrArrLen++] = intr;
		}
	}
	intrCsv = intrArr.join(",");
	console.log("Selected Interested Elements : " +intrArr.join(","));
	
	// Get List of items selected for grown and 
	let grownList = ["citrus" , "livestock" , "wheat" , "grapes" , "apples" , "banana" , 
					"strawberry" , "cabbage" , "cauliflower" , "peas"];
	let grownArr  = [];
	let grownArrLen = grownArr.length;
	for (const grown of grownList)  {
		console.log("Grown is " + grown);
		grownID = grown + "GrSw";
		console.log("grownID is "+grownID);
		const grSwVal = document.getElementById(grownID);
		if (grSwVal.checked) {
			grownArr[grownArrLen++] = grown;
		}
	}
	grownCsv = grownArr.join(",");
	console.log("Selected Interested Elements : " +grownArr.join(","));
	
	  let inDataStr = '{"userid":"' + useridVal+'"' +", "+
					 '"fname":'+'"' +fnameVal+'"'+", "+
					 '"lname":'+'"' +lnameVal+'"'+", "+
					 '"zip":'+'"' +zipVal+'"'+", "+
					 '"grown":'+'"' +grownCsv+'"'+", "+
					 '"interested":'+'"' +intrCsv+'"'+
					 '}';
	return inDataStr;
	
	  
  }
  

async function getUsersdb(inData) {
    try {
        let res = await fetch("/users/getUserDetail", {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(inData)  
      });
         return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getUser() {
	//createPostModal.style.display = "none";
	
	const formUID = document.getElementById("userid");
	let useridVal = formUID.value;
	let passwordc = document.getElementById ("password");
	let passwordVal = passwordc.value;  
	if (useridVal === "" || passwordVal === "") {
		alert("UserID and Password are mandatory");
	}
	else
	{
		let inDataStr = getFormData();
		console.log(inDataStr);
		let inData    = JSON.parse(inDataStr);
		
		let resp = await getUsersdb(inData);
		let data = resp.results;
		//console.log("Here ->" + JSON.stringify(resp) + "  " + data.length);
		//console.log("Here2 ->" + JSON.stringify(data));
		console.log("Here3 ->" + resp.message);
		//set values retrieved from database.
		if (resp.message == 'Success') {
			  if (data.length === 1) {
				  	// we set the user as logged in
					  let username = useridVal;
					  let password = passwordVal;
					  myStorage.setItem("username", username);
					  myStorage.setItem("password", password)

					  console.log("in 1" + JSON.stringify(data[0]));
					  document.getElementById("lname").value = data[0].lname;
					  document.getElementById("fname").value = data[0].fname;
					  document.getElementById("zip").value = data[0].zip;
					  document.getElementById("email").value = data[0].email;
					  document.getElementById("dob").value = data[0].dob;
					  document.getElementById("phone").value = data[0].phone;
					  clearSw();
					  interests = data[0].interests;
					  console.log("Interests : " + interests);
					  const interestArr = interests.split(",");
					  console.log("Interests : " + interestArr.length);
					  for (let i = 0; i < interestArr.length; i++) {
						  swName = interestArr[i] + "Sw";
						  console.log( i + "****" + interestArr[i] + swName);
						  selSw = document.getElementById(swName);
						  selSw.checked = true;
					  }
					  grown = data[0].grown;
					  console.log("grown : " + grown);
					  const grownArr = grown.split(",");
					  console.log("growns : " + grownArr.length);
					  for (let i = 0; i < grownArr.length; i++) {
						  swName = grownArr[i] + "GrSw";
						  console.log( i + "****" + grownArr[i] + swName);
						  selSw = document.getElementById(swName);
						  selSw.checked = true;
					  }
			  }
			  else
			  {   
					  console.log("in not 1");
					  document.getElementById("lname").value = "";
					  document.getElementById("fname").value = "";
					  document.getElementById("zip").value = "";
					  document.getElementById("email").value = "";
					  document.getElementById("phone").value = "";
					  alert("Userid/Password combination does not exist");
			  }
		} else {
			alert(resp.message);
		}
	}
  }
  

async function addUser() {
  //createPostModal.style.display = "none";
  
  let formStr = getFormData();
  let jsonForm = JSON.parse(formStr);
  let errorStr = "";
  if (jsonForm.userid === "") {
	  errorStr = "UserID required \n";
  }
  if (jsonForm.password === "") {
	  errorStr = errorStr+ "Password required \n";
  }
  if (jsonForm.fname === "") {
	  errorStr = errorStr+"First name required \n";
	  const formUID = document.getElementById("fname");
  }
    if (jsonForm.zip === "") {
	  errorStr = errorStr+ "Zip Code required \n";
  }  
  if (errorStr !== "") {
	  alert("Error: "+errorStr);
  }
  if (jsonForm.userid === "" || jsonForm.password === "" || jsonForm.fname === ""|| jsonForm.lname === ""|| 
      jsonForm.zip === "") {
	  //alert("Error: username, password, first name, last name, zip, and email are all required");
  } 
  else
  {
	  let inDataStr = formStr;
	  console.log(inDataStr);
	  let inData    = JSON.parse(inDataStr);
	  const res = await fetch("users/addUserDetail", {
		method: 'POST',
		mode: 'cors',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(inData) 
	  });
	  let data = await res.json();
	  alert(data.message);
		
	  //alert("Post Created");
  }
}

async function modifyUser() {
  //createPostModal.style.display = "none";
  myStorage.clear();
  let formStr = getFormData();
  let jsonForm = JSON.parse(formStr);
  let errorStr = "";
  if (jsonForm.userid === "") {
	  errorStr = "UserID required \n";
  }
  if (jsonForm.password === "") {
	  errorStr = errorStr+ "Password required \n";
  }
  if (jsonForm.fname === "") {
	  errorStr = errorStr+"First name required \n";
	  const formUID = document.getElementById("fname");
  }
    if (jsonForm.zip === "") {
	  errorStr = errorStr+ "Zip Code required \n";
  }  
  if (errorStr !== "") {
	  alert("Error: "+errorStr);
  }
  if (jsonForm.userid === "" || jsonForm.password === "" || jsonForm.fname === ""|| jsonForm.lname === ""|| 
      jsonForm.zip === "") {
	  //alert("Error: username, password, first name, last name, zip, and email are all required");
  } 
  else
  {
	  let inDataStr = formStr;
	  console.log(inDataStr);
	  let inData    = JSON.parse(inDataStr);
	  const res = await fetch("users/modifyUserDetail", {
		method: 'POST',
		mode: 'cors',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(inData) 
	  });
	  let data = await res.json();
	  console.log("In Searchuser " + data.fname);
	  alert(data.message);
		
	  //alert("Post Created");
  }
}

async function searchUser() {
  //createPostModal.style.display = "none";
  console.log("searchUser clicked");
  // next line remove once done
  getFormDataSearch();
  let inDataStr = getFormDataSearch();
  console.log("Form Data is " + inDataStr);
  // uncomment after inDataStr is in json string form
  let inData    = JSON.parse(inDataStr);
   
  const res = await fetch("users/searchUserDetail", {
	method: 'POST',
	mode: 'cors',
	headers: {
	  'Content-Type': 'application/json'
	},
	body: JSON.stringify(inData) 
  });
  let data = await res.json();
  let srchResults = data.results;
  console.log("In Searchuser " + srchResults.length);
  for (const rslt of srchResults)  {
	console.log("Srch Rslt : " + rslt.length);
  }
  localStorage.setItem("profSrch",JSON.stringify(srchResults));
  let resCount = data.matchrows;
  if (resCount > 0 ) {
	window.location.replace("SearchResults.html");
  }
  else {
	  alert ("No users match the criteria");
  }

} 

function getResults(insJson) {
    let table = document.getElementById("searchRes");
    let insArr = insJson;
    for (const resRow of insArr) {
        let row = table.insertRow(-1);
        let cell = null;
        let i = 0;
        cell = row.insertCell(i++);
        cell.innerHTML = resRow.userid;
        cell = row.insertCell(i++);
        cell.innerHTML = resRow.fname;
        cell = row.insertCell(i++);
        cell.innerHTML = resRow.lname;
        cell = row.insertCell(i++);
        cell.innerHTML = resRow.zip;
        cell = row.insertCell(i++);
        cell.innerHTML = resRow.email;
        cell = row.insertCell(i++);
        cell.innerHTML = resRow.phone;
        cell = row.insertCell(i++);
        cell.innerHTML = resRow.interests;
        cell = row.insertCell(i++);
        cell.innerHTML = resRow.grown;
    }
  }


function logoutSession() {
	window.localStorage.clear();
	window.location.href = "/userPage.html";
}


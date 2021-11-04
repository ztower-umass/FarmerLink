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
				   '"interested":'+'"' +intrCsv+'"'+
				   '}';
  return inDataStr;
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
	  const res = await fetch("http://localhost:3000/users/getUserDetail", {
		method: 'POST',
		mode: 'cors',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(inData) 
	  });
	  let data = await res.json();
	  let fname = data.fname;
	  console.log("In Searchuser " + data.fname);
	  const fnamev = document.getElementById("fname");
	  fnamev.value = fname;
	  
	  document.getElementById("lname").value = data.lname;
	  
	  interests = data.interests;
	  console.log("Interests : " + interests);
	  
	  const interestArr = interests.split(",");
	  console.log("Interests : " + interestArr.length);
	  for (let i = 0; i < interestArr.length; i++) {

		  swName = interestArr[i] + "Sw";
		  console.log( i + "****" + interestArr[i] + swName);
		  selSw = document.getElementById(swName);
		  selSw.checked = true;
	  }

		
	  //alert("Post Created");
  }
}
/*
'{"userid":"' + useridVal+'"' +", "+
                  ' "password":'+'"' +passwordVal+'"'+", " +
				   '"fname":'+'"' +fnameVal+'"'+", "+
				   '"lname":'+'"' +lnameVal+'"'+", "+
				   '"zip":'+'"' +zipVal+'"'+", "+
				   '"dob":'+'"' +dobVal+'"'+", "+
				   '"email":'+'"' +emailVal+'"'+", "+
				   '"phone":'+'"' +phoneVal+'"'+", "+
				   '"grown":'+'"' +grownCsv+'"'+", "+
				   '"interested":'+'"' +intrCsv+'"'+
				   '}';
*/

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
	  const res = await fetch("http://localhost:3000/users/addUserDetail", {
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

async function modifyUser() {
  //createPostModal.style.display = "none";
  
  const formUID = document.getElementById("userid");
  let useridVal = formUID.value;
  
  console.log("Input userid is " + userid);
  const formInt = document.getElementById("interested");
  let interestedArray = formInt.value;
  console.log("Clicked Interestedxxx" +   interestedArray.toString());
  
  if (useridVal === "") {
	  alert("UserID and Password are mandatory");
  }
  else
  {
	  let inDataStr = '{"userid":"' + useridVal + '"}';
	  let inData    = JSON.parse(inDataStr);
	  const res = await fetch("http://localhost:3000/users/getUserDetail", {
		method: 'POST',
		mode: 'cors',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(inData) 
	  });
	  let data = await res.json();
	  let fname = data.fname;
	  console.log("In Searchuser " + data.fname);

  }
}
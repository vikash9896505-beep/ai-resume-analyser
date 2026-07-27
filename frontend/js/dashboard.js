// ======================================
// AI Resume Analyser Dashboard JS
// ======================================

// -------------------------------
// User Details
// -------------------------------

const user = JSON.parse(localStorage.getItem("user"));

if(user){

document.getElementById("userName").innerHTML=user.name;

document.getElementById("profileName").innerHTML=user.name;

document.getElementById("profileEmail").innerHTML=user.email;

}

// -------------------------------
// Logout
// -------------------------------

const logout=document.getElementById("logoutBtn");

if(logout){

logout.onclick=()=>{

if(confirm("Logout from your account?")){

localStorage.removeItem("user");

window.location.href="login.html";

}

}

}

// -------------------------------
// Score Animation
// -------------------------------

function animateValue(id,target,symbol="%"){

const element=document.getElementById(id);

let current=0;

const speed=25;

const timer=setInterval(()=>{

current++;

element.innerHTML=current+symbol;

if(current>=target){

clearInterval(timer);

}

},speed);

}

// -------------------------------
// Upload Resume
// -------------------------------

const analyzeBtn=document.getElementById("analyzeBtn");

if(analyzeBtn){

analyzeBtn.addEventListener("click",uploadResume);

}

async function uploadResume(){

const file=document.getElementById("resumeFile").files[0];

if(!file){

alert("Please select resume");

return;

}

const formData=new FormData();

formData.append("file",file);

analyzeBtn.innerHTML="Analyzing...";

analyzeBtn.disabled=true;

try{

const response=await fetch(

"https://ai-resume-analyser-ba0n.onrender.com/upload",

{

method:"POST",

body:formData

}

);

const data=await response.json();

showResult(data);

}

catch(error){

alert("Server Error");

console.log(error);

}

analyzeBtn.innerHTML="Analyze Resume";

analyzeBtn.disabled=false;

}

// -------------------------------
// Show Result
// -------------------------------

function showResult(data){

animateValue("atsScore",data.ats_score);

animateValue("jobMatch",data.job_match);

document.getElementById("skillsCount").innerHTML=data.skills.length;

document.getElementById("suggestionsCount").innerHTML=data.suggestions.length;

showSkills(data.skills);

showMissing(data.missing_skills);

showSuggestions(data.suggestions);

document.getElementById("downloadReport").href=

"https://ai-resume-analyser-ba0n.onrender.com/reports/"+data.pdf;

}

// -------------------------------
// Skills
// -------------------------------

function showSkills(skills){

const list=document.getElementById("skillsList");

list.innerHTML="";

skills.forEach(skill=>{

list.innerHTML+=`

<li>✅ ${skill}</li>

`;

});

}

// -------------------------------
// Missing Skills
// -------------------------------

function showMissing(skills){

const list=document.getElementById("missingSkillsList");

list.innerHTML="";

skills.forEach(skill=>{

list.innerHTML+=`

<li>❌ ${skill}</li>

`;

});

}

// -------------------------------
// Suggestions
// -------------------------------

function showSuggestions(suggestions){

const div=document.getElementById("suggestionsList");

div.innerHTML="";

suggestions.forEach(item=>{

div.innerHTML+=`

<p>💡 ${item}</p>

`;

});

}

// -------------------------------
// Upload File Name
// -------------------------------

const file=document.getElementById("resumeFile");

if(file){

file.onchange=()=>{

const label=document.querySelector(".upload-box h3");

label.innerHTML=file.files[0].name;

}

}
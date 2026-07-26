
// ===============================
// Check Login
// ===============================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please Login First");
    window.location.href = "login.html";
}

// ===============================
// Welcome User
// ===============================

const welcomeUser = document.getElementById("welcomeUser");

if (welcomeUser && user) {
    welcomeUser.innerHTML = "Welcome, " + user.name;
}

// ===============================
// Buttons
// ===============================

const uploadBtn = document.getElementById("uploadBtn");
const downloadBtn = document.getElementById("downloadBtn");
const logoutBtn = document.getElementById("logoutBtn");

let pdfPath = "";

// ===============================
// Logout
// ===============================

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("user");

        alert("Logged Out Successfully");

        window.location.href = "login.html";

    });

}

// ===============================
// Upload Resume
// ===============================

uploadBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const fileInput = document.getElementById("resumeFile");
    const message = document.getElementById("message");
    const atsScore = document.getElementById("atsScore");
    const skillsList = document.getElementById("skillsList");
    const missingSkills = document.getElementById("missingSkills");
    const suggestions = document.getElementById("suggestions");
    const jobMatch = document.getElementById("jobMatch");

    if (fileInput.files.length === 0) {
        alert("Please Select Resume PDF");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    message.innerHTML = "⏳ Analysing Resume...";
    alert("Upload Button Clicked");

    try {

        const response = await fetch("http://127.0.0.1:9000/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Server Error");
        }

        const data = await response.json();
        


        console.log(data);
        

        pdfPath = data.pdf;

        message.innerHTML = "✅ Resume Analysed Successfully";

        atsScore.innerHTML = data.ats_score + " / 100";

        jobMatch.innerHTML = data.job_match + "%";

        // Skills

        skillsList.innerHTML = "";

        if (data.skills.length > 0) {

            data.skills.forEach(skill => {

                skillsList.innerHTML += "✅ " + skill + "<br>";

            });

        } else {

            skillsList.innerHTML = "No Skills Found";

        }

        // Missing Skills

        missingSkills.innerHTML = "";

        if (data.missing_skills.length > 0) {

            data.missing_skills.forEach(skill => {

                missingSkills.innerHTML += "❌ " + skill + "<br>";

            });

        } else {

            missingSkills.innerHTML = "No Missing Skills";

        }

        // Suggestions

        suggestions.innerHTML = "";
        

        if (data.suggestions.length > 0) {

            data.suggestions.forEach(item => {

                suggestions.innerHTML += "💡 " + item + "<br>";

            });

        } else {

            suggestions.innerHTML = "Resume Looks Good";

        }

    } catch (error) {

        console.log(error);

        message.innerHTML = "❌ Failed To Analyse Resume";

    }

});

// ===============================
// Download Report
// ===============================

downloadBtn.addEventListener("click", () => {

    if (pdfPath === "") {

        alert("Please Analyse Resume First");

        return;

    }

    window.open(
        "http://127.0.0.1:9000/reports/" + pdfPath,
        "_blank"
    );

});
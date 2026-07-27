const API = "https://ai-resume-analyser-ba0n.onrender.com";

// Login Check
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// Welcome User
document.getElementById("welcomeUser").innerText =
    user.name || user.email || "User";

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
});

// Upload Resume
document.getElementById("uploadBtn").addEventListener("click", async () => {

    const file = document.getElementById("resumeFile").files[0];

    if (!file) {
        alert("Please select a PDF Resume");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    document.getElementById("message").innerHTML = "Analysing Resume...";

    try {

        const response = await fetch(API + "/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        // ATS
        document.getElementById("atsScore").innerHTML =
            data.ats_score + " / 100";

        // Job Match
        document.getElementById("jobMatch").innerHTML =
            data.job_match + "%";

        // Skills
        document.getElementById("skillsList").innerHTML =
            data.skills.length
                ? data.skills.join("<br>")
                : "No Skills Found";

        // Missing Skills
        document.getElementById("missingSkills").innerHTML =
            data.missing_skills.length
                ? data.missing_skills.join("<br>")
                : "None";

        // Suggestions
        document.getElementById("suggestions").innerHTML =
            data.suggestions.length
                ? data.suggestions.join("<br>")
                : "No Suggestions";

        // PDF Download
        document.getElementById("downloadBtn").onclick = () => {
            window.open(API + "/reports/" + data.pdf, "_blank");
        };

        document.getElementById("message").innerHTML =
            "Resume Analysed Successfully";

    } catch (err) {

        console.log(err);

        document.getElementById("message").innerHTML =
            "Server Error";

    }

});

const API = "https://ai-resume-analyser-ba0n.onrender.com";

document.getElementById("startBtn").addEventListener("click", async () => {

    const file = document.getElementById("resume").files[0];

    if (!file) {
        alert("Please select a PDF Resume");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

        const response = await fetch(API + "/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        document.getElementById("result").innerHTML = `
            <h2>ATS Score: ${data.ats_score}%</h2>

            <h3>Skills</h3>
            <p>${data.skills.join(", ")}</p>

            <h3>Missing Skills</h3>
            <p>${data.missing_skills.join(", ")}</p>

            <h3>Suggestions</h3>
            <p>${data.suggestions.join("<br>")}</p>

            <h3>Job Match</h3>
            <p>${data.job_match}%</p>
        `;

    } catch (err) {
        alert("Server Error");
        console.log(err);
    }

});

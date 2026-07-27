const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch("https://ai-resume-analyser-ba0n.onrender.com/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            alert("Account Created Successfully!");

            window.location.href = "login.html";

        } else {

            alert(data.detail || "Signup Failed");

        }

    } catch (error) {

        alert("Server Error");

        console.log(error);

    }

});

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch("https://ai-resume-analyser-ba0n.onrender.com/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("user", JSON.stringify(data));

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert(data.detail || "Login Failed");

        }

    } catch (error) {

        alert("Server Error");

        console.log(error);

    }

});
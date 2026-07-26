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

        const response = await fetch("http://127.0.0.1:9000/signup", {

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

            alert("Signup Successful");

            window.location.href = "login.html";

        } else {

            alert(data.detail || data.message);

        }

    } catch (error) {

        alert("Server Error");

        console.log(error);

    }

});
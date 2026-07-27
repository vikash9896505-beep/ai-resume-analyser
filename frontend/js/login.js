// Show / Hide Password
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword) {
    togglePassword.addEventListener("click", () => {
        if (password.type === "password") {
            password.type = "text";
            togglePassword.className = "ri-eye-off-line";
        } else {
            password.type = "password";
            togglePassword.className = "ri-eye-line";
        }
    });
}

// Login
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(
            "https://ai-resume-analyser-ba0n.onrender.com/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("user", JSON.stringify(data));

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert(data.detail || "Login Failed");

        }

    } catch (error) {

        console.log(error);
        alert("Server Error");

    }

});
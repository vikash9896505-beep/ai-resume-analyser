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
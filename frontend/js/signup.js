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

});// =========================
// PASSWORD STRENGTH
// =========================

const password=document.getElementById("password");

const bar=document.getElementById("strengthBar");

const text=document.getElementById("strengthText");

password.addEventListener("input",()=>{

let value=password.value.length;

if(value<5){

bar.style.width="30%";

bar.style.background="#ef4444";

text.innerHTML="Weak Password";

}

else if(value<8){

bar.style.width="65%";

bar.style.background="#f59e0b";

text.innerHTML="Medium Password";

}

else{

bar.style.width="100%";

bar.style.background="#22c55e";

text.innerHTML="Strong Password";

}

});

// =========================
// SHOW PASSWORD
// =========================

const toggle=document.getElementById("togglePassword");

toggle.onclick=()=>{

if(password.type==="password"){

password.type="text";

toggle.className="ri-eye-off-line";

}

else{

password.type="password";

toggle.className="ri-eye-line";

}

};

// =========================
// CONFIRM PASSWORD
// =========================

const confirmPassword=document.getElementById("confirmPassword");

const toggleConfirm=document.getElementById("toggleConfirm");

toggleConfirm.onclick=()=>{

if(confirmPassword.type==="password"){

confirmPassword.type="text";

toggleConfirm.className="ri-eye-off-line";

}

else{

confirmPassword.type="password";

toggleConfirm.className="ri-eye-line";

}

};

// =========================
// MATCH PASSWORD
// =========================

document.getElementById("signupBtn").addEventListener("click",(e)=>{

if(password.value!==confirmPassword.value){

e.preventDefault();

alert("Passwords do not match");

return;

}

});
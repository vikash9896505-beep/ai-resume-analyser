const loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", async () => {

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    const response = await fetch("http://127.0.0.1:9000/login", {

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

    if(response.ok){

        localStorage.setItem("user", JSON.stringify(data));

        alert("Login Successful");

        window.location.href="dashboard.html";

    }else{

        alert(data.detail);

    }

});
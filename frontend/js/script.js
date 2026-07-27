// ===============================
// AI Resume Analyser
// Premium JavaScript
// ===============================

// Navbar Shadow

window.addEventListener("scroll", () => {

    const navbar = document.querySelector("header");

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(8,17,31,.95)";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        navbar.style.background = "rgba(8,17,31,.75)";
        navbar.style.boxShadow = "none";

    }

});

// =======================================
// Counter Animation
// =======================================

const counters = document.querySelectorAll(".stats h2");

const speed = 60;

counters.forEach(counter => {

    const animate = () => {

        let value = counter.innerText;

        if (value.includes("%")) {

            let target = parseInt(value);

            let current = +counter.getAttribute("data-count") || 0;

            current++;

            counter.setAttribute("data-count", current);

            counter.innerText = current + "%";

            if (current < target) {

                setTimeout(animate, speed);

            }

        }

        else if (value.includes("K+")) {

            let target = parseInt(value);

            let current = +counter.getAttribute("data-count") || 0;

            current++;

            counter.setAttribute("data-count", current);

            counter.innerText = current + "K+";

            if (current < target) {

                setTimeout(animate, speed);

            }

        }

        else {

            counter.innerText = "24/7";

        }

    };

    animate();

});

// =======================================
// Scroll Animation
// =======================================

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".card,.step,.cta").forEach((el)=>{

el.classList.add("hidden");

observer.observe(el);

});

// =======================================
// Mouse Glow Effect
// =======================================

const glow = document.createElement("div");

glow.style.width="20px";
glow.style.height="20px";
glow.style.position="fixed";
glow.style.borderRadius="50%";
glow.style.pointerEvents="none";
glow.style.background="#38bdf8";
glow.style.filter="blur(12px)";
glow.style.zIndex="9999";

document.body.appendChild(glow);

window.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX-10+"px";
glow.style.top=e.clientY-10+"px";

});

// =======================================
// Button Ripple
// =======================================

document.querySelectorAll(".btn,.signup-btn,.cta a").forEach(btn=>{

btn.addEventListener("click",(e)=>{

const circle=document.createElement("span");

circle.style.position="absolute";
circle.style.width="20px";
circle.style.height="20px";
circle.style.borderRadius="50%";
circle.style.background="rgba(255,255,255,.5)";
circle.style.left=e.offsetX+"px";
circle.style.top=e.offsetY+"px";
circle.style.transform="scale(0)";
circle.style.transition=".5s";

btn.appendChild(circle);

setTimeout(()=>{

circle.style.transform="scale(15)";
circle.style.opacity="0";

},10);

setTimeout(()=>{

circle.remove();

},600);

});

});

// =======================================
// Typing Effect
// =======================================

const title=document.querySelector(".hero-left h1");

const text=title.innerText;

title.innerText="";

let i=0;

function typing(){

if(i<text.length){

title.innerHTML+=text.charAt(i);

i++;

setTimeout(typing,35);

}

}

typing();// ==========================
// DARK / LIGHT MODE
// ==========================

const themeBtn = document.getElementById("themeToggle");

if(themeBtn){

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("light-mode");

const icon = themeBtn.querySelector("i");

if(document.body.classList.contains("light-mode")){

icon.className="ri-sun-line";

}else{

icon.className="ri-moon-line";

}

});

}

// ==========================
// TOP SCROLL PROGRESS BAR
// ==========================

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop;

const scrollHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight;

const progress=(scrollTop/scrollHeight)*100;

document.getElementById("progressBar").style.width=progress+"%";

});
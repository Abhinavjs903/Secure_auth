// ==============================
// SECTION SWITCHING
// ==============================

const loginSection = document.getElementById("loginSection");

const signupSection = document.getElementById("signupSection");

const showSignup = document.getElementById("showSignup");

const showLogin = document.getElementById("showLogin");

showSignup.addEventListener("click",(e)=>{

    e.preventDefault();

    loginSection.style.display="none";

    signupSection.style.display="block";

});

showLogin.addEventListener("click",(e)=>{

    e.preventDefault();

    signupSection.style.display="none";

    loginSection.style.display="block";

});


// ==============================
// PASSWORD TOGGLE
// ==============================

document.querySelectorAll(".togglePassword").forEach(icon=>{

    icon.addEventListener("click",()=>{

        const input=document.getElementById(icon.dataset.target);

        if(!input) return;

        if(input.type==="password"){

            input.type="text";

            icon.innerHTML='<i class="fa-solid fa-eye-slash"></i>';

        }

        else{

            input.type="password";

            icon.innerHTML='<i class="fa-solid fa-eye"></i>';

        }

    });

});



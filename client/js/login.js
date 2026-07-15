// ==============================
// Show / Hide Password
// ==============================

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        password.type = "password";
        togglePassword.textContent = "👁️";
    }

});

// ==============================
// Login Form Validation
// ==============================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(event){

    // Stop page refresh
    event.preventDefault();

    // Get values entered by user
    const email = document.getElementById("email").value.trim();
    const passwordValue = document.getElementById("password").value.trim();

    // Error message elements
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // Clear previous errors
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validation flag
    let isValid = true;

    // ==============================
    // Email Validation
    // ==============================

    if (email === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else {

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

    }

    // ==============================
    // Password Validation
    // ==============================

    if (passwordValue === "") {
        passwordError.textContent = "Password is required.";
        isValid = false;
    } else if (passwordValue.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        isValid = false;
    }

    // Stop if validation failed
    if (!isValid) {
        return;
    }

    // ==============================
    // Success
    // ==============================

   

    console.log("Email:", email);
    console.log("Password:", passwordValue);

    const response = await fetch("http://localhost:5000/api/auth/login", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },


    body: JSON.stringify({

        email: email,

        password: passwordValue

    })

});
const data = await response.json();

const loginMessage = document.getElementById("loginMessage");

loginMessage.textContent = data.message;

if(data.success){

    loginMessage.style.color = "green";

    // Save JWT token
    localStorage.setItem("token", data.token);

    // Redirect after 1 second
    setTimeout(() => {

        window.location.href = "dashboard.html";

    },1000);

}else{

    loginMessage.style.color = "red";

}
});


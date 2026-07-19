// ==============================
// Login Elements
// ==============================

const loginForm = document.getElementById("loginForm");

const loginEmail = document.getElementById("loginEmail");

const loginPassword = document.getElementById("loginPassword");
// ==============================
// Get Sections
// ==============================

const loginSection = document.getElementById("loginSection");
const signupSection = document.getElementById("signupSection");

// ==============================
// Get Links
// ==============================

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
// ==============================
// OTP Elements
// ==============================

const sendOTPButton = document.getElementById("sendOTPButton");

const otpSection = document.getElementById("otpSection");

const signupEmail = document.getElementById("signupEmail");
const verifyOTPButton = document.getElementById("verifyOTPButton");

const signupOTP = document.getElementById("signupOTP");

const createAccountButton = document.getElementById("createAccountButton");
const signupForm = document.getElementById("signupForm");

const signupName = document.getElementById("signupName");

const signupPhone = document.getElementById("signupPhone");

const signupPassword = document.getElementById("signupPassword");
// ==============================
// Show Signup
// ==============================

showSignup.addEventListener("click", function (e) {

    e.preventDefault();

    loginSection.style.display = "none";

    signupSection.style.display = "block";

});

// ==============================
// Show Login
// ==============================

showLogin.addEventListener("click", function (e) {

    e.preventDefault();

    signupSection.style.display = "none";

    loginSection.style.display = "block";

});

// ==============================
// Send OTP
// ==============================

sendOTPButton.addEventListener("click", async function () {

    const email = signupEmail.value.trim();

    if (email === "") {

        showToast("Please enter your email.", "error");

        return;

    }

    try {

            try {

    sendOTPButton.textContent = "Sending...";
    sendOTPButton.disabled = true;

    const response = await fetch("http://localhost:5000/api/otp/send", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            email

        })

    });

    const data = await response.json();

    showToast(data.message, data.success ? "success" : "error");

    if (data.success) {

        otpSection.style.display = "block";

        signupEmail.disabled = true;

        sendOTPButton.textContent = "✓ Sent";

    } else {

        sendOTPButton.textContent = "Verify";

        sendOTPButton.disabled = false;

    }

} catch (error) {

    console.log(error);

    showToast("Server Error", "error");

    sendOTPButton.textContent = "Verify";

    sendOTPButton.disabled = false;

}
        const response = await fetch("http://localhost:5000/api/otp/send", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email

            })

        });

        const data = await response.json();

        showToast(data.message, data.success ? "success" : "error");

        if (data.success) {

            otpSection.style.display = "block";

            signupEmail.disabled = true;

            sendOTPButton.disabled = true;

        }

    } catch (error) {

        console.error(error);

        showToast("Server Error", "error");

    }

});
// ==============================
// Verify OTP
// ==============================

verifyOTPButton.addEventListener("click", async function () {

    const email = signupEmail.value.trim();

    const otp = signupOTP.value.trim();

    if (otp === "") {

        showToast("Enter OTP", "error");

        return;

    }

    try {

        const response = await fetch("http://localhost:5000/api/otp/verify", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,
                otp

            })

        });

        const data = await response.json();

        showToast(data.message, data.success ? "success" : "error");

        if (data.success) {

            createAccountButton.disabled = false;

            verifyOTPButton.disabled = true;

            signupOTP.disabled = true;

        }

    } catch (error) {

        console.log(error);

        showToast("Server Error", "error");

    }

});
// ==============================
// Create Account
// ==============================

signupForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    // Validation
    if (

        signupName.value.trim() === "" ||

        signupEmail.value.trim() === "" ||

        signupPhone.value.trim() === "" ||

        signupPassword.value.trim() === ""

    ) {

        showToast("Please fill all fields.", "error");

        return;

    }

    try {

        createAccountButton.textContent = "Creating...";

        createAccountButton.disabled = true;

        const response = await fetch("http://localhost:5000/api/auth/signup", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name: signupName.value.trim(),

                email: signupEmail.value.trim(),

                phone: signupPhone.value.trim(),

                password: signupPassword.value.trim()

            })

        });

        const data = await response.json();

        showToast(data.message, data.success ? "success" : "error");

        if (data.success) {

            signupForm.reset();

            otpSection.style.display = "none";

            signupSection.style.display = "none";

            loginSection.style.display = "block";

            signupEmail.disabled = false;

            sendOTPButton.disabled = false;

            sendOTPButton.textContent = "Verify";

            verifyOTPButton.disabled = false;

            signupOTP.disabled = false;

            createAccountButton.disabled = true;

            createAccountButton.textContent = "Create Account";

        } else {

            createAccountButton.disabled = false;

            createAccountButton.textContent = "Create Account";

        }

    } catch (error) {

        console.log(error);

        showToast("Server Error", "error");

        createAccountButton.disabled = false;

        createAccountButton.textContent = "Create Account";

    }

});

// ==============================
// Login
// ==============================

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    if (

        loginEmail.value.trim() === "" ||

        loginPassword.value.trim() === ""

    ) {

        showToast("Please enter email and password.", "error");

        return;

    }

    try {

        const response = await fetch("http://localhost:5000/api/auth/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email: loginEmail.value.trim(),

                password: loginPassword.value.trim()

            })

        });

        const data = await response.json();

        showToast(data.message, data.success ? "success" : "error");

        if (data.success) {

            // Save JWT Token

            localStorage.setItem("token", data.token);

            // Temporary

            showToast("Login Successful!", "success");

window.location.href = "dashboard.html";
if (data.success) {

    localStorage.setItem("token", data.token);

    showToast("Login Successful!", "success");

    setTimeout(() => {

        window.location.href = "dashboard.html";

    }, 1000);

}
            // Later:
            // window.location.href = "dashboard.html";

        }

    } catch (error) {

        console.log(error);

        showToast("Server Error", "error");

    }

});
document.querySelectorAll(".togglePassword").forEach(icon=>{

    icon.addEventListener("click",()=>{

        const input=document.getElementById(icon.dataset.target);

        if(!input) return;

        const eye=icon.querySelector("i");

        if(input.type==="password"){

            input.type="text";

            eye.classList.remove("fa-eye");

            eye.classList.add("fa-eye-slash");

        }

        else{

            input.type="password";

            eye.classList.remove("fa-eye-slash");

            eye.classList.add("fa-eye");

        }

    });

});
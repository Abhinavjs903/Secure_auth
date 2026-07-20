// ==============================
// SIGNUP ELEMENTS
// ==============================

const signupForm = document.getElementById("signupForm");

const signupName = document.getElementById("signupName");

const signupEmail = document.getElementById("signupEmail");

const signupPhone = document.getElementById("signupPhone");

const signupPassword = document.getElementById("signupPassword");

const sendOTPButton = document.getElementById("sendOTPButton");

const verifyOTPButton = document.getElementById("verifyOTPButton");

const signupOTP = document.getElementById("signupOTP");

const otpSection = document.getElementById("otpSection");

const createAccountButton = document.getElementById("createAccountButton");


// ==============================
// SEND OTP
// ==============================

sendOTPButton.addEventListener("click", async () => {

    const email = signupEmail.value.trim();

    if(email===""){

        showToast("Enter Email","error");

        return;

    }

    sendOTPButton.disabled=true;

    sendOTPButton.textContent="Sending...";

    try{

        const response=await fetch(

            "http://localhost:5000/api/otp/send",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    email

                })

            }

        );

        const data=await response.json();

        showToast(data.message,data.success?"success":"error");

        if(data.success){

            otpSection.style.display="block";

            signupEmail.disabled=true;

            sendOTPButton.textContent="✓ Sent";

        }

        else{

            sendOTPButton.disabled=false;

            sendOTPButton.textContent="Verify";

        }

    }

    catch(error){

        console.log(error);

        showToast("Server Error","error");

        sendOTPButton.disabled=false;

        sendOTPButton.textContent="Verify";

    }

});

// ==============================
// VERIFY OTP
// ==============================

verifyOTPButton.addEventListener("click",async()=>{

    const response=await fetch(

        "http://localhost:5000/api/otp/verify",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                email:signupEmail.value.trim(),

                otp:signupOTP.value.trim()

            })

        }

    );

    const data=await response.json();

    showToast(data.message,data.success?"success":"error");

    if(data.success){

        verifyOTPButton.disabled=true;

        signupOTP.disabled=true;

        createAccountButton.disabled=false;

    }

});


// ==============================
// CREATE ACCOUNT
// ==============================

signupForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    if(

        signupName.value.trim()===""||

        signupEmail.value.trim()===""||

        signupPhone.value.trim()===""||

        signupPassword.value.trim()===""

    ){

        showToast("Fill all fields","error");

        return;

    }

    createAccountButton.disabled=true;

    createAccountButton.textContent="Creating...";

    try{

        const response=await fetch(

            "http://localhost:5000/api/auth/signup",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    name:signupName.value.trim(),

                    email:signupEmail.value.trim(),

                    phone:signupPhone.value.trim(),

                    password:signupPassword.value.trim()

                })

            }

        );

        const data=await response.json();

        showToast(data.message,data.success?"success":"error");

        if(data.success){

            signupForm.reset();

            signupSection.style.display="none";

            loginSection.style.display="block";

            signupEmail.disabled=false;

            verifyOTPButton.disabled=false;

            signupOTP.disabled=false;

            otpSection.style.display="none";

            sendOTPButton.textContent="Verify";

            sendOTPButton.disabled=false;

            createAccountButton.disabled=true;

            createAccountButton.textContent="Create Account";

        }

        else{

            createAccountButton.disabled=false;

            createAccountButton.textContent="Create Account";

        }

    }

    catch(error){

        console.log(error);

        showToast("Server Error","error");

        createAccountButton.disabled=false;

        createAccountButton.textContent="Create Account";

    }

});
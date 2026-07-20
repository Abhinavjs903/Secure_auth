// ==============================
// FORGOT PASSWORD ELEMENTS
// ==============================

const forgotPasswordLink =
document.getElementById("forgotPasswordLink");

const forgotModal =
document.getElementById("forgotModal");

const closeForgotModal =
document.getElementById("closeForgotModal");

const forgotEmail =
document.getElementById("forgotEmail");

const forgotOTP =
document.getElementById("forgotOTP");

const newPassword =
document.getElementById("newPassword");

const sendResetOTPButton =
document.getElementById("sendResetOTPButton");

const verifyResetOTPButton =
document.getElementById("verifyResetOTPButton");

const resetPasswordButton =
document.getElementById("resetPasswordButton");


// ==============================
// INITIAL STATE
// ==============================

forgotOTP.style.display = "none";

verifyResetOTPButton.style.display = "none";

newPassword.style.display = "none";

resetPasswordButton.style.display = "none";


// ==============================
// OPEN MODAL
// ==============================

forgotPasswordLink.addEventListener("click",(e)=>{

    e.preventDefault();

    forgotModal.style.display="flex";

    forgotEmail.value="";

    forgotOTP.value="";

    newPassword.value="";

    forgotOTP.style.display="none";

    verifyResetOTPButton.style.display="none";

    newPassword.style.display="none";

    resetPasswordButton.style.display="none";

});


// ==============================
// CLOSE MODAL
// ==============================

closeForgotModal.addEventListener("click",()=>{

    forgotModal.style.display="none";

});


// ==============================
// SEND RESET OTP
// ==============================

sendResetOTPButton.addEventListener("click",async()=>{

    if(forgotEmail.value.trim()===""){

        showToast("Enter Email","error");

        return;

    }

    sendResetOTPButton.disabled=true;

    sendResetOTPButton.textContent="Sending...";

    try{

        const response=await fetch(

            "http://localhost:5000/api/password/send-otp",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    email:forgotEmail.value.trim()

                })

            }

        );

        const data=await response.json();

        showToast(data.message,data.success?"success":"error");

        if(data.success){

            forgotEmail.disabled=true;

            forgotOTP.style.display="block";

            verifyResetOTPButton.style.display="block";

            sendResetOTPButton.textContent="✓ Sent";

        }

        else{

            sendResetOTPButton.disabled=false;

            sendResetOTPButton.textContent="Send OTP";

        }

    }

    catch(error){

        console.log(error);

        showToast("Server Error","error");

    }

});
// ==============================
// VERIFY RESET OTP
// ==============================

verifyResetOTPButton.addEventListener("click",async()=>{

    const response=await fetch(

        "http://localhost:5000/api/password/verify-otp",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                email:forgotEmail.value.trim(),

                otp:forgotOTP.value.trim()

            })

        }

    );

    const data=await response.json();

    showToast(data.message,data.success?"success":"error");

    if(data.success){

        verifyResetOTPButton.disabled=true;

        forgotOTP.disabled=true;

        newPassword.style.display="block";

        resetPasswordButton.style.display="block";

    }

});
// ==============================
// RESET PASSWORD
// ==============================

resetPasswordButton.addEventListener("click",async()=>{

    if(newPassword.value.trim()===""){

        showToast("Enter New Password","error");

        return;

    }

    const response=await fetch(

        "http://localhost:5000/api/password/reset",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                email:forgotEmail.value.trim(),

                password:newPassword.value.trim()

            })

        }

    );

    const data=await response.json();

    showToast(data.message,data.success?"success":"error");

    if(data.success){

        forgotModal.style.display="none";

        forgotEmail.disabled=false;

        sendResetOTPButton.disabled=false;

        sendResetOTPButton.textContent="Send OTP";

    }

});
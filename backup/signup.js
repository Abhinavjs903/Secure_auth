const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function(event){

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if(password !== confirmPassword){

        alert("Passwords do not match");

        return;

    }

    const response = await fetch(`${API_URL}/api/auth/signup`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name,
            email,
            phone,
            password

        })

    });

    const data = await response.json();

    console.log(data);

    const signupMessage = document.getElementById("signupMessage");

signupMessage.textContent = data.message;

if (data.success) {

    signupMessage.style.color = "green";

} else {

    signupMessage.style.color = "red";

}

});
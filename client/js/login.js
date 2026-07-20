// ==============================
// LOGIN ELEMENTS
// ==============================

const loginForm = document.getElementById("loginForm");

const loginEmail = document.getElementById("loginEmail");

const loginPassword = document.getElementById("loginPassword");


// ==============================
// LOGIN
// ==============================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (
        loginEmail.value.trim() === "" ||
        loginPassword.value.trim() === ""
    ) {

        showToast("Please fill all fields.", "error");

        return;

    }

    try {

        const loginButton = loginForm.querySelector("button");

        loginButton.disabled = true;

        loginButton.textContent = "Logging In...";

        const response = await fetch(

            "http://localhost:5000/api/auth/login",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email: loginEmail.value.trim(),

                    password: loginPassword.value.trim()

                })

            }

        );

        const data = await response.json();

        showToast(

            data.message,

            data.success ? "success" : "error"

        );

        if (data.success) {

            localStorage.setItem(

                "token",

                data.token

            );

            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 800);

        }

        loginButton.disabled = false;

        loginButton.textContent = "Login";

    }

    catch (error) {

        console.log(error);

        showToast(

            "Server Error",

            "error"

        );

        const loginButton = loginForm.querySelector("button");

        loginButton.disabled = false;

        loginButton.textContent = "Login";

    }

});
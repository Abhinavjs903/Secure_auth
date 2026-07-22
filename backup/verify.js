const verifyForm = document.getElementById("verifyForm");

verifyForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const otp = document.getElementById("otp").value.trim();

    const response = await fetch(`${API_URL}/api/password/verify-otp`, {

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

    const verifyMessage = document.getElementById("verifyMessage");

    verifyMessage.textContent = data.message;

    if (data.success) {

        verifyMessage.style.color = "green";

        setTimeout(() => {

            window.location.href = "index.html";

        }, 2000);

    } else {

        verifyMessage.style.color = "red";

    }

});
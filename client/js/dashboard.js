const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "index.html";

}

async function loadDashboard() {

    try {

        const response = await fetch("http://localhost:5000/api/dashboard", {

            method: "GET",

            headers: {

                Authorization: token

            }

        });

        const data = await response.json();

        console.log(data);

        if (!data.success) {

            window.location.href = "index.html";

            return;

        }

        document.getElementById("welcome").textContent =
            "Welcome " + data.user.email;

    } catch (error) {

        console.log(error);

    }

}

loadDashboard();

document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "index.html";

});
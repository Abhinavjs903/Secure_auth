const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "auth.html";

}

const payload = JSON.parse(atob(token.split(".")[1]));

document.getElementById("welcomeText").innerHTML = `

<b>Email:</b> ${payload.email}

`;

document.getElementById("logoutButton").addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "auth.html";

});
function login() {
  const role = document.getElementById("role").value;
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (role === "admin" && user === "admin" && pass === "admin123") {
    localStorage.setItem("role", "admin");
    window.location.href = "admin.html";
  } 
  else if (role === "user" && user !== "" && pass !== "") {
    localStorage.setItem("role", "user");
    window.location.href = "index.html";
  } 
  else {
    document.getElementById("error").innerText = "Invalid credentials";
  }
}

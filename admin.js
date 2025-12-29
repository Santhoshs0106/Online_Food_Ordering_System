// Only admin can access
if (localStorage.getItem("role") !== "admin") {
  window.location.href = "login.html";
}

const orders = JSON.parse(localStorage.getItem("orders")) || [];
const table = document.getElementById("ordersTable");

orders.forEach(o => {
  const row = table.insertRow();
  row.insertCell(0).innerText = o.name;
  row.insertCell(1).innerText = "₹" + o.price;
  row.insertCell(2).innerText = o.qty;
});

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

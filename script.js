document.addEventListener("DOMContentLoaded", function () {
  // Show form when "ADD NEW USER" button is clicked
  document
    .getElementById("addUserButton")
    .addEventListener("click", function () {
      document.getElementById("userForm").style.display = "block";
      document.getElementById("myForm").reset();
      document.getElementById("editIndex").value = "";
    });

  // Handle form submission
  document
    .getElementById("myForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };
      var editIndex = document.getElementById("editIndex").value;
      var users = JSON.parse(localStorage.getItem("users")) || [];

      if (editIndex !== "") {
        users[editIndex] = formData;
      } else {
        users.push(formData);
      }
      localStorage.setItem("users", JSON.stringify(users));

      // Hide form
      document.getElementById("userForm").style.display = "none";

      // Refresh user table
      displayUsers();
    });

  // Display users from local storage
  function displayUsers() {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = "";

    users.forEach(function (user, index) {
      var row = tableBody.insertRow();
      row.insertCell(0).textContent = user.firstName;
      row.insertCell(1).textContent = user.lastName;
      row.insertCell(2).textContent = user.email;
      row.insertCell(3).textContent = user.password;
      var actionsCell = row.insertCell(4);

      var deleteButton = document.createElement("i");
      deleteButton.className = "delete-btn fas fa-user-minus";
      deleteButton.onclick = function () {
        deleteRow(index);
      };

      var updateButton = document.createElement("i");
      updateButton.className = "update-btn fas fa-user-pen";
      updateButton.onclick = function () {
        updateRow(index);
      };

      actionsCell.appendChild(updateButton);
      actionsCell.appendChild(deleteButton);
    });
  }

  // Delete user row
  function deleteRow(index) {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    displayUsers();
  }

  // Update user row
  function updateRow(index) {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var user = users[index];
    document.getElementById("fname").value = user.firstName;
    document.getElementById("lname").value = user.lastName;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("editIndex").value = index;

    // Show form
    document.getElementById("userForm").style.display = "block";
    document
      .getElementById("userForm")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Initial display of users
  displayUsers();
});

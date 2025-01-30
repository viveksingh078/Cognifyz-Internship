document.addEventListener("DOMContentLoaded", () => {
  const usersTable = document.getElementById("usersTable");
  const addUserForm = document.getElementById("addUserForm");
  const editUserModal = new bootstrap.Modal(
    document.getElementById("editUserModal")
  );
  const editUserForm = document.getElementById("editUserForm");

  // Function to display success message
  const showMessage = (message, type = "success") => {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} mt-3`;
    alertDiv.textContent = message;
    document.querySelector(".container").prepend(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
  };

  // Fetch and display users
  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const users = await response.json();

    usersTable.innerHTML = "";
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.age}</td>
          <td>${user.status}</td>
          <td>
            <button class="btn btn-sm btn-warning edit" data-id="${user.id}">Edit</button>
            <button class="btn btn-sm btn-danger delete" data-id="${user.id}">Delete</button>
          </td>
        `;
      usersTable.appendChild(row);
    });
  };

  // Check for duplicate email, excluding a specific user ID if provided
  const isEmailUnique = async (email, excludeId = null) => {
    const response = await fetch("/api/users");
    const users = await response.json();
    return !users.some((user) => user.email === email && user.id != excludeId);
  };

  // Add new user
  addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUser = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      age: document.getElementById("age").value,
      status: document.getElementById("status").value,
    };

    if (!(await isEmailUnique(newUser.email))) {
      showMessage("Error: Email already exists!", "danger");
      return;
    }

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    fetchUsers();
    addUserForm.reset();
    showMessage("User added successfully!");
  });

  // Open edit modal with pre-filled data
  usersTable.addEventListener("click", async (e) => {
    const target = e.target;
    const id = target.getAttribute("data-id");

    if (target.classList.contains("edit")) {
      const response = await fetch(`/api/users`);
      const users = await response.json();
      const user = users.find((u) => u.id == id);

      if (user) {
        document.getElementById("editUserId").value = user.id;
        document.getElementById("editName").value = user.name;
        document.getElementById("editEmail").value = user.email;
        document.getElementById("editAge").value = user.age;
        document.getElementById("editStatus").value = user.status;

        editUserModal.show();
      }
    }

    if (target.classList.contains("delete")) {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
      showMessage("User deleted successfully!");
    }
  });

  // Handle edit user form submission
  editUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("editUserId").value;

    const updatedUser = {
      name: document.getElementById("editName").value,
      email: document.getElementById("editEmail").value,
      age: document.getElementById("editAge").value,
      status: document.getElementById("editStatus").value,
    };

    // Check for email uniqueness, excluding the current user
    if (!(await isEmailUnique(updatedUser.email, id))) {
      showMessage("Error: Email already exists!", "danger");
      return;
    }

    // Update user
    await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    fetchUsers(); // Refresh the users table
    editUserModal.hide(); // Close the modal
    showMessage("User updated successfully!");
  });

  // Initial Fetch
  fetchUsers();
});

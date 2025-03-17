// Sample User Data
let users = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Present" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Absent" }
];

// ====== Display Users in Table ======
function displayUsers() {
    const userTable = document.getElementById("userTable");
    userTable.innerHTML = "";

    users.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.status}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${user.id})">✏️ Edit</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">🗑️ Delete</button>
                <button class="mark-btn" onclick="markAttendance(${user.id})">✔️ Mark Attendance</button>
            </td>
        `;

        userTable.appendChild(row);
    });
}

// ====== Add New User ======
document.getElementById("addUserForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name && email) {
        const newUser = {
            id: users.length + 1,
            name,
            email,
            status: "Absent"
        };
        users.push(newUser);
        displayUsers();
        showPopup("✅ User Added Successfully!", "success");
    } else {
        showPopup("❌ Please fill all fields", "error");
    }

    document.getElementById("addUserForm").reset();
});

// ====== Edit User ======
function editUser(id) {
    const user = users.find(user => user.id === id);

    const newName = prompt("Enter new name:", user.name);
    const newEmail = prompt("Enter new email:", user.email);

    if (newName && newEmail) {
        user.name = newName.trim();
        user.email = newEmail.trim();
        displayUsers();
        showPopup("✅ User Details Updated!", "success");
    } else {
        showPopup("❌ Update Cancelled", "error");
    }
}

// ====== Delete User ======
function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        users = users.filter(user => user.id !== id);
        displayUsers();
        showPopup("✅ User Deleted Successfully!", "success");
    }
}

// ====== Mark Attendance ======
function markAttendance(id) {
    const user = users.find(user => user.id === id);
    user.status = "Present";
    displayUsers();
    showPopup(`✅ Attendance Marked for ${user.name}`, "success");
}

// ====== Search Functionality ======
document.getElementById("searchInput").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );

    const userTable = document.getElementById("userTable");
    userTable.innerHTML = "";

    filteredUsers.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.status}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${user.id})">✏️ Edit</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">🗑️ Delete</button>
                <button class="mark-btn" onclick="markAttendance(${user.id})">✔️ Mark Attendance</button>
            </td>
        `;

        userTable.appendChild(row);
    });
});

// ====== Popup Notification Function ======
function showPopup(message, type) {
    const popup = document.createElement("div");
    popup.className = `popup ${type}`;
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// ====== Initial Display ======
window.onload = displayUsers;

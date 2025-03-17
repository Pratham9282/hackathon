// ====== Login Logic ======
document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('❌ Please fill in all fields.');
        return;
    }

    // Simple email and password check (mock data for demo)
    if (email === 'admin@attendai.com' && password === 'admin123') {
        alert('✅ Login Successful! Redirecting...');
        window.location.href = 'admin.html';
    } else {
        alert('❌ Invalid email or password. Please try again.');
    }
});

// ====== Register Logic ======
function registerAdmin() {
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    if (!name || !email || !password) {
        alert('❌ Please fill in all fields.');
        return;
    }

    alert(`✅ Registration Successful! Welcome, ${name}. Redirecting to Login...`);
    window.location.href = 'login.html';
}

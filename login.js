document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const mainContainer = document.getElementById('main-container');

    // Hardcoded credentials (replace with secure authentication in production)
    const validUsername = 'admin';
    const validPassword = 'admin';

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (checkCredentials(username, password)) {
            showMainContent();
        } else {
            alert('Rangt notandanafn eða lykilorð. Vinsamlegast reyndu aftur.');
        }
    });

    function checkCredentials(username, password) {
        return username === validUsername && password === validPassword;
    }

    function showMainContent() {
        loginContainer.style.display = 'none';
        mainContainer.style.display = 'block';

    }
});
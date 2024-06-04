document.addEventListener('DOMContentLoaded', (event) => {
    // Validación del formulario de registro
    const form = document.getElementById('registroForm');
    if (form) {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });

        const nombreCompleto = document.getElementById('nombreCompleto');
        const nombreUsuario = document.getElementById('nombreUsuario');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        const password = document.getElementById('password');
        const repeatPassword = document.getElementById('repeatPassword');
        const fechaNacimiento = document.getElementById('fechaNacimiento');

        // Set max date for fechaNacimiento to today's date
        const today = new Date().toISOString().split('T')[0];
        fechaNacimiento.setAttribute('max', today);

        nombreCompleto.addEventListener('input', () => validateField(nombreCompleto, /^[a-zA-Z\s]{1,25}$/));
        nombreUsuario.addEventListener('input', () => validateField(nombreUsuario, /^[a-zA-Z0-9]{4,16}$/));
        email.addEventListener('input', () => validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/));
        telefono.addEventListener('input', () => validateField(telefono, /^[0-9]{1,9}$/));
        password.addEventListener('input', () => {
            validateField(password, /^[a-zA-Z0-9]{4,12}$/);
            validatePasswordMatch();
        });
        repeatPassword.addEventListener('input', validatePasswordMatch);
    }

    function validateField(field, regex) {
        if (!regex.test(field.value.trim())) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        }
    }

    function validatePasswordMatch() {
        const password = document.getElementById('password');
        const repeatPassword = document.getElementById('repeatPassword');
        if (password.value !== repeatPassword.value) {
            repeatPassword.classList.add('is-invalid');
            repeatPassword.classList.remove('is-valid');
        } else {
            repeatPassword.classList.remove('is-invalid');
            repeatPassword.classList.add('is-valid');
        }
    }

    // Autenticación de usuarios
    const adminAccount = {
        username: "admin",
        password: "admin123"
    };

    function checkAdminLogin(username, password) {
        return username === adminAccount.username && password === adminAccount.password;
    }

    function checkUserLogin(username, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        return users.find(user => user.nombreUsuario === username && user.password === password);
    }

    function loginUser(event) {
        event.preventDefault(); // Para evitar que el formulario se envíe
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('passwordLogin').value;

        if (checkAdminLogin(username, password) || checkUserLogin(username, password)) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);
            alert("Bienvenido, " + username + "!");
            updateSessionStatus();
            window.location.href = "index.html"; // Redirigir a la página principal o administrador
        } else {
            document.getElementById('loginError').style.display = 'block';
        }
    }

    function logoutUser() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        alert("Sesión cerrada.");
        updateSessionStatus();
        window.location.href = "index.html"; // Redirigir a la página principal
    }

    function toggleUserDropdown(loggedIn) {
        const userDropdown = document.getElementById('userDropdown');
        const loginLink = document.getElementById('loginLink');
        const registroLink = document.getElementById('registroLink');
        
        if (loggedIn) {
            const username = localStorage.getItem('username');
            document.getElementById('userDropdownButton').innerText = username;
            userDropdown.style.display = 'block';
            loginLink.style.display = 'none';
            registroLink.style.display = 'none';
        } else {
            userDropdown.style.display = 'none';
            loginLink.style.display = 'block';
            registroLink.style.display = 'block';
        }
    }

    function updateSessionStatus() {
        const sessionStatus = document.getElementById('sessionStatus');
        const cartLink = document.getElementById('cartLink');
        const logoutLink = document.getElementById('logoutLink');
        const configLink = document.getElementById('configLink');
        const loginLink = document.getElementById('loginLink');
        const registroLink = document.getElementById('registroLink');
        const userIcon = document.getElementById('userIcon');
        const divider = document.getElementById('divider');
        const inicioSection = document.getElementById('inicioSection');
        const userDropdownButton = document.getElementById('userDropdownButton');
        const userDropdown = document.getElementById('userDropdown');

        const loggedIn = localStorage.getItem('loggedIn') === 'true';
        if (loggedIn) {
            const username = localStorage.getItem('username');
            sessionStatus.innerHTML = `Bienvenido, ${username}`;
            inicioSection.style.display = 'none';
            cartLink.style.display = 'block';
            logoutLink.style.display = 'block';
            configLink.style.display = 'block';
            loginLink.style.display = 'none';
            registroLink.style.display = 'none';
            divider.style.display = 'block';
            userIcon.src = 'imagenes/usuario/icono.jpg'; // Icono para usuario logueado
            userDropdownButton.innerText = username; // Mostrar nombre de usuario en el dropdown
            userDropdown.style.display = 'block'; // Mostrar el dropdown del usuario
        } else {
            sessionStatus.innerHTML = 'No has iniciado sesión';
            cartLink.style.display = 'none';
            logoutLink.style.display = 'none';
            configLink.style.display = 'none';
            loginLink.style.display = 'block';
            registroLink.style.display = 'block';
            divider.style.display = 'none';
            userIcon.src = 'icono.jpg'; // Icono para usuario no logueado
        }
        toggleUserDropdown(loggedIn);
    }

    document.getElementById('loginForm')?.addEventListener('submit', loginUser);
    document.getElementById('logoutLink')?.addEventListener('click', logoutUser);
    updateSessionStatus();
});

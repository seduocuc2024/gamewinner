document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('registroForm');
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

    nombreCompleto.addEventListener('input', function() {
        validateField(this, /^[a-zA-Z\s]{1,25}$/);
    });

    nombreUsuario.addEventListener('input', function() {
        validateField(this, /^[a-zA-Z0-9]{4,16}$/);
    });

    email.addEventListener('input', function() {
        validateField(this, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    telefono.addEventListener('input', function() {
        validateField(this, /^[0-9]{1,9}$/);
    });

    password.addEventListener('input', function() {
        validateField(this, /^[a-zA-Z0-9]{4,12}$/);
        validatePasswordMatch();
    });

    repeatPassword.addEventListener('input', validatePasswordMatch);

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
        if (password.value !== repeatPassword.value) {
            repeatPassword.classList.add('is-invalid');
            repeatPassword.classList.remove('is-valid');
        } else {
            repeatPassword.classList.remove('is-invalid');
            repeatPassword.classList.add('is-valid');
        }
    }
});

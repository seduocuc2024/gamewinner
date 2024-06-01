// script.js

const users = [];
let cart = [];

// Función para validar y registrar usuario
function validarFormulario() {
    const form = document.getElementById('registroForm');
    const nombreCompleto = document.getElementById('nombreCompleto');
    const nombreUsuario = document.getElementById('nombreUsuario');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeatPassword');
    const fechaNacimiento = document.getElementById('fechaNacimiento');
    let valido = true;

    // Validar nombre completo
    if (!nombreCompleto.value.trim()) {
        nombreCompleto.classList.add('is-invalid');
        valido = false;
    } else {
        nombreCompleto.classList.remove('is-invalid');
    }

    // Validar nombre de usuario
    if (!nombreUsuario.value.trim()) {
        nombreUsuario.classList.add('is-invalid');
        valido = false;
    } else {
        nombreUsuario.classList.remove('is-invalid');
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.classList.add('is-invalid');
        valido = false;
    } else {
        email.classList.remove('is-invalid');
    }

    // Validar contraseña
    if (!password.value.trim()) {
        password.classList.add('is-invalid');
        valido = false;
    } else {
        password.classList.remove('is-invalid');
    }

    if (password.value !== repeatPassword.value) {
        repeatPassword.classList.add('is-invalid');
        valido = false;
    } else {
        repeatPassword.classList.remove('is-invalid');
    }

    // Validar fecha de nacimiento
    if (!fechaNacimiento.value.trim()) {
        fechaNacimiento.classList.add('is-invalid');
        valido = false;
    } else {
        fechaNacimiento.classList.remove('is-invalid');
    }

    if (valido) {
        const newUser = {
            nombreCompleto: nombreCompleto.value.trim(),
            nombreUsuario: nombreUsuario.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
            fechaNacimiento: fechaNacimiento.value.trim(),
            direccion: document.getElementById('direccion').value.trim()
        };
        users.push(newUser);
        alert('Registro exitoso');
        form.reset();
    }
    return false;
}

// Función de login de usuario
function loginUser() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('passwordLogin').value.trim();

    const user = users.find(user => user.nombreUsuario === username && user.password === password);

    if (user) {
        alert(`Bienvenido, ${user.nombreCompleto}`);
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('cartSection').style.display = 'block';
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('cartLink').style.display = 'block';
    } else {
        alert('Usuario o contraseña incorrectos');
    }

    return false;
}

// Función para agregar producto al carrito
function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice
    };
    cart.push(product);
    updateCartDisplay();
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.textContent = `${product.name} - $${product.price}`;
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => {
            cart.splice(index, 1);
            updateCartDisplay();
        };
        listItem.appendChild(removeButton);
        cartItems.appendChild(listItem);
        total += product.price;
    });

    document.getElementById('totalPrice').textContent = `Total: $${total}`;
}

// Función para finalizar la compra
function checkout() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
    } else {
        alert('Compra finalizada');
        cart = [];
        updateCartDisplay();
    }
}

// Mostrar la sección de login al hacer clic en el enlace
document.getElementById('loginButton').addEventListener('click', () => {
    document.getElementById('inicioSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
});

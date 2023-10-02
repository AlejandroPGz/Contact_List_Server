//login
const formLogin = document.querySelector('#login-form');
const inputUserLogin = document.querySelector('#login-user');
const inputPasswordLogin = document.querySelector('#login-password');
const btnLogin = document.querySelector('#login-btn');

//sing up
 const formSingUp = document.querySelector('#singup-form');
 const inputUserSingUp = document.querySelector('#singup-user');
 const inputPasswordSingUp = document.querySelector('#singup-password');
 const btnSingUp = document.querySelector('#singup-btn');

// //notificacion y otros
 const notificacion = document.querySelector('#noti');
 const REGEXINPUT = /^\s*$/;
 const currentPage = window.location.href;
const funcionNotification = (mensaje) => {
    notificacion.innerHTML = `${mensaje}`
    notificacion.classList.add('show-notification');
    setTimeout(() => {
        notificacion.classList.remove('show-notification');
    }, 3000);
};

if (currentPage.includes("index.html")) {
    formLogin.addEventListener('submit', async e => {
        e.preventDefault();
        const responseUsers = await fetch('http://localhost:4040/usuarios', {method: 'GET'})
        const users = await responseUsers.json();
        const verificarRepetidos = users.find(user => user.usuarioNombre === inputUserLogin.value);
        const verificarContraseña = users.find(user => user.password === inputPasswordLogin.value);
        if (!verificarRepetidos) {
            funcionNotification("El usuario no existe");
        } else {
            if (verificarContraseña) {
                localStorage.setItem('user', JSON.stringify(verificarRepetidos))
                window.location.href = 'home/home.html'
            } else {
                funcionNotification("Contraseña incorrecta");
            }
        }
    
    })
    
}

if (currentPage.includes("singup.html")) {
    formSingUp.addEventListener('submit', async e => {
        e.preventDefault();
        const responseUsers = await fetch('http://localhost:4040/usuarios', {method: 'GET'})
        const users = await responseUsers.json();
        const verificarRepetidos = users.find(user => user.usuarioNombre === inputUserSingUp.value);
        console.log(users, verificarRepetidos);
        
        const inputCreateVacio = REGEXINPUT.test(inputUserSingUp.value);
        const inputpassVacio = REGEXINPUT.test(inputPasswordSingUp.value);
        if (inputCreateVacio) {
           funcionNotification("No puede estar vacio");
        } else if (verificarRepetidos) {
            funcionNotification("El usuario ya existe");
        } else if (inputpassVacio) {
            funcionNotification("Contraseña no puede estar vacia");
        } else {
            await fetch('http://localhost:4040/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({usuarioNombre: inputUserSingUp.value, password: inputPasswordSingUp.value})
            })
            funcionNotification(`Usuario ${inputUserSingUp.value} Creado, Redirigiendo a Login...`);
            inputUserSingUp.value = "";
            inputPasswordSingUp.value = "";
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 4000);
        }
    })
    
    
}



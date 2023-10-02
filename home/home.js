const inputName = document.querySelector('#input-name');
const inputNumber = document.querySelector('#input-number');
const boton = document.querySelector('.boton');
const form = document.querySelector('#form');
const list = document.querySelector('#list');
const closeBtn = document.querySelector('#close-sesion');

const addContacts = (nombre, numero, id ) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <div id="delete-icon"><button class="butons delete-icon"><svg class="svg svg-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
  </svg>   
              </button>
              </div>
              <div id="text">
            <input class="inputs inputs-edit" type="text" value="${nombre}" readonly>
            <input class="inputs inputs-edit" type="text" value="${numero}" readonly>
            </div>
            <div id="edit-boton">
            <button class="butons edit-icon"><svg id="edit" class="svg boton-editar" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg> <svg id="save-btn" class="hide-svg svg save-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/></svg>
            
              </button> 
              </div>
    `
    listItem.setAttribute('id', `${id}`);
    list.append(listItem);
    inputName.value = '';
    inputNumber.value = '';
};

const getContactos = async () => {
    const response = await fetch('http://localhost:4040/contactos', {method: 'GET'})
    const todos = await response.json();
    const userContacts = todos.filter(contacto => contacto.user === currentUser.usuarioNombre);
    userContacts.forEach(element => {
        addContacts(element.nombreContacto, element.numero, element.id);
    });
} 

const currentUser = JSON.parse(localStorage.getItem('user'));
if (!currentUser) {
    window.location.href = "../index.html";
}


const NUMER_REGEX = /^((412)|(212)|(414)|(424)|(416)|(426))[0-9]{7}$/;
const NAME_REGEX = /^[A-Z-Ñ][a-ñ-zá-ú]{2,18}$/;

let nameValidation = false;
let numberValidation = false;

// funcion validar los inputs, name y number
const VALIDAR = (input, verification) => {
    const mensaje = input.parentElement.children[1];

    if (numberValidation && nameValidation) {
        boton.disabled = false;
        boton.classList.add('boton-activado')
    } else {
        boton.disabled = true;
        boton.classList.remove('boton-activado')
    }

    if (!input.value) {
        input.classList.remove('error');
        input.classList.remove('success');
        mensaje.classList.remove('show');
    } else if (verification) {
        input.classList.remove('error');
        input.classList.add('success'); 
        mensaje.classList.remove('show');
    } else {
        input.classList.add('error')
        input.classList.remove('success');
        mensaje.classList.add('show');
    };
};

//validacion del nombre
inputName.addEventListener('input', e => {
    nameValidation = NAME_REGEX.test(inputName.value)
    VALIDAR (inputName, nameValidation);
     
});

//validacion del numero
inputNumber.addEventListener('input', e => {
    numberValidation = NUMER_REGEX.test(inputNumber.value)
    VALIDAR (inputNumber, numberValidation);

});

//enviar elementos del form, subirlos al local store, y añadirlos al html
// form.addEventListener('submit', e => {
//     e.preventDefault();
//     const li = document.createElement('li');
//     li.innerHTML = `
//     <div id="delete-icon"><button class="butons delete-icon"><svg class="svg svg-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//     <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
//   </svg>   
//               </button>
//               </div>
//               <div id="text">
//             <input class="inputs inputs-edit" type="text" value="${inputName.value}" readonly>
//             <input class="inputs inputs-edit" type="text" value="${inputNumber.value}" readonly>
//             </div>
//             <div id="edit-boton">
//             <button class="butons edit-icon"><svg class="svg boton-editar" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
//               </svg> <svg class="hide-svg svg save-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/></svg>
            
//               </button> 
//               </div>
//     `;
//     list.append(li);
//     localStorage.setItem('LISTACONTACTO', list.innerHTML);
//     inputName.value = '';
//     inputNumber.value = '';
//     VALIDAR(inputName);
//     VALIDAR(inputNumber);
//     nameValidation = false;
//     numberValidation = false;
//     boton.disabled = true;
//     boton.classList.remove('boton-activado')
// });

form.addEventListener('submit', async e => {
    e.preventDefault();
    
    const firstResponse = await fetch('http://localhost:4040/contactos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombreContacto: inputName.value, numero: inputNumber.value , user: currentUser.usuarioNombre})
    })

    const response2 = await firstResponse.json()

    console.log(response2);
    addContacts(inputName.value, inputNumber.value, response2.id);
    VALIDAR(inputName);
    VALIDAR(inputNumber);
    nameValidation = false;
    numberValidation = false;
    boton.disabled = true;
    boton.classList.remove('boton-activado')
});

list.addEventListener('click', async e => {
    // borrar li
    if (e.target.closest('.delete-icon')) {
        const idLi = e.target.closest('.delete-icon').parentElement.parentElement.id;
        console.log(idLi);
         await fetch(`http://localhost:4040/contactos/${idLi}`, {method: 'DELETE'})
        e.target.closest('.delete-icon').parentElement.parentElement.remove();
    }

    let editNameValidation = true;
    let editNumberValidation = true;   
    
    //funcion editar
    const editarElementos = (input, validation, boton2) => {
        if (!input.value) {
            input.classList.remove('error');
            input.classList.remove('success');
        } else if (validation) {
            input.classList.remove('error');
            input.classList.add('success'); 
        } else {
            input.classList.add('error')
            input.classList.remove('success');
        };

        if (editNameValidation && editNumberValidation) {
            boton2.disabled = false;
        } else {
            boton2.disabled = true;
        }
    }
    const botonGuardar = e.target.closest('.edit-icon').children[1];
    const svgEditar = e.target.closest('.edit-icon').children[0];

    //quitar el readonly
    const removeReadonly = (input) => {
        if (input.hasAttribute('readonly')) {
            console.log(botonGuardar,svgEditar);
            input.removeAttribute('readonly');
            svgEditar.classList.add('hide-svg');
            botonGuardar.classList.remove('hide-svg');
            botonGuardar.classList.add('show-svg')
            
            input.classList.add('editando')
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
            } else {

                const idLi = e.target.closest('.edit-icon').parentElement.parentElement.id;
                input.setAttribute('readonly', true);
                input.setAttribute('value', input.value);
                console.log(input.value);
                input.classList.remove('success');
                input.classList.remove('editando')
                svgEditar.classList.add('show-svg');
                svgEditar.classList.remove('hide-svg');
                botonGuardar.classList.add('hide-svg');
                botonGuardar.classList.remove('show-svg')
                localStorage.setItem('LISTACONTACTO', list.innerHTML);

                const inputEditName = e.target.closest('.edit-icon').parentElement.parentElement.children[1].children[0];
                const inputEditNumber = e.target.closest('.edit-icon').parentElement.parentElement.children[1].children[1];
                

                const guardarDatos = async () =>{
                    await fetch(`http://localhost:4040/contactos/${idLi}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({nombreContacto: inputEditName.value, numero: inputEditNumber.value })
                    
                     })
                }
                guardarDatos()

            };

    }

    //editar
    if (e.target.closest('.edit-icon')) {
        //definicion de variables
        
        const inputEditName = e.target.closest('.edit-icon').parentElement.parentElement.children[1].children[0];
        const inputEditNumber = e.target.closest('.edit-icon').parentElement.parentElement.children[1].children[1];
        const botonEditar = e.target.closest('.edit-icon').parentElement.parentElement.children[2].children[0];
        

        removeReadonly(inputEditNumber);
        removeReadonly(inputEditName);
        
            inputEditName.addEventListener('input', e => {
                editNameValidation = NAME_REGEX.test(inputEditName.value);
                editarElementos(inputEditName, editNameValidation, botonEditar);
            })
    
            inputEditNumber.addEventListener('input', e => {
                editNumberValidation = NUMER_REGEX.test(inputEditNumber.value);
                editarElementos(inputEditNumber, editNumberValidation, botonEditar);
            })
        };      
});

closeBtn.addEventListener('click', e => {
    localStorage.removeItem('user');
    window.location.href = "../index.html";
});

// lo primero que cargue es el local store
window.onload = () => {
    getContactos();
}
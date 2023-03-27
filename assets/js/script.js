// bPerm valor del banner permanente - bProm valor del banner promocional - gGemas valor de gemas regaladas
const bPerm = 2000;
const bProm = 4000;
const gGemas = 6000;

//----------Creacion de clases----------

class Personaje {
    constructor(nombre, rareza, tipo, id, img) {
        this.nombre = nombre;
        this.rareza = rareza;
        this.tipo = tipo;
        this.id = id;
        this.img = img;
    }


    asignarId(array) {
        this.id = array.length;
    }
}

class Usuario {
    constructor(nombre, password, gemas, id) {
        this.nombre = nombre;
        this.password = password;
        this.gemas = parseInt(gemas);
        this.id = id;
        this.pjs = [];  //this.pjs = {};

    }

    agregarPj(personaje){//(nombre, rareza, tipo, id, img) 
        //const nuevoPersonaje = new Personaje(array.nombre, array.rareza, array.tipo, array.id);
        //this.pjs.push(nuevoPersonaje); //this.pjs.push(nombre, rareza, tipo, id, img);
        //this.pjs.push(personaje); 
        //this.pjs[personaje.nombre, personaje.rareza, personaje.tipo, personaje.id, personaje.img] = personaje;
        this.pjs.push(personaje);
    }

    // Agregamos un método para eliminar un personaje del array pjs
    /*eliminarPersonaje(nombre) {
    this.pjs = this.pjs.filter(personaje => personaje.nombre !== nombre);
    }*/

    /*iterarPjs() { //intento de iteracion de personajes
        this.pjs.forEach((personaje) => {
            return personaje;
        });
    }*/

    asignarId(array) {
        this.id = array.length;
    }

}

//----------Fin de Creacion de clases----------


//----------Relleno de clases-----------------

const personajes = [

    new Personaje('Low Demon', 'C', 'Fuego', 1, "./assets/img/lowDemon.png"),
    new Personaje('Wet Demon', 'R', 'Agua', 2, "./assets/img/wetDemon.png"),
    new Personaje('Human', 'C', 'Fuego', 3, "./assets/img/human.png"),
    new Personaje('Dark God ', 'UR', 'Oscuridad', 4, "./assets/img/darkGod.png"),
    new Personaje('Void Horn', 'SSR', 'Vacio', 5, "./assets/img/voidHorn.png")

]

const usuarios = [

    new Usuario('coder', '123445', 10000, 1),
    new Usuario('user1', '123', 0, 2),
    new Usuario('user2', '456', 2000, 3)

]

console.log(usuarios)
console.log(personajes)

//----------Fin de Relleno de clases-----------------


//----------Inicializar elementos DOM-----------------


const uLogin = document.getElementById('userLogin'),
    pLogin = document.getElementById('passLogin'),
    recordar = document.getElementById('recordarme'),
    uRegis = document.getElementById('userRegis'),
    pRegis = document.getElementById('passRegis'),
    btnLogin = document.getElementById('btnLogin'),
    btnRegis = document.getElementById('btnRegister'),
    btnOut = document.getElementById('btnLogout'),
    btnBanner = document.getElementById('btnBanPerm'),
    btnPj = document.getElementById('btnPersonajes'),
    cargarGemas = document.getElementById('cargaGemas'),
    btnCarga = document.getElementById('btnRecarga'),
    btnMostrar = document.getElementById('btnPjBanner'),
    modalLogin = document.getElementById('modalLogin'),
    modalRegister = document.getElementById('modalRegister'),
    modalGemas = document.getElementById('modalGemas'),
    modalLog = new bootstrap.Modal(modalLogin),
    modalReg = new bootstrap.Modal(modalRegister),
    modalG = new bootstrap.Modal(modalGemas),
    uGemas = document.getElementById('pCurrency'),
    contMenu = document.getElementById('userMenu'),
    toggles = document.querySelectorAll('.toggles');


//


//----------Creacion de Funciones-----------------

//--------Funciones de sesiones---------
function guardarSesionUsuario(array, storage) {
    const usuario = new Usuario(array.nombre, array.password, array.gemas, array.id)
    storage.setItem('usuario', JSON.stringify(usuario))
    return storage;
}
//Guardamos los datos de sesion de personajes del usuario
function guardarSesionPersonajes(array,storage){
    const personaje = new Personaje(array.nombre, array.rareza, array.tipo, array.id, array.img)
    storage.setItem('personaje', JSON.stringify(personaje))
    return storage;
}

//------------Recupera los datos de sesion del usuario-------------
function recuperarUsuario(storage) {
    let logUser = JSON.parse(storage.getItem('usuario'));
    return logUser;
}

//------------Recupera los datos de personaje de la sesion del usuario-------------
function recuperarPersonaje(storage) {
    
    userPjs = JSON.parse(storage.getItem('personaje'));
    return userPjs.pjs;
}

//------------Recupera los datos de personaje de la sesion del usuario-------------
/*function recuperarPersonaje(storage) {
    recuperarUsuario(storage);
    userPjs = JSON.parse(storage.getItem('personaje'));
    sesionPjs = new Personaje(userPjs.nombre, userPjs.rareza, userPjs.tipo, userPjs.id, userPjs.img);

    return sesionPjs;
}*/

//-----------------Verifica si el usuario queda con la sesion abierta o no---------------
function sesionAbierta(usuario) {
    if (usuario) {
        mGemas(usuario);
        mostrarUser(toggles, 'd-none');
    }
}

sesionAbierta(recuperarUsuario(localStorage));

function mostrarUser(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

function noSesion() {
    localStorage.clear();
    sessionStorage.clear();
}

//-------Fin de las sesiones--------

function loginGame() //Funcion para ingresar al menu de juego
{
    let indice = -1;
    indice = usuarios.findIndex(u => u.nombre === uLogin.value && u.password === pLogin.value);//guarda el indice de donde se encontro el usuario si no existe sigue en -1
    if (indice === -1) {
        alert("Usuario o contraseña incorrectos");
        uLogin.value = '';
        pLogin.value = '';
    }
    if (indice !== -1) {
        alert("Bienvenido/da " + usuarios[indice].nombre);
        guardarSesionUsuario(usuarios[indice], localStorage);
        mGemas(usuarios[indice]);
        //Se cierra la ventana de login
        modalLog.hide();
        //Muestro la informacion para usuarios logueados
        mostrarUser(toggles, 'd-none');
        contMenu.innerHTML = '';
    }
    return { exito: indice !== -1, indice };
}


function nuevoUsuario() { //Crea un nuevo usuario

    let indice = -1;
    indice = usuarios.findIndex(u => u.nombre === uRegis.value);
    if (indice === -1) {

        const usuario = new Usuario(uRegis.value, pRegis.value, gGemas);
        usuarios.push(usuario);
        usuario.asignarId(usuarios);
        console.log(usuarios);
        alert("Usuario creado. Se le regalaron 6000 gemas!!");
        //Se cierra la ventana del registro
        modalReg.hide();
    }
    else {

        alert("usuario ya existe, intente nuevamente");
        uRegis.value = "";
        pRegis.value = "";

    }


}


function abonar(usuario) { //funcion para abonar gemas

    contMenu.innerHTML = '';
    if (Number.isNaN(cargarGemas.value)) {
        alert("El valor ingresado no es un numero");
        cargarGemas.value = '';
    }
    else {
        usuario.gemas = parseInt(usuario.gemas) + parseInt(cargarGemas.value);
        alert("Carga realizada! Favor de refrescar la pagina");
        cargarGemas.value = '';
    }
    modalG.hide();
    mGemas(recuperarUsuario(localStorage));
    localStorage.setItem('usuario', JSON.stringify(usuario));

};

function gacha() { //devuelve un random del array personajes
    const random = Math.floor(Math.random() * personajes.length);
    return personajes[random];
}

function mGemas(user) //Muestra las gemas que se tienen
{
    uGemas.innerHTML = ``;
    uGemas.innerHTML = `<span>${user.gemas}</span>`;
}

// Muestra los personajes del usuario. 
function mostrarPersonajes(usuario) { //Revisar el guardado de los personajes funcion bPermanente, ya que solo muestra el ultimo personaje comprado
    
    //-------- Intento de iteracion 
    /*const contenedor = document.getElementById('personajes');
    contenedor.innerHTML = '';
    usuario.pjs.forEach(personaje => {
      const div = document.createElement('div');
      div.innerHTML = `
        <img src="${personaje.img}">
      `;
      contenedor.appendChild(div);
      console.log("Revisando el contenedor creado:" + contenedor);
    });*/

    contMenu.innerHTML = '';
    usuario.pjs.forEach(personaje => {
        let html = `<div class="card cardGacha" id="tarjeta${personaje.nombre}">
                <img src="${personaje.img}" alt="${personaje.nombre}" class="card-img-bottom" id="imgPersonaje">
            </div>`;
        console.log("Revisando el html: "+ html)
        contMenu.innerHTML += html;
    });


  }


  function mostrarPjBanner(array)
  {

    contMenu.innerHTML = '';
    array.forEach(personaje => {
        let html = `<div class="card cardPersonaje" id="tarjeta${personaje.nombre}">
                <img src="${personaje.img}" alt="${personaje.nombre}" class="card-img-bottom" id="imgPersonajes">
            </div>`;
        console.log("Revisando el html: "+ html)
        contMenu.innerHTML += html;
    });
    mGemas(recuperarUsuario(localStorage));
  }



function bPermanente(user) { //Compra el banner permanente y guarda el nuevo personaje
    contMenu.innerHTML = '';
    alert("El valor del banner permanente es de: " + bPerm + " gemas");
    if (user.gemas >= bPerm) {
        user.gemas = parseInt(user.gemas) - bPerm;
        let nuevoPersonaje = gacha();

        //--- Se intento cambiar el como pj guarda la informacion pero currentUser.agregarPj(pj) sigue siendo undeifned
        //const pj = [{nuevoPersonaje}];
        //const pj = [nuevoPersonaje.nombre, nuevoPersonaje.rareza, nuevoPersonaje.tipo, nuevoPersonaje.id, nuevoPersonaje.img];
        /*const pj = [{nombre: nuevoPersonaje.nombre, 
            rareza: nuevoPersonaje.rareza, 
            tipo: nuevoPersonaje.tipo, 
            id: nuevoPersonaje.id, 
            img: nuevoPersonaje.img
        }];*/
        //console.log(pj);
        //console.log(currentUser.agregarPj(nuevoPersonaje.nombre, nuevoPersonaje.rareza, nuevoPersonaje.tipo, nuevoPersonaje.id, nuevoPersonaje.img)); Se uso con el cambio a la clase Usuario, sin novedades
        const pj = new Personaje(nuevoPersonaje.nombre, nuevoPersonaje.rareza, nuevoPersonaje.tipo, nuevoPersonaje.id, nuevoPersonaje.img);
        const currentUser = new Usuario(user.nombre, user.password, user.gemas, user.id);
        console.log(pj);
        console.log(currentUser.agregarPj(pj)); // queda como undefined, no se ha encontrado solucion
        localStorage.setItem('usuario', JSON.stringify(currentUser));
        localStorage.setItem('personaje', JSON.stringify(pj));
        alert("Has jugado al Banner Permanente. \nObtuviste a: " + nuevoPersonaje.nombre + ", de rareza " + nuevoPersonaje.rareza + ".");
    }
    else {
        alert("Gemas insuficientes, tienes: " + user.gemas + " gemas");
    }
    mGemas(user);

}

//----------Fin de Creacion de Funciones-----------------




//----------Inicio de interaccion con Usuario-----------------


//--------Ingresar al juego-------------
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    if (!uLogin.value || !pLogin.value) {
        alert('Todos los campos son requeridos');
    } else {

        loginGame();
    }

});

//--------Registrarse en el juego-------------
btnRegis.addEventListener('click', (e) => {
    e.preventDefault();

    //Se valida que los campos esten con datos
    if (!uRegis.value || !pRegis.value) {
        alert('Todos los campos son requeridos');
    } else {

        nuevoUsuario();
    }
});


//--------Se recargan gemas del juego-------------
btnCarga.addEventListener('click', (e) => {
    e.preventDefault();

    if (!cargarGemas.value) {
        alert('Todos los campos son requeridos');
    } else {

        abonar(recuperarUsuario(localStorage));
    }
});

//--------Se sale del juego-------------
btnOut.addEventListener('click', (e) => {
    e.preventDefault();

    noSesion();
    mostrarUser(toggles, 'd-none');
    uLogin.value = '';
    pLogin.value = '';
    uRegis.value = '';
    pRegis.value = '';

});

//--------Muestra los personajes del jugador-------------
btnPj.addEventListener('click', () => {
    const usuario = recuperarUsuario(localStorage);
    //const personaje = recuperarPersonaje(localStorage);
    //console.log("Se recupera personaje: "+ personaje.nombre);
    mostrarPersonajes(usuario);
    
    
});

btnMostrar.addEventListener('click', () => {

    mostrarPjBanner(personajes);

});

//------------Obteniene personajes para el jugador-------------
btnBanner.addEventListener('click', (e) => {
    e.preventDefault();

    bPermanente(recuperarUsuario(localStorage))

});

// Derechos Reservados a Wladimir Ismael Concha Vargas
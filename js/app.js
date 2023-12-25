class Carta {
    constructor(id, gustos, precio, dolarAntes) {
        this.id = parseInt(id);
        this.gustos = gustos;
        this.precio = parseFloat(precio);
        this.dolarAntes = parseFloat(dolarAntes)
    }
    static contador = 1;
    actualizarValor(nuevoDolar){
        this.precio = Math.floor(this.precio*nuevoDolar/this.dolarAntes)
    }
}

let menu = [];

async function cargarMenu (){
    try {
        let result = await fetch('menu.json');
        let data = await result.json()
        data.forEach(el => {
            menu.push(new Carta (Carta.contador, el.gustos, el.precio, el.dolarAntes))
            Carta.contador++
        })
        console.log(menu)
        document.body.appendChild(autenticacion);
    } catch (error) {
        let errorDocumento = document.createElement('div')
        errorDocumento.innerHTML='<span>Ocurrio un error inesperado. Por favor, intente ingresar mas tarde. Disculpe las molestias.</span>'
        document.body.appendChild(errorDocumento)
        console.log(error.message)
    }
}

sessionStorage.clear() //Limpiamos el storage

let introduccion = document.createElement('div');
introduccion.className='firstdiv';
introduccion.innerHTML=`<h1 class="titulointroduccion">Bienvenidos a Don Corleone</h1>`; //Inner HTML es contenido HTML
document.body.appendChild(introduccion);

let autenticacion = document.createElement('form');
autenticacion.className='autenticacion container_fluid';
autenticacion.innerHTML=`<h3>Ingrese cualquier tecla si desea realizar una compra.</h3><h5>Si usted es el administrador, por favor ingrese su contraseña.</h5>
<label for="contraseña">Ingrese contraseña: <input type="password" class="contraseña" id="contraseña"></label>
<input type="submit" id="ingresarContraseña" value="Ingresar">`;
cargarMenu();
autenticacion.addEventListener("submit", validarContraseña)

let menuAdmin = document.createElement('div');
menuAdmin.className='menuAdmin';

let formularioDolar = document.createElement('form');
formularioDolar.className='formularioDolar container_fluid';
formularioDolar.innerHTML = `<h3>Formulario para actualizar dolar</h3>
<label for="nuevoDolar">Ingrese nuevo dolar: <input type="number" required min="0" step="any" id="nuevoDolar"></label>
<input type="submit" id="actualizarDolar" value="Actualizar">`;
formularioDolar.addEventListener("submit", actualizarDolar)

let formularioProducto = document.createElement('form');
formularioProducto.className='formularioProducto';
formularioProducto.innerHTML = `<h3>Formulario para nuevo gusto</h3>
<label for="nuevoGusto">Ingrese nuevo gusto: <input type="text" required id="nuevoGusto"></label><br>
<label for="nuevoPrecio">Ingrese nuevo precio: <input type="number" required min="0" step="any" id="nuevoPrecio"></label><br>
<label for="nuevoDolarProducto">Ingrese valor del dolar: <input type="number" required min="0" step="any" id="nuevoDolarProducto"></label><br>
<input type="submit" id="agregarProducto" value="Agregar">`;
formularioProducto.addEventListener("submit", agregarProducto);

let cartaAdmin = document.createElement('div');
cartaAdmin.className='cartaAdmin';

let salirAdmin = document.createElement('button');
salirAdmin.className='salirAdmin';
salirAdmin.innerText = 'Salir';
salirAdmin.addEventListener("click", salirMenuAdmin)

let menuCompra = document.createElement('div');
menuCompra.className='menuCompra';
menuCompra.innerHTML = `<h2>¿Qué desea comprar?</h2>`

let cartaCompra = document.createElement('div');

let carritoHTML = document.createElement('aside');
carritoHTML.className='carritoHTML';
carritoHTML.id = 'Carrito_cliente'

function validarContraseña(e){
    e.preventDefault(); //Evitamos el comportamiento por defecto de la etiqueta form
    let formularioContraseña = e.target
    actualizarCartaAdmin()
    // console.log(formularioContraseña.children[1].children[0])
    let inputContraseña = document.getElementById('contraseña').value
    autenticacion.remove()
    if(inputContraseña === '1234'){
        document.body.appendChild(menuAdmin);
        menuAdmin.appendChild(formularioDolar);
        menuAdmin.appendChild(formularioProducto);
        menuAdmin.appendChild(cartaAdmin);
        menuAdmin.appendChild(salirAdmin);
    }else{
        document.body.appendChild(menuCompra);
        actualizarCartaCompra()
        menuCompra.appendChild(cartaCompra);
    }
}

function actualizarCartaAdmin (){
    cartaAdmin.innerHTML = `<h2>Carta actualizada</h2>`
    menu.forEach(el => {
        cartaAdmin.innerHTML = cartaAdmin.innerHTML + `<br>
        <span>ID: ${el.id}</span><br>
        <span>Gusto: ${el.gustos}</span><br>
        <span>Precio: $${el.precio}</span><br>
        <span>Dolar: $${el.dolarAntes}</span><br>`
    })
}

function actualizarDolar(e){
    e.preventDefault();
    let nuevoDolar = document.getElementById('nuevoDolar').value;
    menu.forEach((el) => el.actualizarValor(nuevoDolar))
    menu.forEach((el) => el.dolarAntes=nuevoDolar)
    actualizarCartaAdmin ()
}

function agregarProducto(e){
    e.preventDefault();
    let nuevoGusto =document.getElementById('nuevoGusto').value;
    let nuevoPrecio =document.getElementById('nuevoPrecio').value;
    let nuevoDolarProducto =document.getElementById('nuevoDolarProducto').value;
    menu.push(new Carta (Carta.contador, nuevoGusto, nuevoPrecio, nuevoDolarProducto));
    Carta.contador++
    actualizarCartaAdmin ()        
}

function salirMenuAdmin(e){
    e.preventDefault();
    menuAdmin.remove()
    document.body.appendChild(menuCompra);
    actualizarCartaCompra()
    menuCompra.appendChild(cartaCompra);
}

function actualizarCartaCompra(){
    cartaCompra.innerHTML=`<h2>Carta</h2>`;
    for (const item of menu){
        let card = document.createElement('form')
        card.className=`Card_${item.id}`
        card.innerHTML = 
        ` Gusto: ${item.gustos} <br>
        Precio: $${item.precio}
        <input type="number" min="0.5" step="0.5" name="${item.id}" inputmode="numeric" id="Input_${item.id}" value="0">
        <input type="submit" id="agregarProducto_${item.id}" value="Agregar al carrito">
        <hr>
        `
        card.addEventListener('submit', agregarAlCarrito)
        cartaCompra.appendChild(card)
    }
}

function agregarAlCarrito(e){
    e.preventDefault();
    let formularioActivo = e.target; //Aislamos el formulario que ejecuto este evento
    let inputActivo = formularioActivo.children[1]; //Conociendo la estructura del form, accedemos al input numerico
    let idPizza = parseInt(inputActivo.name); //El name del input coincide con el id de la pízza
    let cantidadPizza = parseFloat(inputActivo.value); //Sacamos la cantidad de pizza a comprar
    let pizza = menu.find((el) => el.id===idPizza) //Siempre va a encontrar una pizza
    
    let carrito = JSON.parse(sessionStorage.getItem("Carrito"));
    if(carrito==null){
        carrito=[] //Si no tenemos items en el storage, este devuelve null. En ese caso lo cambiamos por [] para continuar el codigo
    }

    let indice = carrito.findIndex((el) => el.id === pizza.id)
    if (indice === -1){
        let nuevaPizza = {
            id: pizza.id,
            gustos: pizza.gustos,
            precio: pizza.precio,
            cantidad: cantidadPizza
        }
        carrito.push(nuevaPizza)
    } else {
        carrito[indice].cantidad+=cantidadPizza
    }

    const enJSON = JSON.stringify(carrito);
    guardarSesion("Carrito", enJSON);

    mostrarCarrito()
}

function mostrarCarrito(){
    let existeCarrito = document.getElementById('Carrito_cliente') //Si en el HTML no existe el carrito, lo creamos
    let carrito = JSON.parse(sessionStorage.getItem("Carrito"));
    if(!existeCarrito){
        document.body.appendChild(carritoHTML)
    }
    if(carrito.length===0){ 
        existeCarrito.remove() //Si el carrito esta vacio, no mostramos la seccion carrito
    } else{
    carritoHTML.innerHTML=`<h3>Su carrito es:</h3>`
    let contenidoCarrito = document.createElement('div')
    contenidoCarrito.innerHTML = ''
    let i = 0
    carrito.map(p=>{
        let itemCarrito = document.createElement('div')
        itemCarrito.id = `Item_${p.id}`
        itemCarrito.innerHTML =`
        Gusto: ${p.gustos}<br>
        Cantidad: ${p.cantidad}<br>
        Precio: $${p.precio}<br>
        Subtotal: $${p.cantidad*p.precio}<br><br>`
        contenidoCarrito.appendChild(itemCarrito)
        let botonItemCarrito = document.createElement('button')
        botonItemCarrito.id=`Boton_${i}`
        botonItemCarrito.innerText='Eliminar del carrito'
        botonItemCarrito.addEventListener('click', eliminarItemCarrito)
        itemCarrito.appendChild(botonItemCarrito)
        i++
    })
    carritoHTML.appendChild(contenidoCarrito)
    let botonCarrito = document.createElement('button')
    botonCarrito.className='botonCarrito';
    botonCarrito.innerText='Finalizar compra'
    botonCarrito.addEventListener('click', finalizarCompra)
    carritoHTML.appendChild(botonCarrito)  
    let botonCarrito2 = document.createElement('button')
    botonCarrito2.innerText='Limpiar carrito'
    botonCarrito2.addEventListener('click', limpiarCarrito)
    carritoHTML.appendChild(botonCarrito2)      
    }
}

function finalizarCompra(){
    let carrito = JSON.parse(sessionStorage.getItem("Carrito"));
    let totalCompra = carrito.reduce((acumulador, el) => acumulador + el.precio*el.cantidad, 0)
    Swal.fire({
        title: "¿Desea finalizar la compra?",
        showCancelButton: true,
        confirmButtonColor: "#009900",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar",
        cancelButtonText:"Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Su pedido ya ha sido realizado. Gracias por confiar en nosotros.",
            html: `El total de su compra es: $${totalCompra}.<br> En 30 minutos su pedido estará listo para pasarlo a buscar.`,
            icon: "success"
            
          });
        }
      });
    }

function eliminarItemCarrito(e){
    let boton = e.target; //Extraemos el boton que activo el evento
    let idBoton = boton.id; //Obtenemos el id del boton: Boton_n siendo n su posicion
    let posicionProducto = idBoton.substring(6) //Obtenemos n
    let carrito = JSON.parse(sessionStorage.getItem("Carrito"));
    carrito.splice(posicionProducto,1) //Eliminamos el enenismo elemento del carrito
    const enJSON = JSON.stringify(carrito);
    guardarSesion("Carrito", enJSON);
    mostrarCarrito()
}

function limpiarCarrito(e){
    let carrito = []
    const enJSON = JSON.stringify(carrito);
    guardarSesion("Carrito", enJSON);
    mostrarCarrito()
}

//Funciones del storage
const guardarSesion = (clave, valor) => { sessionStorage.setItem(clave, valor) };

//Funciones de fetch





let sumaPrecio = 0;
let dolarAyer = 350

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

const menu = [];
menu.push(new Carta (Carta.contador, "Pizza de Jamon y Queso", 1250, dolarAyer));
Carta.contador++
menu.push(new Carta (Carta.contador, "Napolitana", 2000, dolarAyer));
Carta.contador++
menu.push(new Carta (Carta.contador, "Pizza de Pollo", 2500, dolarAyer));

console.log(menu);

let user=prompt("¡Bienvenidos a Don Corleone!"+"\n"+"Si usted desea comprar nuestros productos, por favor seleccione cualquier tecla."+"\n"+"Si usted es el administrador, por favor coloque su contraseña.");
if(user==="1234"){
    let act=prompt("Este es el menu actual. ¿Desea actualizar el Dolar o agregar un nuevo Producto? D/P"+"\n"+"Si desea salir del menu apriete N."+"\n"+mostrarMenu(menu, true));
    act = act.toUpperCase()
    console.log(act!=="N")
    while(act!=="N"){
        switch(act){
            case "D":
                let dolarHoy=prompt("Inserte valor del dolar actual");
                dolarHoy = validarNumero(dolarHoy);
                // menu.forEach((el) => el.precio=Math.floor(el.precio*dolarHoy/el.dolarAntes)) //Sin metodo del objeto Carta
                menu.forEach((el) => el.actualizarValor(dolarHoy))
                menu.forEach((el) => el.dolarAntes=dolarHoy)
                alert("Se actualizo el valor del dolar. El menu actualizado es:"+ "\n" + mostrarMenu(menu, true))
            break
            case "P":
                let nuevoGusto = prompt("Ingrese el gusto del nuevo producto");
                let nuevoPrecio = parseFloat(prompt("Ingrese el precio del nuevo producto"));
                nuevoPrecio = validarNumero(nuevoPrecio);
                let nuevoDolar = parseFloat(prompt("Ingrese el valor del dolar para el nuevo producto"));
                nuevoDolar=validarNumero(nuevoDolar);
                Carta.contador++;
                menu.push(new Carta (Carta.contador, nuevoGusto, nuevoPrecio, nuevoDolar));
                alert("Nuevo producto producto agregado. El menu actualizado es:"+ "\n" + mostrarMenu(menu, true))
            break
        }
        act=prompt("¿Desea realizar otro cambio? P: Producto, D: Dolar, N: Salir")
        act = act.toUpperCase()
    }
};

console.log(menu)

const carrito = []

let control = prompt("¿Desea realizar algún pedido? S/N");
while (control !== "n" && control !== "N") {
    if (control === "s" || control === "S") {
        let opcPizza = parseInt(prompt("¿Qué pizza desea comprar?"+ "\n" + mostrarMenu(menu, false)));
        let ctrlPizza = menu.find((el) => el.id===opcPizza);
        console.log(ctrlPizza);
        //Si ctrlPizza existe, ejecutamos calcularPrecio. Si es undefined mostramos el prompt
        if(ctrlPizza){
            let cantidad = validarCantidad();
            agregarAlCarrito(carrito, ctrlPizza, cantidad)
            control = prompt("Su carrito es:"+"\n"+mostrarCarrito(carrito)+"¿Desea realizar algún otro pedido? S/N");
        } else{
            control = prompt("No ha seleccionado una opción válida. ¿Desea continuar con su pedido? S/N");
        }
    } else {
        alert("Por favor, ingrese 'N' si desea salir y 'S' si desea continuar con su compra");
        control = prompt("¿Desea realizar algún pedido? S/N");
    }
}

sumaPrecio = carrito.reduce((acumulador, el) => acumulador + el.precio*el.cantidad, 0)

if(sumaPrecio>0){
    alert("Su carrito es:"+"\n"+mostrarCarrito(carrito)+"Muchas gracias por confiar en nosotros. El total de su compra es $" + sumaPrecio);
}

function validarCantidad(){
        let cantPizza = prompt("Ingrese la cantidad de pizzas que desea comprar");
        cantPizza = parseFloat(cantPizza);
        if((cantPizza%1===0 || cantPizza%1===0.5) && cantPizza>0){
            alert("La cantidad elegida es "+cantPizza);
        }else{
                while((cantPizza%1!==0 && cantPizza%1!==0.5)|| cantPizza<=0){
                    cantPizza=prompt("Ups! Parece que ha ingresado una opcion que no es valida. Puede elegir si desea comprar pizzas enteras o medias pizzas (1/2) ");
                }
                alert("La cantidad elegida es "+cantPizza);
            
        }   
return cantPizza;
}

function mostrarMenu (array, mostrarDolar) {
    let mensaje = "";
    array.forEach(element => {
        if (mostrarDolar){
            mensaje = mensaje + element.id + ". "+ element.gustos +" Precio: $"+element.precio + " Dolar: U$D"+element.dolarAntes +"\n"
        }else{
            mensaje = mensaje + element.id + ". "+ element.gustos +" Precio: $"+element.precio + "\n"
        }
    });
    return mensaje
}

function mostrarCarrito (array) {
    let mensaje = "";
    array.forEach(element => {
            mensaje = mensaje + element.gustos + " Cantidad: " + element.cantidad +" Precio: $"+element.precio + "\n"
    });
    return mensaje
}

function agregarAlCarrito (carrito, pizza, cantidad) {
    let indice = carrito.findIndex((el) => el.id === pizza.id)
    if (indice === -1){
        let nuevaPizza = {
            id: pizza.id,
            gustos: pizza.gustos,
            precio: pizza.precio,
            cantidad: cantidad
        }
        carrito.push(nuevaPizza)
    } else {
        carrito[indice].cantidad+=cantidad
    }
}

function validarNumero(valor) {
    console.log(valor)
    console.log(isNaN(valor))
    while(isNaN(valor)){
        valor = parseFloat(prompt("Por favor, inserte un valor númerico"));
    }

    return valor; // Devuelve el valor validado
}
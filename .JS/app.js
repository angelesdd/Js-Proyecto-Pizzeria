
let sumaPrecio = 0;
let pa = 100;
let pb = 200;
let pc = 300;

let control = prompt("¿Desea realizar algún pedido? S/N");
while (control !== "n" && control !== "N") {
    if (control === "s" || control === "S") {
        let opcPizza = prompt("¿Qué pizza desea comprar?");
        switch (opcPizza) {
            case "a":
                calcularPrecio(pa);
                break;
            case "b":
                calcularPrecio(pb);
                break;
            case "c":
                calcularPrecio(pc);
                break;
            default:
                control = prompt("No ha seleccionado una opción válida. ¿Desea continuar con su pedido? S/N");
        }     
    } else {
        alert("Por favor, ingrese 'N' si desea salir y 'S' si desea continuar con su compra");
        control = prompt("¿Desea realizar algún pedido? S/N");
    }
}

if(sumaPrecio>0){
    alert("Muchas gracias por confiar en nosotros. El total de su compra es $" + sumaPrecio);
}


function cantidad(cantPizza){
        cantPizza = parseFloat(cantPizza);
        if((cantPizza%1===0 || cantPizza%1===0.5) && cantPizza>0){
            alert("La cantidad elegida es "+cantPizza);
        }else{
                while((cantPizza%1!==0 && cantPizza%1!==0.5)|| cantPizza<=0){
                    cantPizza=prompt("Ups! Parece que ha ingresado una opcion que no es valida. Puede elegir si desea comprar pizzas enteras o medias pizzas (1/2) ");
                }
            
        }
    
return cantPizza;
}

function calcularPrecio(valorPizza) {
    let cant = prompt("Ingrese la cantidad de pizzas que desea comprar");
    let cantValidada = cantidad(cant);
    sumaPrecio=sumaPrecio+valorPizza*cantValidada;
    alert("La pizza que desea comprar sale: $" + valorPizza + ". El total es de $" + sumaPrecio);
    control = prompt("¿Desea realizar algún otro pedido? S/N");
}


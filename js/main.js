const btnAgregar = document.getElementById("btnAgregar");
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnClear = document.getElementById("btnClear");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

//Variables de resumen
const contadorProductos = document.getElementById("contadorProductos");
const totalDeProductos = document.getElementById("productosTotal");
const totalPrecio = document.getElementById("precioTotal");

//Variables para la tabla
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let cont = 0;
let costoTotal = 0;
let totalproductos = 0;

let datos = new Array();

function validarCantidad(){
    if (txtNumber.value.length <= 0){
        return false;
    }
    if(isNaN(txtNumber.value)){
        return false;
    }
    if (Number(txtNumber.value) <= 0){
        return false;
    }
    return true;
}

function getPrecio(){
    return Math.round((Math.random() * 10000))/100;
}

//Funcionalidad del boton agregar
btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    
    let isValid = true;
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    txtNumber.style.border = "";
    txtName.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    if(txtName.value.length < 3){
        //1.- Mostrar la alerta en el error
        //2.- borde de color rojo
        txtName.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }
    if (!validarCantidad()){
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es correcta.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }
    if (isValid){
        //Agregar datos a la tabla
        let precio = getPrecio();
        cont++;
        let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td> 
                    </tr>`;
        let elemento = {"cont": cont, 
                        "nombre": txtName.value,
                        "cantidad": txtNumber.value,
                        "precio": precio
                        };

        datos.push(elemento);

        localStorage.setItem("datos", JSON.stringify(datos));
        
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        totalPrecio.innerText = "$ " + costoTotal.toFixed(2);
        contadorProductos.innerText = cont;
        totalproductos += Number(txtNumber.value);
        totalDeProductos.innerText = totalproductos;

        localStorage.setItem("costoTotal", costoTotal);
        localStorage.setItem("totalproductos", totalproductos);
        localStorage.setItem("cont", cont);

        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }
    //console.log("Click...")
});

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtName.value = "";
    txtNumber.value = "";

    cont = 0;
    costoTotal = 0;
    totalproductos = 0;
    totalPrecio.innerText = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    cuerpoTabla.innerHTML = "";
    totalDeProductos.innerText = totalproductos;
    txtNumber.style.border = "";
    txtName.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
}); // btnClear click

window.addEventListener("load", function(event){
    if (this.localStorage.getItem("costoTotal")!=null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }//!null

    if (this.localStorage.getItem("totalproductos")!=null){
        totalproductos = Number(this.localStorage.getItem("totalproductos"));
    }//!null

    if (this.localStorage.getItem("cont")!=null){
        cont = Number(this.localStorage.getItem("cont"));
    }//!null

    if (this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }//!null

    datos.forEach((r)=>{
        let row = `<tr>
                    <td>${r.cont}</td>
                    <td>${r.nombre}</td>
                    <td>${r.cantidad}</td>
                    <td>${r.precio}</td> 
                    </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    totalPrecio.innerText = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    totalDeProductos.innerText = totalproductos;
}); // window load
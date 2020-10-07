/*El cliente nos pide reordenar la lógica del cupón de descuento.
Ahora debemos obtenerlo desde un servicio web.

Eliminar la lógica anterior para mostrar el cupón de descuento.
Obtener los datos del cupón desde el servicio web.
URL: https://demo2420474.mockable.io/getCoupon (GET)

Formato:
{text:"", discountPercentage:00}
 */


if (localStorage.getItem("nombre") != null) {
    let lsNombre = localStorage.getItem("nombre")
    fetch("https://demo2420474.mockable.io/getCoupon").then(function (responsive) {
        return responsive.json();
    }).then(function (cupones) {
        codigoPromo(lsNombre, cupones.text, cupones.discountPercentage)
    })
};

function codigoPromo(nombre, codigo, descuento) {
    alert("Estimado " + nombre + ". Gracias por elegirnos! Le obsequiamos el código: " + codigo + " con un " + descuento + "% del total de su compra.")
};


/*Cuando el visitante llena el formulario, enviar los datos al servidor.

URL: https://demo2420474.mockable.io/submitForm (POST)

Formato:
{name:"", email:"", phone:"",subject:"", message:""}*/

const fnombre = document.querySelector("#nombre");
const femail = document.querySelector("#email");
const tema = document.querySelector("#tema");
const mensaje = document.querySelector("#mensaje");
const telefono = document.querySelector("#telefono");
const form = document.querySelector("#form");
const btnSubmit = document.querySelector("#enviar");
const btnReset = document.querySelector("#borrar");

let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

form.addEventListener("submit", formHandler);
femail.addEventListener("input", emailHandler);
fnombre.addEventListener("input", nombreHandler);
btnSubmit.addEventListener ("click", btnSubmitHandler);
btnReset.addEventListener ("click", btnResetHandler);


function formHandler(event){
    event.preventDefault();
    console.log("se cancelo el default");
    const URL = 'https://demo2420474.mockable.io/submitForm';
    fetch(URL,{
    method:'POST',
    body:JSON.stringify({name:fnombre.value, email:femail.value, phone:telefono.value,subject:tema.value, message:mensaje.value}),
    headers:{'Content-Type':'application/json'}
}).then((res)=>{
    fnombre.value = "";
    femail.value = "";
    telefono.value = "";
    tema.value = "";
    mensaje.value = "";
    btnResetHandler();
    return res.json()
}).then((res)=>{
    console.log("FORMULARIO ENVIADO",res);
    alert("Formulario enviado correctamente");
});
}

function emailHandler(){
  if (regex.test(femail.value)) {
    femail.classList.remove("invalid");
    femail.classList.add("valid");
  } else {
    femail.classList.remove("valid");
    femail.classList.add("invalid");
  }
}

function nombreHandler(){ 
  if (fnombre.value === null || fnombre.value === "") {
    fnombre.classList.remove("valid");
    fnombre.classList.add("invalid");
  } else {
    fnombre.classList.remove("invalid");
    fnombre.classList.add("valid");
  }
}

function btnSubmitHandler(){
  console.log("se hizo click en boton")
  if (fnombre.value === null || fnombre.value === "") {
    fnombre.setCustomValidity("No se aceptan campos vacíos!!!");
  } else {
    fnombre.setCustomValidity("");
  }
  if (regex.test(femail.value)) {
    femail.setCustomValidity("");
  } else {
    femail.setCustomValidity("El campo debe ser del tipo 'ejemplo@ejemplo.com' !!!");//
  }
}

function btnResetHandler(){
  fnombre.classList.remove("valid");
  fnombre.classList.remove("invalid");
  femail.classList.remove("invalid");
  femail.classList.remove("valid");
}
  

 

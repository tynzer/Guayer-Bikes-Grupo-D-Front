//  ERNESTO BUIATTI 

/*Historia de usuario: 
"Como cliente, quiero personalizar la experiencia del usuario en mi sitio para generar *engagement y potenciar su interés en mis productos y servicios de manera de maximizar la posibilidad de compra"

*(El Engagement puede definirse como el nivel de compromiso que tienen los consumidores y usuarios con una marca)*

**Se necesita:**

- Cuando el usuario ingrese al sitio (desde cualquier página) debemos preguntarle si desea ingresar su nombre y su email. Debemos guardar esa información localmente.
- Validar que no ingrese datos vacíos. En el caso del email, solo validar que lo ingresado contenga "." y "@"
- Debemos recordar su decisión para no volver a preguntarle cada vez que ingrese.*/

/*Realizar un refactor de la accion de capturar datos del usuario. Se mantiene el guardado en localStorage y se agrega enviar los datos al servidor del cliente

URL: https://demo2420474.mockable.io/userData (POST)

formato del objeto:
{ token:"", name:"", email:"", sendEmail: boolean }
 */

let aceptaIngresarDatos = false; // este parámetro se guarda en localstorage por unica vez la primera vez que entra
let nombre = "";
let eMail = "";

if (!localStorage.getItem ("aceptaIngresarDatos")){ // si no existe ese key es porque entra por primera vez

    if (confirm("¿Desea ingresar su nombre y su email?")){ // si acepta pide los datos y guarda la decision
        aceptaIngresarDatos = true;
        ingresarNombre();
        ingresarEmail();
        alert ("Datos guardados correctamente");
    }else{
        aceptaIngresarDatos = false;
    }
    localStorage.setItem ("aceptaIngresarDatos", aceptaIngresarDatos);
    const URL = 'https://demo2420474.mockable.io/userData';
    fetch(URL,{
    method:'POST',
    body:JSON.stringify({ token:"GRUPOD2020", name:nombre, email:eMail, sendEmail: aceptaIngresarDatos }),
    headers:{'Content-Type':'application/json'}
}).then((res)=>{
    return res.json()
}).then((res)=>{
    console.log("DATOS ENVIADOS",res)
});

}

/* LUIS

Historia de Usuario: 
"Como cliente, deseo conocer si el visitante nos permite enviarle un email con novedades".
Se necesita:
- Preguntarle al visitante(Desde cualquier página) si podemos enviarle un email con novedades
- Debemos guardar la respuesta para no tener que preguntar cada vez que ingrese.
*/


let novedades = false; 
if(!localStorage.getItem("novedades")){
    if(confirm("¿Quiere usted recibir Novedades?")){
        novedades = true;
        if(!localStorage.getItem("email")){
            ingresarEmail();
        }
        alert("Acepto las novedades en su mail "+localStorage.getItem("email"));
        localStorage.setItem("novedades", novedades);
	}else{
        novedades = false;
        localStorage.setItem("novedades",novedades);
    }
}

function ingresarNombre(){ // insiste hasta que se ingrese correctamente el nombre
    do{
        nombre = prompt ("Ingrese su nombre: ");
        if (validarNombre(nombre)){
            localStorage.setItem ("nombre", nombre);
        }
        else{
            alert ("No se acepta un campo vacío, vuelva a intentarlo por favor");
        }
    }while (!validarNombre(nombre))
}

function ingresarEmail(){ // insiste hasta que se ingrese correctamente el email
    do{
        eMail = prompt ("Ingrese su email: ");
        if (validarEmail(eMail)){
            localStorage.setItem ("email", eMail);
        }
        else{
            alert ("Ingresó un mail inválido, vuelva a intentarlo por favor");
        }
    }while (!validarEmail(eMail))
}

function validarNombre(parametroNombre){
    return (parametroNombre!= "" && parametroNombre!= null);
}

function validarEmail(parametroEmail) {
    return (parametroEmail != "" && parametroEmail != null && parametroEmail.indexOf(".")!==-1 && parametroEmail.indexOf("@")!==-1);
}


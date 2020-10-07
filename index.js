//luis
/*
Necesitamos que el banner de la página principal se obtenga de un servidor 
de manera de el equipo de Marketing pueda cambiarlo on-demand.
URL: http://demo2420474.mockable.io/getHomeBanner (GET)
Formato del objeto a recibir:
`
{
 title: "",
 imgUrl: "",
 link: ""
}`
*/

const url="https://demo2420474.mockable.io/getHomeBanner";
fetch(url)                          //peticion a la URL
.then(function(response){           //se genera la promesa esperando al serv responda
    return response.json();         //se recibe la RTA y se tranforma ne JSON
})                                  //vamos a generar una 2da promesa para...
.then(function(imagenes){           //trabajar con los datos
    console.log(imagenes);
    renderImagenes(imagenes);
});


function renderImagenes(imagenes){
    let img     =document.querySelector("#banner");
    img.innerHTML=`<a href = "${imagenes.link}" ><img title = "${imagenes.title}" src = "${imagenes.imgUrl}"></a>`;
    };


/* ... */
/*Cuando el usuario acceda a la página de productos, debemos pedirle al servidor el listado de productos a mostrar en pantalla. Hay que mantener el estilo de sitio pero los datos deben pedirse al backend.

URL: https://demo2420474.mockable.io/productList (GET)

[{"title": "", "description": "", "imgUrl": "", "inStock": 99, "price": 9999, "currency": "", "discountPrice": 9999}]
 */
/*Una vez obtenido el listado del servidor, procesarlo y generar el listado en HTML con el estilo propio del sitio.

Agregar en HTML el campo price (Precio)
Agregar en HTML el campo inStock (Unidades)
Si llega el campo "discountPrice", mostrar el campo "price" tachado y poner el valor con descuento resaltado
El criterio estético queda a cargo del equipo respetando el estilo actual de la página.
 */
 

fetch(`${URL_}productList`).then(function (responsive) {
    return responsive.json();
}).then(function (productos) {
    renderProductos(productos)
});

function renderProductos(productos) {
    const container = document.querySelector('#container');
    let fragmentos = "<h1>Productos</h1>";
    productos.forEach(function (producto) {
        let fragmento = `<div class="bici flexbox">
                        <img class="flexbox-productos" src="${producto.imgUrl}">
                        <div class="flexbox-productos">
                            <h2>${producto.title}</h2>
                            <p>${producto.description}.</p>
                            <p>${producto.discountPrice ? `<span id="precio"><s> Precio: ${producto.price} ${producto.currency}</s></span><br><span id="descuento"><b> Precio de descuento: ${producto.discountPrice} ${producto.currency}</b>`  : `Precio: ${producto.price} ${producto.currency}`}<br>
                            Stock: ${producto.inStock}
                            </p>
                        </div>
                    </div>`;
        fragmentos += fragmento
    });
    container.innerHTML = fragmentos;
}



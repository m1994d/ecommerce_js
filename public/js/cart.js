function setCarritoVacio() {
  cartRows.innerHTML = `
    <tr>     
        <td colspan="5"><div class="alert alert-warning my-2 text-center">No tienes productos en el carrito</div></td>
    </tr>            
    `;
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
}

function calcularTotal(products) {
  return products.reduce(
    (acum, product) => (acum += product.price * product.quantity),
    0
  );
}


if (localStorage.carrito) {
  let carrito = JSON.parse(localStorage.carrito);
  console.log(carrito);
  carrito.forEach((item, index) => {
    fetch('/api/product/${item.id}')
      .then((res) => res.json())
      .then((product) => {
        console.log(product);
      });
  });
};
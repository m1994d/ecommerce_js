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

let cartRows = document.querySelector('.cartRows');

let products =[];

if (localStorage.carrito) {
  let carrito = JSON.parse(localStorage.carrito);
  console.log(carrito);
  carrito.forEach((item, index) => {
    fetch(`/api/product/${item.id}`)
      .then((res) => res.json())
      .then((product) => {
        if (product){
          
        cartRows.innerHTML += `
        <tr id="row${index}">
          <th scope="row">${index + 1}</th>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td class="text-center">${item.quantity}</td>
          <td class="text-center">$ ${parseFloat(product.price * item.quantity).toFixed(2)}</td>
          <td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})"><i class="fas fa-trash-alt"></i></button></td>
        </tr>
        `;
        products.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        });
        
        } else {
          /* Si no esta en el carrito, lo borro del localStorage */
          carrito.splice(index, 1)
          localStorage.setItem('carrito', JSON.stringify(carrito));
        }        
      }).then(() => {document.querySelector('.totalAmount').innerText = `$ ${calcularTotal(products)}.`;
    });
  });
}
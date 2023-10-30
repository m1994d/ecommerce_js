window.addEventListener("load", function () {
  /*  Animations initialization */
  new WOW().init();

  /* Toastr Initialization */
  toastr.options = {
    positionClass: "toast-bottom-right",
    fadeIn: 300,
    fadeOut: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
  };

  let botonesComprar = document.querySelectorAll(".agregar_carrito")

  botonesComprar.forEach((boton)=> {
    //escuchar el clic
    boton.addEventListener("click", (e) => {
      //console.log(e.target.dataset.id);    
      if (localStorage.carrito){
        let carrito = JSON.parse(localStorage.carrito);

        let index = carrito.findIndex((prod) => prod.id == e.target.dataset.id);
        if (index == -1) {
          carrito[index].quantity++;
        } else {
          carrito.push({id: e.target.dataset.id, quantity: 1});
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
      } else {
        localStorage.setItem("carrito",
        JSON.stringify([{ id: e.target.dataset.id,quantity: 1}])
        );
      }
    });
  });
});
/*var fnk;

/*function chargeItemHTML() {
  const fItem = document.getElementById('item__shop');
  let fsId = 1;
  
  isInt = parseInt(localStorage.getItem("funcoSelected").replace('funko_',''));
  if (Number.isInteger(isInt))
    fsId = isInt;

  fnk = cartJSON.find(item => item.id == fsId);
  if (clientCartJSON) {
    fnkInCart = JSON.parse(lSClientCart).find(item => item.id == fsId);
    if (fnkInCart) {
      fnk.price = fnkInCart.price,
      fnk.quantity = fnkInCart.quantity
    }
  } 
  */
  /*fItem.innerHTML = `<picture><img src="`+fnk.imageUrl[0].url+`" alt="baby 1"/></picture>
    <article class="item__content">
      <p class="item__licence">`+fnk.name+`</p>
      <H3 class="item_name">`+fnk.group+`</H3>
      <p class="item__description">`+fnk.description+`</p>
      <p class="item__price">$ `+fnk.price.toString().replace('.', ',')+`</p>
      <div class="item__action">
        <input type="text" class="action__input" name="quantity" id="quantity" placeholder="0" value="`+fnk.quantity+`">
        <div>
          <button class="btn_add" type="button"><img src="/img/icons/plus-icon.svg" alt=""></button>
          <button class="btn_sub" type="button"><img src="/img/icons/less-icon.svg" alt=""></button>
        </div>
        <span class="action__tag"><button class="action__btn" type="button">Agregar al Carrito</button></span>
      </div>
      <p class="item__promo"><a href="">Ver Metodos de pago</a>- 3 CUOTAS SIN INTERES</p>
    </article>`;
    
  document.querySelector(".btn_add").addEventListener("click", function () {
    const quantityItem = this.parentNode.parentNode.querySelector(
      'input[name="quantity"]'
    );
    let label = quantityItem.value;
    
    quantityItem.value = Number(label) + 1;
  });

  document.querySelector(".btn_sub").addEventListener("click", function () {
    const quantityItem = this.parentNode.parentNode.querySelector(
      'input[name="quantity"]'
    );
    let label = quantityItem.value;
    
    if (Number(label) > 1) {
      quantityItem.value = Number(label) - 1;
    }
  }); */
/*
  document.querySelector(".action__btn").addEventListener("click", function () {
    let fnkToAdd = {
      id: Number(fnk.id),
      name: fnk.name,
      group: fnk.group,
      description: fnk.description,
      imageUrl: fnk.imageUrl,
      price: parseFloat(document.querySelectorAll('.item__price')[0].textContent.replace('$ ', '')),
      quantity:  Number(document.querySelector('input[name="quantity"]').value) 
    };
    if (!clientCartJSON) {
      newClientCartJSON = []
      newClientCartJSON.push(fnkToAdd);
      localStorage.setItem("clientCart",JSON.stringify(newClientCartJSON));
    } else {
      let findItem = clientCartJSON.find(item => item.id == fsId);
      if (!findItem) {
        clientCartJSON.push(fnkToAdd);
      }else {
        findItem.quantity = fnkToAdd.quantity;
        findItem.price = fnkToAdd.price;
      }
      localStorage.setItem("clientCart",JSON.stringify(clientCartJSON));
    }
    window.history.back();
  });}
  document.addEventListener("DOMContentLoaded", chargeItemHTML);
  */

  //Reestructuracion porque ahora trabajamos con BD
const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');
const quantity = document.querySelector('#quantity');

add.addEventListener('click', () => quantity.value = Number(quantity.value) + 1);
subtract.addEventListener('click', () => {
  quantity.value = Number(quantity.value) === 0
    ? 0
    : Number(quantity.value) - 1
});
quantity.addEventListener('change', () => quantity.value = Number(quantity.value) < 0 ? 0 : Number(quantity.value));


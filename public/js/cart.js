function generateDetail() {
  var lSClientCart = localStorage.getItem("clientCart");

  if (lSClientCart != null && lSClientCart != "") {
    const cartJSON = JSON.parse(lSClientCart);
    const tbody = document.querySelector("table tbody");

    if (cartJSON && cartJSON.length > 0) {
      cartJSON.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.classList.add("cart-item");

        tr.innerHTML = `<td class="cart-item__datail">
                        <img src="${item.imageUrl[0].url}" alt="" class="item__img" />
                        <div class="item__info">
                          <div class="item__info-title">
                            <h2>${item.name}</h2>
                            <p>${item.group}</p>
                          </div>
                          <div>
                            <p class="item__unit_price">precio: $ ${item.price}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="cart-item__count">
                          <label>
                            <input id="quantity${index}" name="quantity" class="" value="${item.quantity}" min="1" />
                          </label>
                          <div class="item__count-actions">
                            <button id="add${index}" class="btn_add" type="button"><img src="../../img/icons/plus-icon.svg" alt=""></button>
                            <button id="subtract${index}" class="btn_sub" type="button"><img src="../../img/icons/less-icon.svg" alt=""></button>
                          </div>
                        </div>
                      </td>
                      <td class="item__price">$ ${item.price * item.quantity}</td>
                      <td class="item__action"><img src="../../img/icons/remove_icon.svg" alt="Remove"></td>`;

        tbody.appendChild(tr);
      });

      // Calcula el subtotal de la compra
      calculateSubTotalPrice();
    }
  }
}


function setFloatFormat(price, n) {
  return "$ " + price.toFixed(n).replace(".", ",");
}

function calculateTotalPrice(total) {
  const totalPrice = document.getElementById("total_price");
  let sendPrice = document.getElementById("send_price").textContent.replace("$ ", "").replace(",", ".");
  let cTotalPrice = parseFloat(sendPrice) + total;
  totalPrice.textContent = setFloatFormat(cTotalPrice, 2);
}

function calculateSubTotalPrice() {
  const subTotalPrice = document.getElementById("subTotal_price");
  let totals = document.querySelectorAll(".item__price");
  let total = 0;
  totals.forEach((subTotal) => {
    let price = subTotal.textContent.replace("$ ", "").replace(",", ".");
    total += parseFloat(price);
  });
  subTotalPrice.textContent = setFloatFormat(total, 2);
  calculateTotalPrice(total);
}

function calculateSubTotalItemPrice(quantityItem, priceItem, totalItem) {
  let unitPrice = parseFloat(priceItem.textContent.replace("precio: $ ", "").replace(",", "."));
  let quantity = parseFloat(quantityItem.value);
  let totalItemPrice = unitPrice * quantity;
  totalItem.textContent = setFloatFormat(totalItemPrice, 2);
  calculateSubTotalPrice();
}


function addSubBtnInteraction() {
  const btns = document.querySelectorAll(".btn_add, .btn_sub");

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const quantityItem = this.parentNode.parentNode.querySelector('input[name="quantity"]');
      let label = quantityItem.value;
      if (this.classList.contains("btn_add")) {
        quantityItem.value = Number(label) + 1;
      } else {
        if (Number(label) > 1) {
          quantityItem.value = Number(label) - 1;
        }
      }
      
      const priceItem = this.parentNode.parentNode.parentNode.parentNode.querySelector("p[class=item__unit_price]");
      const totalItem = this.parentNode.parentNode.parentNode.parentNode.querySelector(".item__price");
      calculateSubTotalItemPrice(quantityItem, priceItem, totalItem);
    });
  });
}

function charge() {
  generateDetail();
  addSubBtnInteraction();
}
document.addEventListener("DOMContentLoaded", charge);
var lSClientCart = localStorage.getItem("clientCart");
var clientCartJSON;

function calculateNClientCart() {
  //document.querySelector('.cart-count').remove();

  if (lSClientCart != null && lSClientCart != '') {
    let totalItems = 0;
    clientCartJSON = JSON.parse(lSClientCart);

    clientCartJSON.forEach(item => {
      totalItems += item.quantity;
    });

    if (totalItems > 0) {
      const countDiv = document.createElement("div");
      countDiv.classList.add("cart-count");
      countDiv.textContent = totalItems;
      document.querySelector(".navbar__cart").appendChild(countDiv);
    }
  } 
}
calculateNClientCart();
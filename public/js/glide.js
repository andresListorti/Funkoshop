var funkosShop = document.querySelectorAll('.card-item__link');

funkosShop.forEach((fnk) => {
  fnk.addEventListener("click", function () {
    localStorage.setItem("funcoSelected", fnk.id);
  })
});

new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 3,
    gap: 30,
    breakpoint: {
      991: {
        perView: 2
      },
      768: {
        perView: 1
      }
    }
  }).mount();

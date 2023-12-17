const modelsProduct = require ('../models/product.js')

const shopControllers = {
    View: async (req, res) => {
      const items = await modelsProduct.getAllItems();
      const products = await modelsProduct.getProduct();
      const { data } = items;
      res.render( './shop/shop',{
        view: {
          title: "Shop | Funkoshop",
          h2: "Ultimos lanzamientos",
        },
        items: data,
        products,
        logged: req.session.userid,
      });
    },
    

    itemView : async (req, res) => {
      const id = req.params.id;
      const [item] = await modelsProduct.getItem(id);
      const products = await modelsProduct.getProduct();
  
      res.render('./shop/item', {
        view: {
          title: "Item | Funkoshop"
        },
        item,
        products,
        logged: req.session.userid,
      });
    },

    addItemToCart: (req, res) => res.render('./shop/cart', {view: {title : "Add Item"}}),
    cartView: (req, res) => res.render('./shop/cart',{ view : {title : "Cart"}}),
    checkout: (req, res) => res.render('./shop/cart', {title : "Checkout"}),
  };

  module.exports = shopControllers;

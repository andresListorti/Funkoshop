const product = require('../models/product.js');
const modelsProduct = require ('../models/product.js')

const shopControllers = {
    View: async (req, res) => {
      const items = await modelsProduct.getAll();
      const { data } = items;
      res.render( './shop/shop',{
        view: {
          title: "Shop | Funkoshop"
        },
        items: data
      });
    },
    

    itemView: async(req, res) => { 
      const id = req.params.id;
      const item = await product.getOneItem({product_id: id});
      const { data } = item;

       if (!data[0]) {
          res.status(404).send('El producto con el ID seleccionado no existe o fue eliminado');
       }

       res.render('./shop/item', {
       view: {
         title: "Item | Funkoshop"
       },
       item: data[0],
    });
  },
    addItemToCart: (req, res) => res.render('./shop/cart', {view: {title : "Add Item"}}),
    cartView: (req, res) => res.render('./shop/cart',{ view : {title : "Cart"}}),
    checkout: (req, res) => res.send('Route for got to checkout page', {title : "Checkout"}),
  };

  module.exports = shopControllers;
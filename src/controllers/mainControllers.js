const modelsProduct = require ('../models/product.js')

const mainControllers = {
  home: async(req, res) => {
    const collections = await modelsProduct.getAllLicence();
    const products = await modelsProduct.getProduct();
    res.render('index', {
      view: {
        title: "Home | Funkoshop", 
        h2 : "Ultimos Lanzamientos",
        logged: req.session.userid
  });
      },
      collections,
      products,
     
    });
  },
  contact:(req, res) => { res.render('./contact' ,{view: {title : "Contacto",logged: req.session.userid}})},

  about:(req, res) =>  res.send('About View Route', {view: {title : "About"}}),
  faqs:(req, res)  => res.send('FAQs View Route', {view: {title : "Faqs"}}),
};

module.exports = mainControllers;

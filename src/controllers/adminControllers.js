const modelsProduct = require ('../models/product.js')


const adminControllers = {
    adminView: async (req, res) => {
      const {data}  = await modelsProduct.getAllItems();
      res.render( './admin/admin',
      {
        view: {
          title: 'List of Products | Admin Funkoshop',
          logged: req.session.userid
        },
        items: data
      });
    },

    createView:  async (req, res) =>{
      const categories  = await modelsProduct.getAllCategory();
      const licences  = await modelsProduct.getAllLicence();
  
      res.render('./admin/create', {
        view: {
          title: 'Create Product | Admin Funkoshop',
          logged: req.session.userid
        },
        categories,
        licences
      });
    },

    createItem: async (req, res) => {
      const item = req.body;
      const itemSchema = {
        product_name: item.name,
        product_description: item.description,
        price: item.price,
        stock: item.stock,
        discount: item.discount,
        sku: item.sku,
        dues: item.dues,
        image_front: /*'/'+ req.files[0].filename*/ '/proximamente1.jpg',
        image_back: /*'/'+ req.files[1].filename,*/ '/proximamente.jpg',
        licence_id: item.collection,
        category_id: item.category,
      }
      await modelsProduct.create(itemSchema);
      res.redirect('/admin');
    },

    editView:  async (req, res) => {
      const id = req.params.id;
      const categories = await modelsProduct.getAllCategory();
      const licences = await modelsProduct.getAllLicence();
      const [item] = await modelsProduct.getItem(id);
      //console.log(categories, licences);
      res.render('./admin/edit', {
        view: {
          title: `Edit Product #${id} | Admin Funkoshop`,
          logged: req.session.userid,
        },
        item: item,
        categories,
        licences,
      });
    },

    editItem: async (req, res) => {
      const id = req.params.id;
      const item = req.body;
      const file = req.file
      if(!file){
        const itemSchema = {
          product_name: item.name,
          product_description: item.description,
          price: item.price,
          stock: item.stock,
          discount: item.discount,
          dues: item.dues,
          licence_id: item.collection,
          category_id: item.category,
      }
      const resultado = await modelsProduct.edit(itemSchema,id);
    }
      else{
        const itemSchema = {
          product_name: item.name,
          product_description: item.description,
          price: item.price,
          stock: item.stock,
          discount: item.discount,
          dues: item.dues,
          image_front: '/'+req.files[0].filename,
          image_back: '/'+req.files[1].filename,
          licence_id: item.collection,
          category_id: item.category
      }
      const resultado = await modelsProduct.edit(itemSchema,id);}
     
      res.redirect('/admin');
    },

    deleteItem: async (req, res) => {
      const id = req.params.id;
      await modelsProduct.deleteOne({product_id: id});
      res.redirect('/admin');
    },
  };

  module.exports = adminControllers;

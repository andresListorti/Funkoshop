const modelsProduct = require ('../models/product.js')


const adminControllers = {
    adminView: async (req, res) => {
      const {data}  = await modelsProduct.getAll();
      res.render( './admin/admin',
      {
        view: {
          title: 'List of Products | Admin Funkoshop'
        },
        items: data
      });
    },

    createView:  async (req, res) =>{
      const { data: categories } = await modelsProduct.getAllCategory();
      const { data: licences } = await modelsProduct.getAllLicence();
  
      res.render('./admin/create', {
        view: {
          title: 'Create Product | Admin Funkoshop'
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
      const { data: categories } = await modelsProduct.getAllCategory();
      const { data: licences } = await modelsProduct.getAllLicence();
      const { data } = await modelsProduct.getOneItem({product_id: id})
      //console.log(categories, licences);
      res.render('./admin/edit', {
        view: {
          title: `Edit Product #${id} | Admin Funkoshop`
        },
        item: data[0],
        categories,
        licences
      });
    },

    editItem: async (req, res) => {
      const id = req.params.id;
      const item = req.body;
      const itemSchema = {
        product_name: item.name,
        product_description: item.description,
        price: item.price,
        stock: item.stock,
        discount: item.discount,
        dues: item.dues,
        image_front: '/imagen_front',
        image_back: '/imagen_back',
        licence_id: item.licence,
        category_id: item.category
      }
  
      await modelsProduct.edit(itemSchema,id);
      res.redirect('/admin');
    },

    deleteItem: async (req, res) => {
      const id = req.params.id;
      await modelsProduct.deleteOne({product_id: id});
      res.redirect('/admin');
    },
  };

  module.exports = adminControllers;
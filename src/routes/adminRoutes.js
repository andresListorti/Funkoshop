const express = require('express');
//utilizo multer para manejar subida de archivos
const path = require('path');
const multer = require('multer');
const router = express.Router();
const adminControllers = require ('../controllers/adminControllers');


//storage guarda configuracion de multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../public/img')),
	filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname)
})//crea instancia multer y asigna configuracion creada
const uploadFile = multer({storage})


router.get('/', adminControllers.adminView);
router.get('/create', adminControllers.createView);
router.post('/create',/*uploadFile.array('images', 2),*/adminControllers.createItem);
router.get('/edit/:id', adminControllers.editView);
router.put('/edit/:id',adminControllers.editItem);
router.delete('/delete/:id', adminControllers.deleteItem);



module.exports = router;
const express = require('express');
const router = express.Router();
const mainControllers = require ('../controllers/mainControllers');
const {body} = require('express-validator');
const validacion = require ('./middlewares/validacion.js');

const validarDatos = [
    body('nombre')
    .notEmpty().withMessage('El campo de nombre no puede estar vacío')
    .isLength({ min: 6}).withMessage('Ingrese un nombre valido (minimo 6 caracteres'),
     body('email')
     .isEmail().withMessage('Debe ingresar un correo válido'),
    body('mensaje')
     .notEmpty().withMessage('El campo de nombre no puede estar vacío')
     .isLength({ min : 10}).withMessage('Ingrese un mensaje valido'),
     
  ];

router.get('/', mainControllers.home);
router.get('/contact',mainControllers.contact);
router.post('/contact',validarDatos,validacion,mainControllers.contactPost);
router.get('/about', mainControllers.about);
router.get('/faqs', mainControllers.faqs);

module.exports = router;

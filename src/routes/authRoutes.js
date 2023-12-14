const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authControllers = require ('../controllers/authControllers.js');
const validacion = require ('./middlewares/validacion.js');
const {conn} = require ('../config/conn.js');

const loginValidation = [
    body('email')
    .isEmail()
    .withMessage('Debe ingresar un correo válido'),
    body('pass')
     .isLength({ min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres y contener letras y números.')
     .isAlphanumeric().withMessage('Ingrese una contraseña valida')
    
  ];

  const registerValidation = [
    body("email")
	.isEmail().withMessage('Debe ingresar un correo válido')
  	.bail() //corta la ejecucion porque si ya hay error no conecto con bd
	  .custom((value, {req}) => {
			return new Promise(async (resolve, reject) => {
				try {
					const [usuarioExiste] = await conn.query(`SELECT * FROM user WHERE email = '${value}'`)
					if(!usuarioExiste){
						return reject()
					} else {
						return resolve()
					}
				} catch (error) {
					console.log(error)
				}
			})
		})
	  .withMessage("Email ya registrado, por favor ingrese otra direccion"),
	   body('pass')
     .isLength({ min: 6}).withMessage('Ingrese al menos 6 caracteres')
     .isAlphanumeric().withMessage('Ingrese una contraseña valida')
	  .custom((value, {req}) => value === req.body.pass2)
	  .withMessage('Las contraseñas no coinciden')
	]
  

//Auth Routes
router.get('/login', authControllers.loginView);
router.post('/login', loginValidation, validacion ,authControllers.loginUser);
router.get('/register',authControllers.registerView);
router.post('/register',registerValidation, validacion,authControllers.registerUser);
router.get('/logout',authControllers.logoutView);


module.exports = router;
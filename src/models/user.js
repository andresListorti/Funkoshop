const { conn } = require('../config/conn');


const UsersAll = async () => {
	try {
	  const [rows] = await conn.query('SELECT * FROM user;');
	  const response = {
		isError: false,
		data: rows
	  };
  
	  return response;
	} catch (e) {
	  const error = {
		isError: true,
		message: `No pudimos recuperar los datos ${e}.`
	  };
  
	  return error;
	} finally {
	  await conn.releaseConnection();
	}
  }


const verificarUser = async (email, password) => {
	try {
		const [verificado] = await conn.query(`SELECT * FROM user WHERE email = '${email}' AND password = '${password}';`)
		return verificado
	} catch (error) {
		throw error
	} finally {
		conn.releaseConnection()
	}
}

const crearUser = async (userSchema) => {
	try{
        const [creado] = await conn.query ('INSERT INTO user SET ?;', userSchema)
	    return creado
	} catch(error){
		console.log(error)
	}finally{
		conn.releaseConnection()
	}
}

module.exports = { 
	verificarUser,
	crearUser,
	UsersAll,
}

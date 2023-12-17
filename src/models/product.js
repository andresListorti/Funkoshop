const { conn } = require('../config/conn');

const getProduct = async () => {
  try {
    const [rows] = await conn.query('SELECT * FROM product;')
      return rows
  	} catch (error) {
	  	throw error
	  } finally {
		conn.releaseConnection();
	}
}

const getAllItems = async () => {
  try {
    const [rows] = await conn.query('SELECT product.*, category.category_name, licence.licence_name FROM (product LEFT JOIN category ON product.category_id = category.category_id) LEFT JOIN licence ON product.licence_id = licence.licence_id;');
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



const getItem = async(id) => {
  try {
    const [rows] = await conn.query(`SELECT * FROM product INNER JOIN licence ON product.licence_id= licence.licence_id where product_id='${id}'`);
    return rows
  }catch (error) {
		throw error
	} finally {
		conn.releaseConnection()
    }
}



const create = async (params) => {
  try {
      const [rows] = await conn.query('INSERT INTO product SET ? ;', params)
      return rows
  } catch (error) {
      throw error
  } finally {
      conn.releaseConnection()
  }
}

const edit = async (params, id) => {
  try {
	const [rows] = await conn.query('UPDATE product SET ? WHERE ?;', [params, {product_id: id}]);
	const response = {
		isError: false,
		message: `El item fue modificado exitosamente.`,
	  };
  		return response;
	} catch (e) {
	  const error = {
		isError: true,
		message: `No pudimos modificar el item seleccionado, error: ${e}`
	  };
  
	  return error;
	} finally {
	  await conn.releaseConnection();
	}
  };
const deleteOne = async (params) => {
  try {
    const [rows] = await conn.query('DELETE FROM product WHERE ?;', params);
    const response = {
      isError: false,
      data: rows,
      message: `Item borrado exitosamente.`
    };

    return response;
  } catch (e) {
    const error = {
      isError: true,
      message: `No pudimos insertar los valores seleccionados por: ${e}`
    };

    return error;
  } finally {
    await conn.releaseConnection();
  }
}

//traigo todas las licencias para usar en controller admin
const getAllLicence = async() => {
  try {
      const [rows] = await conn.query('SELECT * FROM licence;');
       return rows
  } catch (error) {
  throw error
} finally {
  conn.releaseConnection()
  }
}


//traigo todas las categorias para usar en controller admin
const getAllCategory= async() => {
  try {
      const [rows] = await conn.query('SELECT * FROM category;');
       return rows
  } catch (error) {
  throw error
} finally {
  conn.releaseConnection()
  }
}

module.exports = {
  getAllItems,
  getItem,
  create,
  edit,
  deleteOne,
  getAllLicence,
  getAllCategory,
  getProduct,
};

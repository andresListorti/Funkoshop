const mysql = require('mysql2');
require('dotenv').config();

/*
 * Creamos un pool de conexiones (para que puedan hacerse 10 conexiones simultaneas en este caso)
 */

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0, //la cantidad de usuarios que pueden esperar: infinito en este caso
});

/**
 * Testeamos que la conexión sea exitosa
 */

pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error al obtener una conexión:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
    connection.release();
  }
});

 // genero la promesa de que voy a dar 1 de las 10 conexiones
module.exports = {
  conn: pool.promise()
};
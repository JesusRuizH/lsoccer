/*
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        port : 3306,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB,
    }
});*/

import { pool } from '../config/db'


const databaseServiceFactory = () => {
    //const TABLE = 'usuario';

    const getUser = async (username) => {
        const user = await pool.query('SELECT * FROM usuario WHERE usuario = ?', username)
        //const user = await knex(TABLE).select().where('usuario', username);
        if (user.length === 0) {
            throw new Error("User not found");
        } 
        //console.log(user[0])
        return user[0][0];
    };

    const createUser = async (username, hashedPassword) => {
        //console.log("hash", hashedPassword)
        await knex('usuario').insert({usuario: `${username}`,pw: `${hashedPassword}`});
    };

    return {getUser, createUser};
};

module.exports = {
    databaseServiceFactory
};
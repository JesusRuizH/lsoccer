import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getLogin(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveLogin(req,res)
    }
    
}

//funciones
const getLogin = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM login')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveLogin = async (req, res)=>{
    try {
        const {usuario , pw, correo, estado,} = req.body
        const [result] = await pool.query('INSERT INTO login SET ?', {usuario , pw, correo, estado})
        return res.status(200).json({usuario , pw, correo , estado, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


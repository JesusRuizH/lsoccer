import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getLiga(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveLiga(req,res)
    }
    
}

//funciones
const getLiga = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM liga')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveLiga = async (req, res)=>{
    try {
        const {nombre_liga, fecha_categoria_ini, fecha_categoria_fin,} = req.body

        const [result] = await pool.query('INSERT INTO liga SET ?', {nombre_liga, fecha_categoria_ini, fecha_categoria_fin})
        return res.status(200).json({nombre_liga, fecha_categoria_ini, fecha_categoria_fin, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


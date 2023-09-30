import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getUsuario(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveUsuario(req,res)
    }
    
}

//funciones
const getUsuario = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuario')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveUsuario = async (req, res)=>{
    try {
        const {nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, FK_contacto_emergencia, FK_tipo_cuenta, usuario , pw, correo, estado,} = req.body
        const [result] = await pool.query('INSERT INTO usuario SET ?', {nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, FK_contacto_emergencia, FK_tipo_cuenta, usuario , pw, correo, estado})
        return res.status(200).json({nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, FK_contacto_emergencia, FK_tipo_cuenta, usuario , pw, correo, estado, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


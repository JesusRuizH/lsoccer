import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getUsuario(req, res)
        case 'DELETE':
            return await deleteUsuario(req, res)
        case 'PUT':
            return await updateUsuario(req, res)
        default:
            break;
    }
    
}

const getUsuario = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT * FROM usuario WHERE PK_usuario = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteUsuario = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from usuario where PK_usuario = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateUsuario = async (req, res) => {
    const {id} = req.query
    const {nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, FK_contacto_emergencia, FK_tipo_cuenta, usuario , pw, correo, estado} = req.body
    try {
        await pool.query('UPDATE usuario SET nombre_usuario = ? , apellidos_usuario = ? , fecha_naci_usuario = ? , celular_usuario = ? ,  FK_contacto_emergencia = ? , FK_tipo_cuenta = ? , usuario = ? , pw = ? , correo = ? , estado = ?  WHERE PK_usuario = ? ' , [nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, FK_contacto_emergencia, FK_tipo_cuenta, usuario , pw, correo, estado, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}
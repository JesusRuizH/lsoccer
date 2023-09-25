import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getLogin(req, res)
        case 'DELETE':
            return await deleteLogin(req, res)
        case 'PUT':
            return await updateLogin(req, res)
        default:
            break;
    }
    
}

const getLogin = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT * FROM login WHERE PK_login = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteLogin = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from login where PK_login = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateLogin = async (req, res) => {
    const {id} = req.query
    const {usuario , pw, correo, estado,} = req.body
    try {
        await pool.query('UPDATE login SET usuario = ? , pw = ? , correo = ? , WHERE estado = ? ,  WHERE PK_login = ?' , [usuario, pw, correo, estado, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}
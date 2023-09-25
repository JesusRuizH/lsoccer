import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function LoginForm() {

    const [log, setLogin] = useState({
        usuario: "",pw: "", correo: "", estado: 0,
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/login/' + router.query.id, log)
                toast.success('login Editado Correctamente')
            }else {
                await axios.post('/api/login', log)
                toast.success('login Creado Correctamente')
            }
            router.push('/login')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setLogin ({...log, [name]: value})

    useEffect(() => {

        const getLogin = async () => {
            const {data} = await axios.get('/api/login/' + router.query.id)
            setLogin(data)
        }

        if (router.query.id){
            getLogin(router.query.id)
        }
    }, [])
    

    return (
        <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-10  pt-6 pb-8 mb-2"
        >
          
          <div className="mb-4">
          <label
            htmlFor="usuario"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Usuario:
          </label>
          <input
            type="text"
            name="usuario"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={log.usuario}
          />
          </div>


          <div className="mb-4">
          <label
            htmlFor="pw"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="text"
            name="pw"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={log.pw}
          />
          </div>

          
          <div className="mb-4">
          <label
            htmlFor="correo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Correo:
          </label>
          <input
            type="text"
            name="correo"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={log.correo}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar Login" : "Crear Login"}
          </button>
        </form>
      </div>
    );
}


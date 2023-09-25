//import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function LoginPage({ log }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/login/' + id)
        router.push('/login')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <div>
      <h1>{log.usuario}</h1> 
      <h1>{log.pw}</h1> 
      <h1>{log.correo}</h1> 
      <h1>{log.estado}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(log.PK_login)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/login/edit/"+log.PK_login)}
      >
        Editar
      </button>

    </div>
  );
}

export const getServerSideProps = async (context) => {

    const {data: log} = await axios.get('http://localhost:3000/api/login/' + context.query.id)
    return {
        props: {
            log,
        },
    };
};

export default LoginPage; 
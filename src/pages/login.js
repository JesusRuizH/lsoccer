import axios from "axios";
//import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { LoginCard } from "../../components/loginCard";

function FirstPage({login}) {

  const router = useRouter()

  const renderLogin = () => {

    if(login.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay ningun usuario</h1>
    return login.map((log) => (
      <LoginCard log={log} key={log.PK_login} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderLogin()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newLogin")}
        >Nuevo usuario</button>
      </div>

    </div>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: login} = await axios.get(
    "http://localhost:3000/api/login"
    );
  
  return {
    props: {
        login,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;
import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { ContactoCard } from "../../components/contactoCard";

function FirstPage({contacto}) {

  const router = useRouter()

  const renderContactos = () => {

    if(contacto.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay contactos aún</h1>
    return contacto.map((conta) => (
      <ContactoCard conta={conta} key={conta.PK_contacto_emergencia} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderContactos()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newContacto")}
        >Nuevo contacto</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: contacto} = await axios.get(
    "http://localhost:3000/api/contacto"
    );
  
  return {
    props: {
        contacto,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;
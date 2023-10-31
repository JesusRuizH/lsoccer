import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";

export default function Home({user}) {
    return (
        <>
        <Navegador user={user}/>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Crear Contacto</p>
        <iframe class="w-full aspect-[5/1] " src="http://localhost:3000/contacto"></iframe>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Crear Usuario</p>
        <iframe class="w-full aspect-[4/3]" src="http://localhost:3000/usuario"></iframe>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Crear Alumno</p>
        <iframe class="w-full aspect-[5/2]" src="http://localhost:3000/alumno"></iframe>
        </>
    )
    
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    const user = req.session.get("user");
    if (user === undefined) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    return {
      props: { 
               user: req.session.get("user"),     
        },
               
    };
  });
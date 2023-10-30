import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";

export default function Home({user}) {
    return (
        <>
        <Navegador user={user}/>
        <iframe class="w-full aspect-[5/1] " src="http://localhost:3000/contacto"></iframe>
        <iframe class="w-full aspect-[4/3]" src="http://localhost:3000/usuario"></iframe>
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
import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";
import axios from "axios";

export default function Home({user, alumno}) {
    const misPagos = () =>{
        let i = 0;
        while(i < alumno.length)
        {
            if(alumno[i].KEY_cuenta_pago === user.KEY_cuenta_pago){
                return(
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 pt-3">
                    <div key={alumno[i].FK_usuario} 
                        className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg ">       
                        <div className="flex flex-col justify-start p-6"> 
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Nº Reg: {alumno[i].FK_usuario} <br />
                                Numero de cuenta alumno: {alumno[i].KEY_cuenta_pago} <br />
                            </div>
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Nombre Completo del Alumno: {alumno[i].nombre_usuario} {alumno[i].apellidos_usuario}<br />
                                Categoria: {alumno[i].FK_categoria}
                            </div>
                            <div className="mb-5 text-base text-neutral-600 dark:text-black">
                                <p>Pago mensual: {alumno[i].pago_mensual} </p> 
                                <p>Pago de liga : {alumno[i].pago_liga} </p>  
                            </div>

                            </div>
                        </div>
                    </dl>
                )
            }
            i++;
        }
    }

    return (
        <>
        <Navegador user={user}/>
        <div>
            {misPagos()}
        </div>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Crear Nota</p>
        <iframe class="w-full aspect-[4/2]" src="http://localhost:3000/recibo"></iframe>
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
    const {data: alumno} = await axios.get(
        "http://localhost:3000/api/alumnos_pagos"
        );

    return {
      props: { alumno,
               user: req.session.get("user"),     
        },
               
    };
  });
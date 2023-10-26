import Head from 'next/head'
import axios from "axios";
import withSession from "../../lib/session";

import {NavegadorAlumno} from "../../components/navegadorAlu";


export default function Home({ user , eventos}) {

  if(user.FK_tipo_cuenta === 1){
    return(
      <Alumno
       usuario = {user} eve ={eventos}/>
    )
  }else if(user.FK_tipo_cuenta === 2){
    return(
      <Director
       usuario = {user}/>
    )
  }else if(user.FK_tipo_cuenta === 3){
    return(
      <Administrador
       usuario = {user}/>
    )
  }else if(user.FK_tipo_cuenta === 4){
    return(
      <Profesor
       usuario = {user}/>
    )
  }
}


function MainDashboard({event, user}) {
  let arrEvents = [];
  function getEvents(){
    let i = 0;
    while(i < event.length){
      if(event[i].FK_categoria === user.FK_categoria){
        arrEvents.push(event[i]);
      }
      i++;
    }
  }
  getEvents();

  return (
    <div className=" rounded-sm bg-white py-24 sm:py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl ">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-1 lg:gap-y-16 ">
            {
            arrEvents.map((feature) => (
                  
                  <div key={feature.PK_eventos} 
                  className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg">       
                    <div className="flex flex-col justify-start p-6"> 
                      <h5
                      className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                      Profesor
                      </h5>
                      <div className="mb-5 text-base text-neutral-600 dark:text-black">
                        <p>Fecha del evento: {feature.fecha_evento} </p> 
                        <p>Ubicacion del evento : {feature.ubicacion_evento} </p>  
                      </div>
                      <p className="text-neutral-500 dark:text-black">
                      {feature.descripcion_evento}
                      </p>
                    </div>
                  </div>            
            ))
            }
          </dl>
        </div>
      </div>
    </div>
  )
}


function Alumno({usuario, eve}){
  return (
  
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <NavegadorAlumno user={usuario}/>

      <MainDashboard event={eve} user={usuario}/>
    </div>
  )
}

function Administrador({usuario}){
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <h2>Welcome to the home page {usuario.nombre_usuario} {usuario.apellidos_usuario}!</h2>

      <h2> Llave primaria {usuario.PK_usuario} </h2>
      <h2> Numero de seguridad social {usuario.NSS_admin} </h2>

      <a href='/api/logout'>Logout</a>
    </div>
  )
}

function Profesor({usuario}){
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <h2>Welcome to the home page {usuario.nombre_usuario} {usuario.apellidos_usuario}!</h2>

      <h2> Llave primaria {usuario.PK_usuario} </h2>
      <h2> Categorias asignadas {usuario.FK_cate_asignadas} </h2>

      <a href='/api/logout'>Logout</a>
    </div>
  )
}

function Director({usuario}){
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <h2>Welcome to the home page {usuario.nombre_usuario} {usuario.apellidos_usuario}!</h2>

      <h2> Llave primaria {usuario.PK_usuario} </h2>
      <h2> Numero de seguridad social {usuario.NSS_dire} </h2>

      <a href='/api/logout'>Logout</a>
    </div>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  const {data: eventos} = await axios.get(
    "http://localhost:3000/api/eventos"
  );

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  //console.log(eventos)

  return {
    props: { eventos, 
             user: req.session.get("user"),       
      },
             
  };
});

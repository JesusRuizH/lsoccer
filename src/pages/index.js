import React from 'react'
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import {useRouter} from 'next/router'

//import {ProviderForm} from '../../components/ProviderForm' 

/* INICIA TAB PARA SELECCIONAR COMIDA */

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente


/* TERMINA TAB PARA SELECCIONAR COMIDA */

function PageOne() {
  return (
    <>
    <div className='container-fluid tabs-pages'>
       <div className='seven'>
              <h1>Ventas</h1>
        </div>  
        
    </div>  
       
    </>
  );
}

function PageTwo() {
  return (
    <>
      <div className='container-fluid tabs-pages'>
          <div className='seven'>
              <h1>Tickets</h1>
          </div>   
             
      </div>    
    </>
  );
}

function PageThree() {
  return (
    <>
      <div className='container-fluid tabs-pages'>
       <div className='seven'>
            <h1>Alimentos</h1>
        </div>  
        
      </div>     
    </>
  );
}

function PageFourth() {
  return (
    <>
      <div className='container-fluid tabs-pages'>
        <div className='container-fluid tabs-pages'>
          <div className='seven'>
              <h1>Proveedor</h1>
          </div>  
          <div>
            
          </div> 
          
        </div>  

        <div className='container-fluid tabs-pages'>
          <div className='five'>
            <h1> Productos<br></br> <span>Proveedor</span> </h1>
          </div>  
         
        </div>  

        <div className='container-fluid tabs-pages'>
          <div className='five'>
            <h1> Factura<br></br> <span>Proveedor</span> </h1>
          </div>  
         
        </div> 

        <div className='container-fluid tabs-pages'>
          <div className='five'>
            <h1> Almacen de materia prima <br></br> <span>Proveedor</span> </h1>
          </div>  
         
        </div> 

      </div>    
    </>
  );
}

function JustifiedExample() {
  return (
    <div className='container-fluid' id="backgroundNav">
    <Tabs
      defaultActiveKey="vender"
      className="nav nav-pills"
      justify
    >
      <Tab tabClassName="botonUno active" eventKey="vender" title="" defaultActiveKey="1">
        <PageOne className="active"/>
      </Tab>
      <Tab tabClassName="botonDos" eventKey="a" title="">
        <PageTwo />
      </Tab>
      <Tab tabClassName="botonTres" eventKey="b" title="">
        <PageThree />
      </Tab>
      <Tab tabClassName="botonCuatro active" eventKey="c" title="">
        <PageFourth />
      </Tab>
    </Tabs>
    </div>
  );
}

function MainContainer() {
  const router = useRouter()

const handleFood = async(e) => {
 // e.preventDefault();
  //const res = await axios.post('/alimentos', product)
  //console.log(res)
  router.push('/alimentos')
};
  return (
    <>
    <Container id = "mainContainer" className='container-sm'>
      <ul class="nav justify-content-end">
         <li id="logo-pos" class="nav-item">
           
         </li>
         <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
         </li>
         <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
         </li>
         <li className="nav-item">
           
         </li>
       </ul>
      <JustifiedExample />
        
    </Container>

    </>
  );
}

function homePage() {
  return (
    <>
    <MainContainer />
   </>
  )
}

export default homePage

/**
 * <div id='mainRow' className="nav nav-tabs" role="tablist">
         <div className="col">
            <button id="sellFood" type="button" className="nav-item btn btn-outline-light fullButton" data-bs-toggle="tab" href="#home"></button>
         </div>
         <div className="col">
         <button id="inventory" type="button" className="nav-item btn btn-outline-light fullButton" data-bs-toggle="tab" href="#home"></button>
         </div>
         <div className="col">
         <button id="food" type="button" className="nav-item btn btn-outline-light fullButton" onClick={() => handleFood()} data-bs-toggle="tab" href="#home"></button>
         </div>
         <div className="col">
         <button id="supplier" type="button" className="nav-item btn btn-outline-light fullButton"></button>
         </div>

          

        </div> 
 */
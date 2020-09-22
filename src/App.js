import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
  
  // LocalStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  // ** States **
  // Arreglo de citas
  const [ citas, setCitas ] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales] );

  //**********************************************************************************

  // ** Funciones ** 
  // Función que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    console.log(cita);
    setCitas([ ...citas, cita])
  };

  // Función elimina cita por ID
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id); 
    setCitas(nuevasCitas);
  }

  // Título de citas
  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus citas';

  return (
    <Fragment>
       <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={ crearCita }
              />
          </div>
          <div className="one-half column">
             <h2>{ titulo }</h2>
            { citas.map( cita => (
              <Cita 
                key={ cita.id }
                cita={ cita }
                eliminarCita={ eliminarCita }
              />
            )) }
          </div>
        </div>
      </div>
    </Fragment>
  );
}




export default App;

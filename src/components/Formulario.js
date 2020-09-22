import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';


const Formulario = ({ crearCita }) => {

    // States 
    const [ cita, setCita ] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [ error, setError ] = useState(false)

    // Funciones de eventos (handle)
    // Esta función actualiza los valores cuando el usuario escribe en el input
    const handleState = (event) => {
        setCita({
            ...cita,
            [event.target.name]: event.target.value
        })
    }

    // Extraer valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Envio de formulario
    const handleForm = (event) => {
        event.preventDefault();
        
        // Validación del formulario
        if( mascota.trim() === '' || propietario.trim === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            setError(true);
            return;
        }
        // Eliminar el mensaje de error previo
        setError(false);
        
        // Asignar un ID
        cita.id = uuidv4();
    
        // Crear la cita
        crearCita(cita);

        // Reiniciar el Form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }
    
    // Fragment del componente
    return (
        <Fragment>
            <h2>Crear Cita </h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }

            <form onSubmit={ handleForm }>
                {/* Campo #1 - Mascota */}
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={ handleState }
                    value={ mascota }
                    />
                {/* Campo #2 - Propietario */}
                <label>Nombre del propietario</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={ handleState }
                    value={ propietario }
                />
                {/* Campo #3 - Fecha */}
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={ handleState }
                    value={ fecha }
                />
                {/* Campo #4 - Hora*/}
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={ handleState }
                    value={ hora }
                />
                {/* Campo #5 - Síntomas */}
                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={ handleState }
                    value={ sintomas }
                />
                {/* Botón - Submit */}
                <button
                    type="submit"
                    className="u-full-width button-primary">
                    Agregar Cita
                </button>
            </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function AddSenador(props){

    const [name, setName] = useState('')
    const [last_name, setLast_name] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        if (name === '' || last_name === ''){
            setError(true)
        }else{
            axios.post('/senador/new', {name, last_name})
            .then(res => props.history.push('/view/senadores'))
        }
    }

    return(
        <>
            <h4>Crear nuevo Senador</h4>
            <form className="formulario">
                <div className="form-group">
                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control input-form" placeholder="Introducir aqui..."/>
                    <small className="form-text text-muted">Nombre del Senador</small>
                </div>
                <div className="form-group">
                    <input onChange={(e) => setLast_name(e.target.value)} type="text" className="form-control input-form" placeholder="Introducir aqui..."/>
                    <small className="form-text text-muted">Apellidos del Senador</small>
                </div>
                {
                    error
                    ?
                    <p>Error al completar los campos</p>
                    :
                    <p></p>
                }
                <button onClick={handleSubmit} className="btn btn-success">Añadir</button>
                <button className="btn btn-danger m-2"><Link className="text-white text-decoration-none"  to="/view/senadores">Atrás</Link></button>
            </form>
        </>
    )
}
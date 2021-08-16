import React, {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa'
import axios from 'axios';

export default function ViewSenadores(){

    const [senadores, setSenadores] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        axios.get('/senadores')
        .then(res => setSenadores(res.data))
    }, [reload])

    const removeSenador = (e, id) => {
        e.preventDefault()
        axios.delete('/senador/del/'+id)
        .then(res => setReload(!reload))
    }

    const senadoresList = senadores.map(senador => {
        return(
            <tr key={senador.id}>
                <td className="align-middle">{senador.name}</td>
                <td className="align-middle">{senador.last_name}</td>
                <td className="align-middle"></td>
                <td className="text-center"><button onClick={(e) => removeSenador(e, senador.id)} className="btn" ><FaIcons.FaTrashAlt/></button></td>
            </tr>
        )
    })

    return(
        <div className="container w-50">
            <h4>Lista de los Senadores</h4>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col" className="font-weight-bold">Nombre</th>
                        <th scope="col" className="font-weight-bold">Apellidos</th>
                        <th scope="col" className="text-center font-weight-bold">Ver</th>
                        <th scope="col" className="text-center font-weight-bold">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {senadoresList}
                </tbody>
            </table>
            {/* <button className="btn btn-primary" ><Link to="/new" className="text-white text-decoration-none">Añadir Senador</Link></button> */}
        </div>
    );
}
import React, {useState, useEffect} from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import {Link} from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'

export default function ViewComisiones(){
    const [comisiones, setComisiones] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        axios.get(API_URL+'/comisiones')
        .then(res => {
            setComisiones(res.data)
        })
    }, [reload])

    const removeComision = (e, id) => {
        e.preventDefault()
        axios.delete(`/comision/del/${id}`)
        .then(res => setReload(!reload))
    }

    const comisionesList = comisiones.map(comision => {
        const date = comision.evento__startTime.split('-')
        const year = date[0]
        const month = date[1]
        const day = date[2].split('T')[0]
        return(
            <tr key={comision.id}>
                <td className="align-middle">{comision.evento__subject}</td>
                <td className="align-middle">{day}/{month}/{year}</td>
                <td className="align-middle">{comision.senador__name} {comision.senador__last_name}</td>
                <td className="align-middle text-center"><Link to={'/comision/'+comision.id}><AiIcons.AiFillEye/></Link></td>
                <td className="align-middle text-center"><button onClick={(e) => removeComision(e, comision.id)} className="btn" ><FaIcons.FaTrashAlt/></button></td>
            </tr>
        )
        
    })

    return(
        <>
            <div className="container w-75 mt-5">
                <h4>Lista de las Comisiones</h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="font-weight-bold">Comision</th>
                            <th scope="col" className="font-weight-bold">Fecha</th>
                            <th scope="col" className="font-weight-bold">Senador</th>
                            <th scope="col" className="text-center font-weight-bold">Ver</th>
                            <th scope="col" className="text-center font-weight-bold">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comisionesList}
                    </tbody>
                </table>
                {/* <button className="btn btn-primary" ><Link to="/new" className="text-white text-decoration-none">Añadir Senador</Link></button> */}
            </div>
        </>
    )

}
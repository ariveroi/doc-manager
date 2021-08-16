import React, { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ViewPlenos() {
  const [plenos, setPlenos] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get("/get/plenos").then((res) => {
      setPlenos(res.data);
    });
  }, [reload]);

  const removePleno = (e, id) => {
    e.preventDefault();
    axios.delete(`/event/del/${id}`).then((res) => setReload(!reload));
  };

  const plenosList = plenos.map((pleno) => {
    const date = pleno.evento__startTime.split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2].split("T")[0];
    return (
      <tr key={pleno.id}>
        <td className="align-middle">{pleno.evento__subject}</td>
        <td className="align-middle">
          {day}/{month}/{year}
        </td>
        <td className="align-middle text-center">
          <Link to={"/pleno/" + pleno.id}>
            <AiIcons.AiFillEye />
          </Link>
        </td>
        <td className="align-middle text-center">
          <button
            onClick={(e) => removePleno(e, pleno.evento__id)}
            className="btn"
          >
            <FaIcons.FaTrashAlt />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="container w-75 mt-5">
        <h4>Lista de los Plenos</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" className="font-weight-bold">
                Pleno
              </th>
              <th scope="col" className="font-weight-bold">
                Fecha
              </th>
              <th scope="col" className="text-center font-weight-bold">
                Ver
              </th>
              <th scope="col" className="text-center font-weight-bold">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>{plenosList}</tbody>
        </table>
        {/* <button className="btn btn-primary" ><Link to="/new" className="text-white text-decoration-none">Añadir Senador</Link></button> */}
      </div>
    </>
  );
}

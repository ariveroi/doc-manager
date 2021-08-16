import React, { useState, useEffect } from "react";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import axios from "axios";

export default function AllMociones() {
  const [mociones, setMociones] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("/get/mociones/pendientes").then((res) => {
      setMociones(res.data);
      setLoaded(true);
    });
  }, []);

  const mocionesPendientesList = mociones.map((mocion, i) => {
    return (
      <tr key={i}>
        <td>{mocion.title}</td>
        <td>{mocion.comision_global}</td>
        {mocion.comision__evento__startTime === null ? (
          <td>TBD</td>
        ) : (
          <td>{mocion.comision__evento__startTime}</td>
        )}
        <td>
          <a target="_blank" rel="noreferrer" href={mocion.url}>
            Ver
          </a>
        </td>
        <td></td>
      </tr>
    );
  });

  return (
    <div className="container d-flex justify-content-center align-items-center">
      {!loaded ? (
        <UseAnimations animation={loading} size={200} />
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Moción</th>
              <th>Comisión</th>
              <th>Fecha</th>
              <th>Ver</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{mocionesPendientesList}</tbody>
        </table>
      )}
    </div>
  );
}

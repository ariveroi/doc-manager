import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewPregunas = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("/get/preguntas")
      .then((res) => setPreguntas(res.data))
      .catch((errors) => console.log(errors));
  }, [reload]);

  const preguntasList = preguntas.map((pregunta, i) => (
    <tr key={i}>
      <td className="align-middle text-center">
        {pregunta.senador__name} {pregunta.senador__last_name}
      </td>
      <td className="align-middle text-center">{pregunta.created_at}</td>
      <td className="align-middle text-center">
        {!pregunta.status ? (
          <a target="_blank" rel="noreferer" href="/">
            Respuesta
          </a>
        ) : (
          <button className="btn">Añadir Respuesta</button>
        )}
      </td>
      <td className="align-middle text-center">
        <button
          onClick={(e) => downloadPregunta(e, pregunta.id)}
          className="btn"
        >
          Descargar
        </button>
      </td>
      <td className="align-middle text-center">
        <button className="btn" onClick={(e) => deleteDiscurso(e, pregunta.id)}>
          Eliminar
        </button>
      </td>
    </tr>
  ));

  const deleteDiscurso = (e, id) => {
    e.preventDefault();
    axios.delete(`/pregunta/del/${id}`).then((res) => setReload(!reload));
  };

  const downloadPregunta = (e, id) => {
    e.preventDefault();
    var title = "";
    fetch(`/download/pregunta?id=${id}`).then((res) => {
      // console.log(res)
      title = res.headers.get("content-disposition").split("filename=")[1];
      res.blob().then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", title);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
    });
  };

  return (
    <div className="container w-75 mt-5">
      <h4>Lista de las Preguntas</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col" className="text-center font-weight-bold">
              Senador
            </th>
            <th scope="col" className="text-center font-weight-bold">
              Subida
            </th>
            <th scope="col" className="text-center font-weight-bold">
              Estado
            </th>
            <th scope="col" className="text-center font-weight-bold">
              Descargar
            </th>
            <th scope="col" className="text-center font-weight-bold">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody>{preguntasList}</tbody>
      </table>
    </div>
  );
};

export default ViewPregunas;

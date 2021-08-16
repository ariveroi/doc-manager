import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPregunta = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [senadores, setSenadores] = useState([]);
  const [id, setSenador] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get("/senadores").then((res) => setSenadores(res.data));
  }, []);

  const senadoresList = senadores.map((senador) => (
    <option value={senador.id} key={senador.id}>
      {senador.last_name}, {senador.name}
    </option>
  ));

  const addPregunta = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("selectedFile", selectedFile, selectedFile.name);
    uploadData.append("id", id);
    // axios.post(`/add/discurso`, {id, selectedFile})
    fetch("/add/pregunta", {
      method: "POST",
      body: uploadData,
    })
      .then((res) => props.history.push("/preguntas"))
      .catch((error) => setError(true));
    // .then(res => props.onHide())
  };

  return (
    <div className="container w-75 formulario">
      <h4>Añadir Comisión</h4>
      <form>
        <select
          className="form-control"
          onChange={(e) => setSenador(e.target.value)}
        >
          <option value="0">Seleccionar Senador...</option>
          {senadoresList}
        </select>
        <input
          name="file-name"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          type="file"
          accept="application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
        />
      </form>
      {error ? <p>Error al subir el archivo</p> : <div></div>}
      <button className="btn btn-success" onClick={addPregunta}>
        Añadir
      </button>
    </div>
  );
};

export default AddPregunta;

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddComisionn(props) {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [url, setUrl] = useState("");
  const [senadores, setSenadores] = useState([]);
  const [senador, setSenador] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get("/senadores").then((res) => setSenadores(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      senador === 0 ||
      subject === "" ||
      date === "" ||
      time === "" ||
      url === ""
    ) {
      setError(true);
    } else {
      const hora = time.split(":");
      const endHour = parseInt(hora[0]) + 2;
      const startTime = date.toString() + "T" + time.toString() + ":00.000Z";
      const endTime =
        date.toString() + "T" + endHour.toString() + ":" + hora[1] + ":00.000Z";

      axios
        .post("/new/event", {
          subject: subject,
          startTime: startTime,
          endTime: endTime,
          isAllDayEvent: false,
          type: "comision",
          url: url,
          senador_id: senador,
        })
        .then((res) => props.history.push("/comisiones"));
    }
  };

  const senadoresList = senadores.map((senador) => {
    return (
      <option value={senador.id} key={senador.id}>
        {senador.last_name}, {senador.name}
      </option>
    );
  });

  return (
    <div className="container w-75 formulario">
      <h4>Añadir Comisión</h4>
      <form>
        <div className="form-group">
          <input
            onChange={(e) => setSubject(e.target.value)}
            type="text"
            className="form-control input-form"
            placeholder="Introducir aqui..."
          />
          <small className="form-text text-muted">Nombre de la Comisión</small>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="form-control input-form"
              placeholder="Introducir aqui..."
            />
            <small className="form-text text-muted">Fecha</small>
          </div>
          <div className="form-group col-md-6">
            <input
              onChange={(e) => setTime(e.target.value)}
              min="9:00"
              max="18:00"
              type="time"
              className="form-control input-form"
              placeholder="Introducir aqui..."
            />
            <small className="form-text text-muted">Hora</small>
          </div>
        </div>

        <div className="form-group">
          <input
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            className="form-control input-form"
            placeholder="Introducir aqui..."
          />
          <small className="form-text text-muted">
            Dirección URL del Senado
          </small>
        </div>
        <div className="form-group">
          <select
            className="form-control"
            onChange={(e) => setSenador(e.target.value)}
          >
            <option value="0">Seleccionar Senador...</option>
            {senadoresList}
          </select>
          <small className="form-text text-muted">Senador</small>
        </div>
        {error ? <p>Error al introducir los campos</p> : <p></p>}
        <div id="error"></div>
        <button onClick={handleSubmit} className="btn btn-success">
          Añadir
        </button>
      </form>
    </div>
  );
}

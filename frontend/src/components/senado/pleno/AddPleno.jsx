import React, { useState } from "react";
import axios from "axios";

const AddPleno = (props) => {
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // const hora = time.split(":");
    // const endHour = parseInt(hora[0]) + 2;
    console.log(date)
    const startTime = date.toString() + "T00:00:00.000Z";
    // const endTime =
    //   date.toString() + "T" + endHour.toString() + ":" + hora[1] + ":00.000Z";

    axios
      .post("/new/event", {
        subject: "Pleno",
        startTime: startTime,
        endTime: startTime,
        isAllDayEvent: true,
        type: "pleno",
        url: url,
      })
      .then((res) => props.history.push("/plenos"))
      .catch(error => console.log(error))
  };
  return (
    <div className="container w-75 formulario">
      <h4>Añadir Pleno</h4>
      <form>
        <div className="form-group">
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="form-control input-form"
            placeholder="Introducir aqui..."
          />
          <small className="form-text text-muted">Fecha</small>
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

        {/* {error ? <p>Error al introducir los campos</p> : <p></p>} */}
        <div id="error"></div>
        <button onClick={handleSubmit} className="btn btn-success">
          Añadir
        </button>
      </form>
    </div>
  );
};

export default AddPleno;

import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import MyModal from "../../common/modal/MyModal";
import { Button } from "react-bootstrap";

export default function AddEnmienda(props) {
  const [tipo, setTipo] = useState("");
  const [enmienda, setEnmienda] = useState("");

  const addEnmienda = (e) => {
    e.preventDefault();
    const senador = props.senador_name + " " + props.senador_last_name;
    const mocion_id = props.id;
    axios
      .post("/add/enmienda", { tipo, enmienda, senador, mocion_id })
      // .then(res => props.history.push(`/comision/${props.id}`))
      .then((res) => props.onHide());
  };

  return (
    <MyModal
      {...props}
      onSubmit={addEnmienda}
      title="Añadir Enmienda"
    >
      {/* <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Añadir enmienda: {props.id}</Modal.Title>
            </Modal.Header> */}
      {/* <Modal.Body className="show-grid"> */}
      <form>
        <div className="form-group">
          <small className="form-text text-muted">Tipo de enmienda</small>
          <select
            className="form-control"
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="0">Seleccionar tipo de enmienda...</option>
            <option value="adición">Adición</option>
            <option value="sustitución">Sustitución</option>
            <option value="supresión">Supresión</option>
            <option value="modificación">Modificación</option>
            <option value="varias">Varias</option>
          </select>
        </div>
        <div className="form-group">
          <small className="form-text text-muted">Enmienda</small>
          <textarea
            className="form-control"
            rows="10"
            onChange={(e) => setEnmienda(e.target.value)}
          ></textarea>
        </div>
      </form>
      {/* </Modal.Body>
            <Modal.Footer>
                <Button onClick={addEnmienda}>Enviar</Button>
            </Modal.Footer> */}
    </MyModal>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import * as TiIcons from "react-icons/ti";
import * as ImIcons from "react-icons/im";
import * as BsIcons from "react-icons/bs";
import axios from "axios";

import MyModal from "../../common/modal/MyModal";

const PlenoDetail = (props) => {
  const id = props.match.params.id;
  const [pleno, setPleno] = useState([]);
  const [asuntos, setAsuntos] = useState([]);
  const [show, setShow] = useState("");
  const [reload, setReload] = useState(true);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [exp, setExp] = useState("");

  useEffect(() => {
    axios
      .get(`/get/pleno/${id}`)
      .then((res) => setPleno(res.data[0].url))
      .catch((errors) => console.log(errors));
    axios.get(`/get/pleno/${id}/mociones`).then((res) => setAsuntos(res.data));
    // axios.get(`get/mociones?pleno_id=${id}`)
  }, [id, reload]);

  const asuntosList = asuntos.map((asunto, id) => (
    <tr key={id}>
      <td>{asunto.title}</td>
      <td className="text-center align-middle">
        <Link
          to={{
            pathname: `/mocion/${asunto.id}`,
            state: {
              senador_name: "senador_name",
              senador_last_name: "senador_last_name",
              mocion_title: asunto.title,
              discurso: asunto.discurso,
              voto: asunto.voto,
            },
          }}
        >
          <AiIcons.AiFillEye />
        </Link>
      </td>
      <td className="text-center align-middle">
        {asunto.voto === 0 ? (
          <span>
            <TiIcons.TiTick size={40} color="green" />
          </span>
        ) : asunto.voto === 1 ? (
          <span>
            <BsIcons.BsFillCircleFill size={30} color="gold" />
          </span>
        ) : (
          <span>
            <ImIcons.ImCross size={30} color="red" />
          </span>
        )}
      </td>
      <td className="text-center align-middle">
        <a
          rel="noreferrer"
          target="_blank"
          href={`https://www.senado.es${asunto.pdf}`}
        >
          <AiIcons.AiOutlineFilePdf size={30} />
        </a>
      </td>
    </tr>
  ));

  const handleSubmit = (e) => {
    axios
      .post("/pleno/add/mocion", {
        pleno_id: id,
        title: title,
        url: url,
        exp: exp,
      })
      .then((res) => setReload(!reload))
      .catch((errors) => console.log(errors));
    setShow("show out");
  };
  return (
    <div>
      <a target="_blank" rel="noreferrer" href={pleno}>Orden del día</a>
      <br></br>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Asunto</th>
            <th>Ver</th>
            <th>Voto</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>{asuntosList}</tbody>
      </table>
      <Button onClick={() => setShow("show")}>Añadir Moción</Button>
      <MyModal
        title="Añadir Moción"
        show={show}
        onHide={() => setShow("show out")}
        onSubmit={handleSubmit}
      >
        <Form>
          <Form.Group>
            <Form.Label>Título de la moción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce el título del asunto"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Número de expediente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce el número de expediente"
              onChange={(e) => setExp(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Url de la moción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introuduce la URL"
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Group>
        </Form>
      </MyModal>
    </div>
  );
};

export default PlenoDetail;

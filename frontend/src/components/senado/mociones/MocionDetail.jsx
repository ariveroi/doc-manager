import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import * as IoButton from "react-icons/io";
import AddEnmienda from "../mociones/AddEnmienda";
import AddDiscurso from "../mociones/AddDiscurso";
import "../../../style/MocionDetail.css";

const MocionDetail = (props) => {
  const id = props.match.params.id;

  const { senador_name, senador_last_name } = props.location.state;

  const [vote, setVote] = useState(0);
  const [enmienda, setEnmienda] = useState([]);
  const [addEnmienda, setAddEnmienda] = useState("");
  const [addDiscurso, setAddDiscurso] = useState("");
  const [reload, setReload] = useState(false);
  const [mocion, setMocion] = useState([]);

  useEffect(() => {
    axios.get(`/get/enmienda?mocion_id=${id}`).then((res) => {
      setEnmienda(res.data);
      // setDiscurso(res.data[0].mocion__discurso);
    });
    axios.get(`/get/mocion/${id}`).then((res) => {
      setMocion(res.data);
      setVote(res.data.voto);
    });
  }, [id, reload]);

  const deleteEnmienda = (e) => {
    e.preventDefault();
    axios
      .delete(`/enmienda/del/${enmienda[0].id}`)
      .then((res) => setReload(!reload));
  };

  const downloadEnmienda = (e) => {
    e.preventDefault();
    var title = "";
    fetch(`/download/enmienda?mocion_id=${id}`).then((res) => {
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
  const downloadDiscurso = (e) => {
    e.preventDefault();
    var title = "";
    fetch(`/download/discurso?id=${id}`).then((res) => {
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

  const changeVote = (e) => {
    e.preventDefault();
    axios
      .post(`/mocion/vote`, { vote, id })
      .then((res) => alert("vote Changed"));
  };

  return (
    <div className="container w-75" id="mocion-detail">
      <h4>{mocion.title}</h4>
      <br />
      <div className="section" id="voto">
        <span>Voto: </span>
        <select
          name="vote"
          id="vote"
          value={vote}
          onChange={(e) => setVote(e.target.value)}
        >
          <option value="0">Sí</option>
          <option value="1">Abstención</option>
          <option value="2">No</option>
        </select>
        <Button variant="danger" onClick={changeVote}>
          Cambiar Voto
        </Button>
      </div>
      <div className="section" id="enmienda">
        <span>Enmienda: </span>
        {enmienda.length > 0 ? (
          <div>
            <Button
              style={{ margin: "4px" }}
              variant="success"
              onClick={downloadEnmienda}
            >
              Descargar
            </Button>
            <Button variant="outline-danger" onClick={deleteEnmienda}>
              Eliminar
            </Button>
          </div>
        ) : (
          <div>
            <Button variant="success" onClick={(e) => setAddEnmienda("show")}>
              Añadir
            </Button>
            <AddEnmienda
              show={addEnmienda}
              id={id}
              senador_name={senador_name}
              senador_last_name={senador_last_name}
              onHide={() => {
                setAddEnmienda("show out");
                setReload(!reload);
              }}
            />
          </div>
        )}
      </div>
      <div className="section" id="discurso">
        <span>Discurso</span>
        {mocion.discurso === null ? (
          <div>
            <Button
              onClick={() => {
                setAddDiscurso("show");
              }}
            >
              {" "}
              Subir{" "}
            </Button>
            <AddDiscurso
              show={addDiscurso}
              onHide={() => {
                setAddDiscurso("show out");
                setReload(!reload);
              }}
              id={id}
            />
          </div>
        ) : (
          <div>
            <Button onClick={downloadDiscurso}>Descargar</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MocionDetail;

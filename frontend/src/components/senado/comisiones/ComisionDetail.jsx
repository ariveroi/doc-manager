import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as TiIcons from "react-icons/ti";
import * as ImIcons from "react-icons/im";
import * as BsIcons from "react-icons/bs";
import axios from "axios";
import { Button } from "react-bootstrap";

import AddEnmienda from "../mociones/AddEnmienda";
import AddDiscurso from "../mociones/AddDiscurso";

export default function ComisionDetail(props) {
  const id = props.match.params.id;

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [senador_name, setSenador_name] = useState("");
  const [senador_last_name, setSenador_last_name] = useState("");
  const [mociones, setMociones] = useState([]);
  const [addEnmiendaShow, setAddEnmiendaShow] = useState(false);
  const [addDiscurso, setAddDiscurso] = useState(false);
  const [provId, setProvId] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get(`/comision/get-comision?id=${id}`).then((res) => {
      const date = res.data[0].evento__startTime.split("-");
      const year = date[0];
      const month = date[1];
      const day = date[2].split("T")[0];
      setName(res.data[0].evento__subject);
      setDate(day + "/" + month + "/" + year);
      setSenador_name(res.data[0].senador__name);
      setSenador_last_name(res.data[0].senador__last_name);
    });
    axios
      .get(`/get/mociones?comision_id=${id}`)
      .then((res) => setMociones(res.data));
  }, [id, reload]);

  const downloadDiscurso = (e, id) => {
    e.preventDefault();
    var title = "";
    fetch(`/download/discurso?id=${id}`).then((res) => {
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

  const mocionesList = mociones.map((mocion) => (
    <tr key={mocion.id}>
      <td>{mocion.title}</td>
      <td className="text-center align-middle">
        <Link
          to={{
            pathname: `/mocion/${mocion.id}`,
            state: {
              senador_name: senador_name,
              senador_last_name: senador_last_name,
              mocion_title: mocion.title,
              discurso: mocion.discurso,
              voto: mocion.voto,
            },
          }}
        >
          <AiIcons.AiFillEye />
        </Link>
      </td>
      <td className="text-center align-middle">
        {mocion.voto === 0 ? (
          <span>
            <TiIcons.TiTick size={40} color="green" />
          </span>
        ) : mocion.voto === 1 ? (
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
          href={`https://www.senado.es${mocion.pdf}`}
        >
          <AiIcons.AiOutlineFilePdf size={30} />
        </a>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="container ">
        <h4>Comisión de {name}</h4>
        <h4>Día: {date}</h4>
        <h4>
          Senador: {senador_name} {senador_last_name}
        </h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Moción</th>
              <th>Ver</th>
              <th>Voto</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>{mocionesList}</tbody>
        </table>
      </div>
    </>
  );
}

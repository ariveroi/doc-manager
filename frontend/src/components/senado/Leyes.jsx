import React, { useState, useEffect } from "react";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import axios from "axios";
import * as TiIcons from "react-icons/ti";
import * as BsIcons from "react-icons/bs";
import * as ImIcons from "react-icons/im";
import MyModal from "../common/modal/MyModal";

export default function Leyes() {
  const [leyes, setLeyes] = useState([]);
  const [show, setShow] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [tmp_type, setTmp_type] = useState("");
  const [tmp_id, setTmp_id] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("/leyes").then((res) => {
      setLeyes(res.data);
      setLoaded(true);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const listLeyes = leyes.map((ley) => {
    return (
      <tr key={ley.id}>
        <td className="text-center align-middle">{ley.created_at}</td>
        <td>{ley.name}</td>
        {/* <td className="text-center align-middle">
          {ley.enmiendas_doc === null ? (
            <button
              className="btn"
              onClick={() => {
                setShow("show");
                setTmp_type("enmiendas_doc");
                setTmp_id(ley.id);
              }}
            >
              Añadir
            </button>
          ) : (
            <button className="btn">Descargar</button>
          )}
        </td>
        <td className="text-center align-middle">
          {ley.veto === null ? (
            <button className="btn">Añadir</button>
          ) : (
            <button className="btn">Descargar</button>
          )}
        </td>
        <td className="text-center align-middle">
          {ley.defensa === null ? (
            <button className="btn">Añadir</button>
          ) : (
            <button className="btn">Descargar</button>
          )}
        </td>
        <td className="text-center align-middle">
          {ley.voto === 0 ? (
            <span>
              <TiIcons.TiTick size={40} color="green" />
            </span>
          ) : ley.voto === 1 ? (
            <span>
              <BsIcons.BsFillCircleFill size={30} color="gold" />
            </span>
          ) : (
            <span>
              <ImIcons.ImCross size={30} color="red" />
            </span>
          )}
        </td> */}
        <td className="text-center align-middle">
          <a rel="noreferrer" target="_blank" href={ley.url}>
            Ver
          </a>
        </td>
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
              <th className="text-center align-middle">Introducida</th>
              <th className="text-center align-middle">Ley</th>
              {/* <th className="text-center align-middle">Enmiendas</th>
              <th className="text-center align-middle">Veto</th>
              <th className="text-center align-middle">Defensa</th>
              <th className="text-center align-middle">Voto</th> */}
              <th className="text-center align-middle">Ver</th>
            </tr>
          </thead>
          <tbody>{listLeyes}</tbody>
        </table>
      )}
      <MyModal
        title={`Añadir ${tmp_type} para ${tmp_id}`}
        show={show}
        onHide={() => setShow("show out")}
        onSubmit={handleSubmit}
      >
        <form>
          <input
            name="file-name"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            type="file"
            accept="application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
          />
        </form>
      </MyModal>
    </div>
  );
}

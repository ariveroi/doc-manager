import React, { useState } from "react";
// import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import MyModal from "../../common/modal/MyModal";
import { Button } from "react-bootstrap";

export default function AddDiscursoPage(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  // const onChange = e => {
  //     e.preventDefault()
  //     const file = e.target.files[0]
  //     const reader = new FileReader()
  //     reader.onload = (e) => {
  //         setSelectedFile(reader.result)
  //     }
  //     reader.readAsDataURL(file)
  // }

  const addDiscurso = (e) => {
    e.preventDefault();
    const id = props.id;
    const uploadData = new FormData();
    uploadData.append("selectedFile", selectedFile, selectedFile.name);
    uploadData.append("id", id);
    uploadData.append("name", selectedFile.name);
    // axios.post(`/add/discurso`, {id, selectedFile})
    fetch("/add/discurso", {
      method: "POST",
      body: uploadData,
    })
      .then((res) => props.onHide())
      .catch((error) => console.log(error));
    // .then(res => props.onHide())
  };

  return (
    <MyModal {...props} onSubmit={addDiscurso} title="Añadir Discurso">
      {/* <Modal.Header closeButton>
                <Modal.Title>Añadir discurso: {props.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid"> */}
      <form>
        <input
          name="file-name"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          type="file"
          accept="application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
      </form>
      {/* </Modal.Body> */}
      {/* <Modal.Footer>
                <Button onClick={addDiscurso}>Enviar</Button>
            </Modal.Footer> */}
    </MyModal>
  );
}

import React from "react";
import * as AiIcons from "react-icons/ai";
import PropTypes from "prop-types";

import "./Modal.scss";

const MyModal = (props) => {
  return (
    <div className={`mymodal ${props.show}`}>
      <div className="mymodal-content">
        <div className="mymodal-header">
          <h4>{props.title || ""}</h4>
          <button onClick={props.onHide} className="mymodal-close-button ">
            <AiIcons.AiOutlineClose />
          </button>
        </div>
        <div className="mymodal-body">
          {props.children}
        </div>
        <div className="mymodal-footer">
          <button onClick={props.onHide} className="btn btn-danger">
            Cancelar
          </button>
          <button onClick={props.onSubmit} className="btn btn-primary">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

MyModal.propTypes = {
  title: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.string.isRequired
};

export default MyModal;

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import './Sidebar.css'

// import { sidebar_routes, dropdown } from "../../routes/routes";

const Sidebar = (props) => {
  const linksList = props.links.map((link, i) => (
    <li key={i}>
      <Link className="link" to={link.route}>
        {link.text}
      </Link>
    </li>
  ));
  const dropdownList = props.dropdowns.map((dropdown, i) => {
    const dropdownChildrens = dropdown.childrens.map((children, j) => (
      <li key={j}>
        <Link className="link" to={children.route}>
          {children.text}
        </Link>
      </li>
    ));
    return (
      <li key={i}>
        <a
          href="#pageSubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          className="dropdown-toggle link"
        >
          {dropdown.title}
        </a>
        <ul className="collapse list-unstyled" id="pageSubmenu">
          {dropdownChildrens}
        </ul>
      </li>
    );
  });
  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <img alt="" className="img-fluid" src={props.img || ""}></img>
      </div>
      <ul className="list-unstyled components">
        {linksList}
        {dropdownList}
      </ul>
      <ul className="list-unstyled CTAs">
        <li>
          {/* <Link to="/logout" className="download link">
            Cerrar Sesión
          </Link> */}
        </li>
      </ul>
    </nav>
  );
};

Sidebar.propTypes = {
  links: PropTypes.array.isRequired,
  dropdowns: PropTypes.array
};

export default Sidebar;

import React from "react";
import Sidebar from "./common/sidebar/Sidebar";
import voxlogo from "../style/images/voxpng.png";
import { sidebar_routes, dropdowns } from "./routes/routes";

const Navbar = () => {
  return <Sidebar img={voxlogo} links={sidebar_routes} dropdowns={dropdowns} />;
};

export default Navbar;

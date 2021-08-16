import React from "react";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import Calendar from "./Calendar";
import ViewComisiones from "./senado/comisiones/ViewComisiones";
import AddComision from "./senado/comisiones/AddComision";
import AddSenador from "./senado/senadores/AddSenador";
import ViewSenadores from "./senado/senadores/ViewSenadores";
import ComisionDetail from "./senado/comisiones/ComisionDetail";
import Leyes from "./senado/Leyes";
import AllMociones from "./senado/mociones/AllMociones";
import MocionDetail from "./senado/mociones/MocionDetail";
import AddPregunta from "./senado/preguntas/AddPregunta";
import ViewPregunas from "./senado/preguntas/ViewPreguntas";
import AddPleno from "./senado/pleno/AddPleno";
import ViewPlenos from "./senado/pleno/ViewPlenos";
import PlenoDetail from "./senado/pleno/PlenoDetail";
import Navbar from "./Navbar";

export default function Main() {

  return (
    <div className="wrapper">
      <div>
        <Navbar />
        <div id="content">
          <nav className="navbar navbar-expand-lg navbarlight bg-light">
            <div className="container-fluid">
              <div className="d-flex justify-content-flex-end">
                <span>
                  {/* <FaIcons.FaUserAlt /> Nombre de usuario */}
                </span>
              </div>
            </div>
          </nav>

          <Switch>
            <Route exact path="/" component={Calendar} />
            <Route exact path="/comisiones" component={ViewComisiones} />
            <Route exact path="/new/comision" component={AddComision} />
            <Route exact path="/new" component={AddSenador} />
            <Route exact path="/view/senadores" component={ViewSenadores} />
            <Route exact path="/comision/:id" component={ComisionDetail} />
            <Route exact path="/leyes" component={Leyes} />
            <Route exact path="/mociones" component={AllMociones} />
            <Route
              exact
              path="/mocion/:id"
              component={MocionDetail}
            />
            <Route exact path="/new/pregunta" component={AddPregunta} />
            <Route exact path="/preguntas" component={ViewPregunas} />
            <Route exact path="/new/pleno" component={AddPleno} />
            <Route exact path="/plenos" component={ViewPlenos} />
            <Route exact path="/pleno/:id" component={PlenoDetail} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

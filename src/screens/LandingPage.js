import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../css/LandingPage.css";
import LogoWhiteTransparent from "../images/LogoWhiteTransparent.png";

//Landing page

export default class LandingPage extends Component {
  render() {
    return (
      <div className="outer-div-landing">
        <div className="sidebar-div">
          <Sidebar />
        </div>
        <div className="header-and-graph-div">
          <Header />
          <div className="logo-div">
            <img src={LogoWhiteTransparent} className="logo-large" />
          </div>
        </div>
        <div
          className="mock-footer"
          style={{ height: 50, backgroundColor: "#303030" }}
        />
      </div>
    );
  }
}

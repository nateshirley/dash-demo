import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../css/WaterScreen.css";

//Empty screen implemented as a placeholder for the electric screen

export default class ElectricScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="outer-div">
        <div className="header-div">
          {/* Header accepts screenTitle as prop to display at top of screen */}
          <Header screenTitle="Electric" />
        </div>
        <div className="sidebar-div">
          <Sidebar />
        </div>
        <div className="header-and-graph-div">
          <h1>Electric</h1>
        </div>
      </div>
    );
  }
}

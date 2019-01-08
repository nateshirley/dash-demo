import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../css/WaterScreen.css";

//Empty screen implemented as a placeholder for the mechanical screen

const MechanicalScreen = () => (
  <div className="outer-div">
    <div className="header-div">
      {/* Header accepts screenTitle as prop to display at top of screen */}
      <Header screenTitle="Mechanical" />
    </div>
    <div className="sidebar-div">
      <Sidebar />
    </div>
    <div className="header-and-graph-div">
      <h1>Mechanical</h1>
    </div>
  </div>
);

export default MechanicalScreen;

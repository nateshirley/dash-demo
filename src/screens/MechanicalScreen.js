import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MobileHeader from "../components/MobileHeader";
import "../css/WaterScreen.css";

//Empty screen implemented as a placeholder for the mechanical screen

const MechanicalScreen = () => (
  <div className="outer-div">
    {/* first, render sidebar and header, then graphCard */}
    <div className="sidebar-div">
      <Sidebar returnToggleValue={this.receiveToggleValue} />
    </div>
    <div>
      <div className="header-div">
        {/* Header accepts screenTitle as prop to display at top of screen */}
        <Header
          screenTitle="Mechanical"
          returnToggleValue={this.receiveToggleValue}
        />
      </div>
      <div className="mobile-header-div">
        <MobileHeader
          screenTitle="Mechanical"
          returnToggleValue={this.receiveToggleValue}
        />
      </div>
      <div className="header-and-graph-div">
        <h1>&nbsp; Mechanical Screen</h1>
        <h6>&nbsp; not featured in demo</h6>
      </div>
    </div>
    <div
      className="mock-footer"
      style={{ height: 50, backgroundColor: "#303030" }}
    />
  </div>
);

export default MechanicalScreen;

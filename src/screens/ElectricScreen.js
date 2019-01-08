import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../css/WaterScreen.css";
import MobileHeader from "../components/MobileHeader";

//Empty screen implemented as a placeholder for the electric screen

export default class ElectricScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="outer-div">
        {/* first, render sidebar and header, then graphCard */}
        <div className="sidebar-div">
          <Sidebar returnToggleValue={this.receiveToggleValue} />
        </div>
        <div>
          <div className="header-div">
            {/* Header accepts screenTitle as prop to display at top of screen */}
            <Header screenTitle="Electric" />
          </div>
          <div className="mobile-header-div">
            <MobileHeader screenTitle="Electric" />
          </div>
          <div className="header-and-graph-div">
            <h1>&nbsp; Electric Screen</h1>
            <h6>&nbsp; not featured in demo</h6>
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

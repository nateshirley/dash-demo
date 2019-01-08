import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import "../css/ScreenFrame.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import WaterScreen from "../screens/WaterScreen";
import InventoryScreen from "../screens/InventoryScreen";

//Simple header to display the Beanstalk Logo, and the name of the current screen

export default class ScreenFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLight: false
    };
  }

  returnScreen = () => {
    if (this.props.screen === "WaterScreen") {
      return (
        <WaterScreen
          temperatureData={this.props.screenMeasurementsData[0]}
          pHData={this.props.screenMeasurementsData[1]}
          isLight={this.state.isLight}
        />
      );
    }
    if (this.props.screen === "ElectricScreen") {
      return <div />;
    }
    if (this.props.screen === "MechanicalScreen") {
      return <div />;
    }
    if (this.props.screen === "InventoryScreen") {
      return (
        <InventoryScreen
          growthData={this.props.screenMeasurementsData[0]}
          isLight={this.state.isLight}
        />
      );
    }
  };

  receiveToggleValue = value => {
    this.setState({
      isLight: value
    });
  };

  render() {
    console.log("frame-> islight = " + this.state.isLight);
    return (
      <div className="outer-div">
        {/* first, render sidebar and header, then graphCard */}
        <div className="sidebar-div">
          <Sidebar returnToggleValue={this.receiveToggleValue} />
        </div>
        <div>
          <div className="header-div">
            {/* Header accepts screenTitle as prop to display at top of screen */}
            <Header
              screenTitle={this.props.title}
              returnToggleValue={this.receiveToggleValue}
            />
          </div>
          <div className="mobile-header-div">
            <MobileHeader
              screenTitle={this.props.title}
              returnToggleValue={this.receiveToggleValue}
            />
          </div>
          {this.returnScreen()}
        </div>
        <div
          className="mock-footer"
          style={{ height: 50, backgroundColor: "#303030" }}
        />
      </div>
    );
  }
}

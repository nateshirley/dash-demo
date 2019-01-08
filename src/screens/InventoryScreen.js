import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../css/InventoryScreen.css";
import HistogramCard from "../components/HistogramCard";
import MobileHeader from "../components/MobileHeader";

//Empty screen implemented as a placeholder for the inventory screen

let screenBackgroundColor;
const lightColors = {
  backgroundColor: "#D3D3D3"
};
const darkColors = {
  backgroundColor: "#444444"
};

class InventoryScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    screenBackgroundColor = this.props.isLight
      ? lightColors.backgroundColor
      : darkColors.backgroundColor;
    if (!this.props.growthData) {
      return <div />;
    }
    return (
      <div
        className="outer-inventory-div"
        style={{ backgroundColor: screenBackgroundColor }}
      >
        <Row>
          <Col>
            <HistogramCard
              graphData={this.props.growthData}
              title="Tower 1 Growth Stages"
              size="large"
              unitOfMeasurement="%"
              graphColor="purple"
              isLight={this.props.isLight}
            />
          </Col>
          <Col>
            <HistogramCard
              graphData={this.props.growthData}
              title="Tower 2 Growth Stages"
              size="large"
              unitOfMeasurement="%"
              graphColor="purple"
              isLight={this.props.isLight}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <HistogramCard
              graphData={this.props.growthData}
              title="Tower 3 Growth Stages"
              size="large"
              unitOfMeasurement="%"
              graphColor="purple"
              isLight={this.props.isLight}
            />
          </Col>
          <Col>
            <HistogramCard
              graphData={this.props.growthData}
              title="Tower 4 Growth Stages"
              size="large"
              unitOfMeasurement="%"
              graphColor="purple"
              isLight={this.props.isLight}
            />
          </Col>
          <Col>
            <HistogramCard
              graphData={this.props.growthData}
              title="Tower 5 Growth Stages"
              size="large"
              unitOfMeasurement="%"
              graphColor="purple"
              isLight={this.props.isLight}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default InventoryScreen;

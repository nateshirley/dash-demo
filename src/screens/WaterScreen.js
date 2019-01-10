import React, { Component } from "react";
import LineGraphCard from "../components/LineGraphCard";
import { Row, Col } from "reactstrap";
import "../css/WaterScreen.css";
import ThemeToggle from "../components/ThemeToggle";
import CurrentValueCard from "../components/CurrentValueCard";

let screenBackgroundColor;
const lightColors = {
  backgroundColor: "#D3D3D3"
};
const darkColors = {
  backgroundColor: "#444444"
};
class WaterScreen extends Component {
  constructor(props) {
    super(props);
  }

  //if component has not received data, render an empty div (loading screen)
  render() {
    screenBackgroundColor = this.props.isLight
      ? lightColors.backgroundColor
      : darkColors.backgroundColor;
    console.log("re-render water screen");
    if (!this.props.pHData || !this.props.temperatureData) {
      return <div />;
    }
    /* 
    Graph Card Props
    1. graphData: passes data for the graph
    2. title: title displayed in top left of graph card
    3. size: (options: "small", "large") Size of card, only relevant in desktop mode. Default = large
    Large: for graphs displayed in a row of 2 (top row) 
    Small: for graphs displayed in a row of 3 (bottom row)
    4. unitOfMeasurement (optional): default is an empty string. This is the unit of measurement
    displayed on the graph for the given measurement. (e.g. "&deg; F")
    5. graphColor (optional): Default is purple. Options currently are purple and orange
    */
    return (
      <div
        className="graphs-div"
        style={{ backgroundColor: screenBackgroundColor }}
      >
        <Row>
          <Col>
            <Row className="topRow">
              <Col>
                <div className="buffer">
                  <LineGraphCard
                    graphData={this.props.temperatureData}
                    title="Water Temperature"
                    size="large"
                    unitOfMeasurement="&deg; F"
                    graphColor="purple"
                    isLight={this.props.isLight}
                  />
                </div>
              </Col>
              <Col>
                <LineGraphCard
                  graphColor="orange"
                  graphData={this.props.pHData}
                  title="Water pH"
                  size="large"
                  isLight={this.props.isLight}
                />
              </Col>
            </Row>
            <Row className="bottom-row">
              <Col>
                <div className="buffer">
                  <LineGraphCard
                    graphColor="blue"
                    graphData={this.props.pHData}
                    title="Water pH"
                    size="small"
                    isLight={this.props.isLight}
                  />
                </div>
              </Col>
              <Col>
                <LineGraphCard
                  graphColor="red"
                  graphData={this.props.temperatureData}
                  title="Water Temperature"
                  unitOfMeasurement="&deg; F"
                  size="small"
                  isLight={this.props.isLight}
                />
              </Col>

              <Col>
                <LineGraphCard
                  graphColor="green"
                  graphData={this.props.pHData}
                  title="Water pH"
                  size="small"
                  isLight={this.props.isLight}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default WaterScreen;

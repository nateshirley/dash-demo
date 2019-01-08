import React, { Component, Text } from "react";
import { Card, Row, Col, CardTitle, Button, ButtonGroup } from "reactstrap";
import { Bar } from "react-chartjs-2";
import "../css/HistogramCard.css";
import GraphCardModal from "./GraphCardModal";

//constant to hold the names of the classes, which change
//depending on the size of the graph (large or small) to include appropriate CSS
let graphClassNames;
//to hold string for unit of measurement
let unitOfMeasurement;
const arrow = require("../images/arrow.png");
const expand = require("../images/expand.png");
//filters used to pull data based on the selected time scale

//colors used in dark theme
const darkThemeColors = {
  cardBackground: "black",
  text: "white",
  graphLine: "white",
  buttons: "secondary",
  graphBackground: "#303030",
  cardBorder: "white"
};
const lightThemeColors = {
  cardBackground: "white",
  text: "black",
  graphLine: "black",
  buttons: "secondary",
  graphBackground: "#D3D3D3",
  cardBorder: "black"
};
let colors;
//holds gradient options
const graphGradients = {
  purple: { start: "#7130FF", middle: "#9B3DED", end: "#A370C9" },
  orange: { start: "orange", middle: "#9B3DED", end: "#A370C9" }
};

class HistogramCard extends Component {
  constructor(props) {
    super(props);

    console.log("graphData for the histogram; " + this.growthData);
    const defaultYValues = this.props.graphData.data;
    const defaultLabels = this.props.graphData.labels;

    this.state = {
      dropdownOpen: false,
      yValues: defaultYValues,
      labels: defaultLabels
    };

    let graphColor = this.props.graphColor ? this.props.graphColor : "purple";
    unitOfMeasurement = this.props.unitOfMeasurement
      ? this.props.unitOfMeasurement
      : "";

    //function to create gradient and set apprropriate data for the graph
    this.data = canvas => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 290);
      gradient.addColorStop(0, graphGradients[graphColor].start);
      gradient.addColorStop(0.5, graphGradients[graphColor].middle);
      gradient.addColorStop(1, graphGradients[graphColor].end);

      return {
        labels: this.state.labels,
        datasets: [
          {
            label: this.props.title,
            backgroundColor: gradient,
            borderColor: colors.graphLine,
            borderWidth: 1,
            data: this.state.yValues
          }
        ]
      };
    };
  }

  //calculates min and math of current time frame and draws them on the graph
  drawHighLow = () => {
    const min = Math.min.apply(Math, this.state.yValues);
    const max = Math.max.apply(Math, this.state.yValues);
    return (
      <Col>
        <Row>
          <Col>
            <div className={graphClassNames.maxMinOuter}>
              <Row style={{ paddingTop: 10 }}>
                <div>{this.drawDownArrow()}</div>
                <div>
                  <CardTitle
                    className={graphClassNames.maxMinInner}
                    style={{
                      color: colors.text,
                      fontSize: "5vmin",

                      fontWeight: 200
                    }}
                  >
                    &ensp;
                    {min}
                    {unitOfMeasurement}
                  </CardTitle>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={graphClassNames.maxMinOuter}>
              <Row style={{ paddingTop: 10 }} className="low-row">
                <div>{this.drawUpArrow()}</div>
                <div className="text-left">
                  <CardTitle
                    className={graphClassNames.maxMinInner}
                    style={{
                      color: colors.text,
                      fontSize: "5vmin",
                      fontWeight: 200
                    }}
                  >
                    &ensp;
                    {max}
                    {unitOfMeasurement}
                  </CardTitle>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    );
  };

  drawUpArrow = () => {
    if (this.props.isLight) {
      return (
        <div
          className={graphClassNames.lightArrow}
          style={{
            color: colors.text,
            fontWeight: 200
          }}
        >
          &uarr;
        </div>
      );
    } else
      return (
        <div className="arrow-align">
          <img src={arrow} className={graphClassNames.arrowUp} />
        </div>
      );
  };

  drawDownArrow = () => {
    if (this.props.isLight) {
      return (
        <div
          className={graphClassNames.lightArrow}
          style={{
            color: colors.text,
            fontWeight: 200
          }}
        >
          &darr;
        </div>
      );
    } else
      return (
        <div className="arrow-align">
          <img src={arrow} className={graphClassNames.arrowDown} />
        </div>
      );
  };
  calculateYaxisMax = () => {
    const max = Math.max.apply(Math, this.state.yValues);
    const headRoom = max * 0.07;
    const axisMax = max + headRoom;
    return axisMax;
  };

  //resets the state with new data based on the time frame
  onTimeFrameChange = (timeFrameSelected, selectedData, times) => {
    return this.setState({
      timeFrameSelected: timeFrameSelected,
      yValues: selectedData,
      labels: times
    });
  };

  //calculates the appropriate min for the y-axis, leaving room a certain distance from the lowest value
  calculateYaxisMin = () => {
    const min = Math.min.apply(Math, this.state.yValues);
    const headRoom = min * 0.07;
    const axisMin = min - headRoom;
    return axisMin;
  };

  //calculates the appropriate max for the y-axis, leaving room a certain distance from the highest value
  calculateYaxisMax = () => {
    const max = Math.max.apply(Math, this.state.yValues);
    const headRoom = max * 0.07;
    const axisMax = max + headRoom;
    return axisMax;
  };

  //opens the modal when the expand button is clicked
  expand = () => {
    console.log("clicked");
    this.child.toggleModal();
  };

  render() {
    colors = this.props.isLight ? lightThemeColors : darkThemeColors;
    //sets appropriate class names based on size prop to edit attached css
    if (this.props.size === "small") {
      graphClassNames = {
        title: "title-small title",
        currentValue: "current-value-small current-value",
        currentValueUnits: "current-value-units-small current-value-units",
        maxMinInner: "max-min-inner-small max-min-inner",
        time: "time-small time",
        arrowDown: "arrow-down-small arrow-down",
        arrowUp: "arrow-up-small arrow-up",
        maxMinOuter: "max-min-outer-small max-min-outer",
        cardDiv: "card-div-small card-div",
        lightArrow: "light-arrow-small"
      };
    } else {
      graphClassNames = {
        title: "title-large title",
        currentValue: "current-value-large current-value",
        currentValueUnits: "current-value-units-large current-value-units",
        maxMinInner: "max-min-inner-large max-min-inner",
        time: "time-large time",
        arrowDown: "arrow-down-large arrow-down",
        arrowUp: "arrow-up-large arrow-up",
        maxMinOuter: "max-min-outer-large max-min-outer",
        cardDiv: "card-div-large card-div",
        lightArrow: "light-arrow-large"
      };
    }
    const graphOptions = {
      title: {
        display: true,
        position: "top",
        text: "Tower 1 Growth Distribution"
      },
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 10
        }
      },
      legend: {
        display: false
      },
      barPercentage: 0.2,
      categoryWidth: 1,
      gridlines: {
        offsetGridLines: true
      },
      scales: {
        xAxes: [
          {
            type: "category",
            ticks: {
              callback: function(label, index, labels) {
                return label;
              },
              fontColor: "grey",
              fontSize: 12
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Percent of total plants"
            },
            ticks: {
              callback: function(label, index, labels) {
                return label + "%";
              },
              fontColor: "grey",
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: 10,
              max: Math.ceil(this.calculateYaxisMax() / 10) * 10
            },
            display: true
          }
        ]
      }
    };
    return (
      <div className="graph-card">
        {/* Modal is included in the graph card with default hidden. It opens on click of the expand button */}
        <GraphCardModal
          graphData={this.props.graphData}
          title={this.props.title}
          //sets up a reference so that the graphcard component can call the modal's toggle function
          ref={instance => {
            this.child = instance;
          }}
        />
        <Card
          body
          inverse
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.cardBorder
          }}
          className={graphClassNames.cardDiv}
        >
          <Row>
            <Col xs="4" className="left-third">
              <Row>
                <Col>
                  <div>
                    <CardTitle
                      className={graphClassNames.title}
                      style={{
                        color: colors.text,
                        fontWeight: 200
                      }}
                    >
                      {this.props.title}
                    </CardTitle>
                  </div>
                </Col>
              </Row>

              <Row className="high-low">{this.drawHighLow()}</Row>
            </Col>
            {/* start of graph portion (right 2/3)*/}
            <Col
              className="right-two-thirds"
              xs="8"
              style={{
                backgroundColor: colors.graphBackground
              }}
            >
              <Row>
                <div className="card-chart-wrapper">
                  <Bar
                    data={this.data}
                    options={graphOptions}
                    responsive={true}
                    maintainAspectRatio={false}
                    height={"500px"}
                  />
                </div>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default HistogramCard;

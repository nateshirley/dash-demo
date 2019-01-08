import React, { Component, Text } from "react";
import { Card, Row, Col, CardTitle, Button, ButtonGroup } from "reactstrap";
import { Line } from "react-chartjs-2";
import "../css/LineGraphCard.css";
import GraphCardModal from "./GraphCardModal";

//constant to hold the names of the classes, which change
//depending on the size of the graph (large or small) to include appropriate CSS
let graphClassNames;
//to hold string for unit of measurement
let unitOfMeasurement;
const arrow = require("../images/arrow.png");
const expand = require("../images/expand.png");
//filters used to pull data based on the selected time scale
const timeScalesFilters = [
  {
    name: "1 hr",
    mockDataKey: "oneHour"
  },
  {
    name: "6 hr",
    mockDataKey: "sixHour"
  },
  {
    name: "24 hr",
    mockDataKey: "twentyFourHour"
  },
  {
    name: "3 day",
    mockDataKey: "threeDay"
  }
];
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
//holds gradient options
const graphGradients = {
  purple: { start: "#5000ff", middle: "#9f5ed9", end: "#A370C9" },
  orange: { start: "orange", middle: "#9B3DED", end: "#c56ee3" },
  blue: { start: "#27d3d5", middle: "#090979", end: "#5a50c1" },
  red: { start: "#ff4747", middle: "#090979", end: "#8856d0" },
  green: { start: "#94e9c7", middle: "#090979", end: "#3d6495" }
};
let colors;

class LineGraphCard extends Component {
  constructor(props) {
    super(props);
    //sets the default graph data to the 6 hr time frame
    const defaultFilter = timeScalesFilters[1];
    const defaultYValues = this.props.graphData.values[
      defaultFilter.mockDataKey
    ].slice();
    const defaultLabels = this.props.graphData.times[
      defaultFilter.mockDataKey
    ].slice();
    this.state = {
      dropdownOpen: false,
      timeFrameSelected: "6 hr",
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
      //gradient.addColorStop(0.9, graphGradients[graphColor].middle);
      gradient.addColorStop(0.9, graphGradients[graphColor].end);

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

  drawCurrentValue = () => {
    //if current value is acceptable, draw value in with standard color font, otherwise draw red
    if (
      this.props.graphData.currentValue.value <
        this.props.graphData.safeValueMax &&
      this.props.graphData.currentValue.value >
        this.props.graphData.safeValueMin
    ) {
      return (
        <div className="current-value-outer">
          <div
            className={graphClassNames.currentValue}
            style={{ color: colors.text }}
          >
            {this.props.graphData.currentValue.value}
          </div>
          <div
            className={graphClassNames.currentValueUnits}
            style={{ color: colors.text }}
          >
            {this.props.unitOfMeasurement}
          </div>
        </div>
      );
    } else
      return (
        <div className="current-value-outer">
          <div
            className={graphClassNames.currentValue}
            style={{ color: "#ff3939" }}
          >
            {this.props.graphData.currentValue.value}
          </div>
          <div
            className={graphClassNames.currentValueUnits}
            style={{ color: "#ff3939" }}
          >
            {this.props.unitOfMeasurement}
          </div>
        </div>
      );
  };

  //draws time and date on separate lines
  drawCurrentTime = () => {
    return (
      <CardTitle
        className={graphClassNames.time}
        style={{
          color: colors.text,
          fontWeight: 200
        }}
      >
        {this.props.graphData.currentValue.date}
        <br />
        {this.props.graphData.currentValue.time}
      </CardTitle>
    );
  };

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
                {this.drawUpArrow()}
                <div
                  className={graphClassNames.maxMinInner}
                  style={{
                    color: colors.text,

                    fontWeight: 200
                  }}
                >
                  &ensp;
                  {min}
                  {this.props.unitOfMeasurement}
                </div>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={graphClassNames.maxMinOuter}>
              <Row style={{ paddingTop: 10 }} className="low-row">
                {this.drawDownArrow()}
                <div
                  className={graphClassNames.maxMinInner}
                  style={{
                    color: colors.text,
                    fontWeight: 200
                  }}
                >
                  &ensp;
                  {max}
                  {this.props.unitOfMeasurement}
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

  //draws button group for the time scale buttons
  drawButtonGroup = () => {
    return timeScalesFilters.map((filter, index) => (
      <Button
        outline
        color={colors.buttons}
        size="sm"
        onClick={() =>
          this.onTimeFrameChange(
            filter.name,
            this.props.graphData.values[filter.mockDataKey],
            this.props.graphData.times[filter.mockDataKey]
          )
        }
        active={this.state.timeFrameSelected === filter.name}
      >
        {filter.name}
      </Button>
    ));
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
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "transparent",
              zeroLineColor: "transparent"
            },
            ticks: {
              fontSize: 2,
              fontColor: "transparent"
            }
          }
        ],
        yAxes: [
          {
            display: false,
            ticks: {
              display: false,
              min: this.calculateYaxisMin(),
              max: this.calculateYaxisMax()
            }
          }
        ]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4
        }
      }
    };
    return (
      <div className="graph-card" style={{ backgroundColor: "transparent" }}>
        {/* Modal is included in the graph card with default hidden. It opens on click of the expand button */}
        <GraphCardModal
          graphData={this.props.graphData}
          title={this.props.title}
          isLight={this.props.isLight}
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
              <Row>
                <Col>{this.drawCurrentValue()}</Col>
              </Row>
              <Row>
                <Col>{this.drawCurrentTime()}</Col>
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
                <div>
                  <img
                    src={expand}
                    className="expand"
                    onClick={() => this.expand()}
                  />
                </div>
              </Row>
              <Row>
                <div className="card-chart-wrapper">
                  <Line
                    data={this.data}
                    options={graphOptions}
                    responsive={true}
                    maintainAspectRatio={false}
                  />
                </div>
              </Row>
              <Row>
                <ButtonGroup
                  className="button-group"
                  aria-label="First group"
                  style={{ paddingBottom: 10 }}
                >
                  {this.drawButtonGroup()}
                </ButtonGroup>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default LineGraphCard;

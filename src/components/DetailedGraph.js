import React, { Component, Text } from "react";
import { Row, Button, ButtonGroup } from "reactstrap";
import { Line } from "react-chartjs-2";
import "../css/DetailedGraph.css";
import regression from "regression";
const configGraphHeight = "400%";
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
  graphLine: "#ffb14c",
  trendLine: "#6ffc86",
  buttons: "secondary",
  graphBackground: "#303030",
  cardBorder: "white"
};
const lightThemeColors = {
  cardBackground: "white",
  text: "black",
  graphLine: "maroon",
  trendLine: "#3f84ff",
  buttons: "secondary",
  graphBackground: "#D3D3D3",
  cardBorder: "black"
};
let colors;

/*
This is the detailed graph that opens inside the graph card modal. 
It borrows much of its code from the graphCard component. 
In this graph, grid lines are shown, axes are labeled with values, and a trendline is drawn
*/

class DetailedGraph extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.graphData);
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

    this.data = () => {
      return {
        labels: this.state.labels,
        datasets: [
          {
            label: this.props.title,
            backgroundColor: "transparent",
            borderColor: colors.graphLine,
            borderWidth: 2,
            data: this.state.yValues
          },
          //this is where the second line (trendline) is added
          {
            label: "TrendLine",
            backgroundColor: "transparent",
            borderColor: colors.trendLine,
            borderWidth: 2,
            data: this.trendline(this.state.yValues)
          }
        ]
      };
    };
  }

  trendline = yValues => {
    // create data format for trendline plugin
    const dataWithXValues = [];
    let mockXValue = 0;
    for (let i = 0; i < yValues.length; i++) {
      dataWithXValues.push([mockXValue, yValues[i]]);
      mockXValue++;
    }

    //use plugin for linear regression values
    console.log(dataWithXValues);
    const result = regression.linear(dataWithXValues);
    const gradient = result.equation[0];
    const yIntercept = result.equation[1];
    console.log("here is the slope " + gradient);
    console.log("here is the y int " + yIntercept);
    let trendlineData = [yIntercept];
    let currentValue = yIntercept;

    //create array with necessary y values
    for (let i = 0; i < yValues.length; i++) {
      currentValue = currentValue + gradient;
      trendlineData.push(currentValue);
    }

    return trendlineData;
  };

  //calculates the appropriate min for the y-axis, leaving room a certain distance from the lowest value
  calculateYaxisMin = () => {
    const min = Math.min.apply(Math, this.state.yValues);
    const headRoom = min * 0.07;
    const axisMin = min - headRoom;
    return axisMin;
  };

  //draws button group for the time scale buttons
  drawButtonGroup = () => {
    return timeScalesFilters.map((filter, index) => (
      <Button
        outline
        color="secondary"
        onClick={() =>
          this.onTimeFrameChange(
            filter.name,
            this.props.graphData.values[filter.mockDataKey]
          )
        }
        active={this.state.timeFrameSelected === filter.name}
      >
        {filter.name}
      </Button>
    ));
  };

  //calculates the appropriate max for the y-axis, leaving room a certain distance from the highest value
  calculateYaxisMax = () => {
    const max = Math.max.apply(Math, this.state.yValues);
    const headRoom = max * 0.07;
    const axisMax = max + headRoom;
    return axisMax;
  };

  //resets the state with new data based on the time frame
  onTimeFrameChange = (timeFrameSelected, selectedData) => {
    console.log(timeFrameSelected);
    console.log(selectedData);
    return this.setState({
      timeFrameSelected: timeFrameSelected,
      yValues: selectedData
    });
  };

  render() {
    colors = this.props.isLight ? lightThemeColors : darkThemeColors;
    const mainChartOpts = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: colors.text,
              drawOnChartArea: true
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              color: colors.text,
              drawOnChartArea: true
            },
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize:
                (this.calculateYaxisMax() - this.calculateYaxisMin()) / 5,
              min: this.calculateYaxisMin(),
              max: this.calculateYaxisMax()
            }
          }
        ]
      },
      elements: {
        point: {
          radius: 4,
          fontSize: 30,
          hitRadius: 10,
          hoverRadius: 5,
          hoverBorderWidth: 3
        }
      },
      hover: {
        mode: "nearest",
        intersect: true
      }
    };

    return (
      <div className="outer-card">
        <Row
          style={{
            backgroundColor: colors.graphBackground
          }}
        >
          <div className="detailed-chart-wrapper">
            <Line
              data={this.data}
              options={mainChartOpts}
              height={configGraphHeight}
            />
          </div>
        </Row>
        <Row xs="12" className="button-row">
          <ButtonGroup
            aria-label="First group"
            style={{ paddingBottom: 10 }}
            className="button-group"
          >
            {this.drawButtonGroup()}
          </ButtonGroup>
        </Row>
      </div>
    );
  }
}

export default DetailedGraph;

import React, { Component } from "react";
import { Card, CardBody, Row, Col, CardTitle, Container } from "reactstrap";

let values;
let times;
class CurrentValueCard extends Component {
  constructor(props) {
    super(props);
  }
  //takes three most recent measurements and averages them together to return a value for the card
  averageOfLastThreeMeasurements = data => {
    if (data.length > 2) {
      return (
        Number.parseFloat((data[0] + data[1] + data[2]) / 3).toFixed(3) +
        this.props.unitOfMeasurement
      );
    } else if (data.length < 0) {
      return (
        Number.parseFloat(data[0]).toFixed(3) + this.props.unitOfMeasurement
      );
    } else return "no data";
  };

  //returns time of last measurement for display on the card
  timeOfLastMeasurement = timeData => {
    if (timeData.length != 0) {
      return timeData[timeData.length - 1];
    }
    return "no time data";
  };

  render() {
    values = this.props.data.values["oneHour"];
    times = this.props.data.times.oneHour;
    return (
      <div style={{ padding: 120, color: "black", flex: 1 }}>
        <Container>
          <Card
            inverse
            style={{
              backgroundColor: "white",
              borderColor: "#7a7a7a",
              color: "black"
            }}
          >
            <CardTitle
              tag="h3"
              style={{
                color: "white",
                backgroundColor: "#7a7a7a",
                paddingLeft: 10,
                paddingTop: 7,
                paddingBottom: 10,
                textAlign: "left"
              }}
            >
              {this.props.title}
            </CardTitle>
            <CardBody>
              <Row style={{ fontSize: "18", color: "black" }}>
                <Col style={{ textAlign: "center" }}>
                  Measurement from {this.timeOfLastMeasurement(times)}:
                </Col>
              </Row>
              <Row style={{ paddingTop: 15, fontSize: "80px", color: "green" }}>
                <Col
                  style={{
                    textAlign: "center"
                  }}
                >
                  {this.averageOfLastThreeMeasurements(values)}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default CurrentValueCard;

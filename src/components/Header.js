import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import LogoWhite from "../images/LogoWhite.png";
import "../css/Header.css";
//Simple header to display the Beanstalk Logo, and the name of the current screen
export default class Header extends Component {
  render() {
    return (
      <div className="header-outer-div">
        <header
          className="App-header"
          style={{
            width: "100%",
            top: 0,
            left: 0,
            height: 70,
            backgroundColor: "#303030"
          }}
        >
          <Row>
            <Col xs=".2">
              <div style={{ paddingLeft: 7 }} />
            </Col>
            <Col xs="2">
              <img src={LogoWhite} className="white-logo" />
            </Col>
            <div className="header-title">{this.props.screenTitle}</div>
          </Row>
        </header>
      </div>
    );
  }
}

import React, { Component } from "react";
import {
  Row,
  Col,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
import NavigationButton from "./NavigationButton";
import LogoWhite from "../images/LogoWhite.png";
import LogoWhiteAws from "../images/LogoWhiteAws";
import "../css/MobileHeader.css";
import * as Routes from "../constants/Routes";
import { Link } from "react-router-dom";
import electricIcon from "../images/electricIcon.png";
import leafIcon from "../images/leafIcon.png";
import waterIcon from "../images/waterIcon.png";
import cogIcon from "../images/cogIcon.png";
import ToggleButton from "react-toggle-button";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class MobileHeader extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      isLight: false
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggleValue = value => {
    this.setState({
      isLight: !value
    });
    this.props.returnToggleValue(!value);
  };

  render() {
    return (
      <div className="header-outer-div">
        <Row>
          <Col>
            <NavbarToggler className="nav-button" onClick={this.toggleNavbar}>
              <ion-icon name="menu" size="large" />
            </NavbarToggler>
          </Col>
          <Col
            style={{
              color: "white",
              fontSize: "25px",
              fontWeight: 200,
              paddingTop: 7
            }}
          >
            {this.props.screenTitle}
          </Col>
          <Col xs="3">
            <NavbarBrand>
              <img src={LogoWhite} className="logo" />
            </NavbarBrand>
          </Col>
        </Row>

        <Collapse isOpen={!this.state.collapsed} className="collapsable-nav">
          <Navbar>
            <Nav tabs>
              <NavItem>
                <NavLink className="nav-link-mobile">
                  <Link to={Routes.WATER_SCREEN}>
                    <div style={{ color: "white" }}>
                      Irrigation
                      <img src={waterIcon} className="icon" />
                    </div>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink className="nav-link-mobile">
                  <Link to={Routes.INVENTORY_SCREEN}>
                    <div style={{ color: "white" }}>
                      Inventory
                      <img src={leafIcon} className="icon" />
                    </div>
                  </Link>
                </NavLink>
              </NavItem>

              {/*}
              <NavItem>
                <NavLink className="nav-link-mobile">
                  <Link to={Routes.MECHANICAL_SCREEN}>
                    <div style={{ color: "white" }}>
                      Mechanical
                      <img src={cogIcon} className="icon" />
                    </div>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-mobile">
                  <Link to={Routes.ELECTRIC_SCREEN}>
                    <div style={{ color: "white" }}>
                      Electric
                      <img src={electricIcon} className="icon" />
                    </div>
                  </Link>
                </NavLink>
              </NavItem>
          */}
            </Nav>
          </Navbar>
          <div className="drop-mobile">
            <UncontrolledDropdown size="sm">
              <DropdownToggle caret>Settings</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>
                  <div className="settings-dropdown">
                    <div className="light-theme-label">Light Theme:</div>
                    <ToggleButton
                      value={this.state.isLight}
                      onToggle={value => {
                        this.toggleValue(value);
                      }}
                    />
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Collapse>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import electricIcon from "../images/electricIcon.png";
import leafIcon from "../images/leafIcon.png";
import waterIcon from "../images/waterIcon.png";
import cogIcon from "../images/cogIcon.png";
import "../css/Sidebar.css";
import { Link } from "react-router-dom";
import * as Routes from "../constants/Routes";
import NavigationButton from "./NavigationButton";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import ToggleButton from "react-toggle-button";

/*
This sidebar component uses reactStrap's Nav component to render a 
vertical sidebar on the left side of the screen. Each screen has its own icon which can be clicked to route to that screen.
*/
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLight: false,
      collapsed: true
    };
  }

  toggleValue = value => {
    this.setState({
      isLight: !value
    });
    this.props.returnToggleValue(!value);
  };

  toggleNavbar = () => {
    console.log("good.");
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div className="sidebar-outer">
        <div className="padding-top" />
        <Nav tabs vertical>
          <NavItem>
            <NavLink className="nav-link">
              <div style={styles.buttonStyles}>
                <Link to={Routes.WATER_SCREEN}>
                  <img
                    src={waterIcon}
                    style={{ height: 25, width: 20, marginLeft: -7 }}
                  />
                </Link>
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link">
              <div style={styles.buttonStyles} className="sidebar-nav-button">
                <Link to={Routes.INVENTORY_SCREEN}>
                  <img
                    src={leafIcon}
                    style={{ height: 25, width: 25, marginLeft: -10 }}
                  />
                </Link>
              </div>
            </NavLink>
          </NavItem>
          {/*
          <NavItem>
            <NavLink className="nav-link">
              <div style={styles.buttonStyles}>
                <Link to={Routes.MECHANICAL_SCREEN}>
                  <img
                    src={cogIcon}
                    style={{ height: 25, width: 25, marginLeft: -10 }}
                  />
                </Link>
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link">
              <div style={styles.buttonStyles}>
                <Link to={Routes.ELECTRIC_SCREEN}>
                  <img
                    src={electricIcon}
                    style={{ height: 25, width: 25, marginLeft: -10 }}
                  />
                </Link>
              </div>
            </NavLink>
          </NavItem>
          */}
        </Nav>
        <div className="drop">
          <UncontrolledDropdown size="sm">
            <DropdownToggle caret />
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
      </div>
    );
  }
}

const styles = {
  buttonStyles: {
    paddingLeft: 9
  },
  navLink: {}
};

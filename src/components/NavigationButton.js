import React, { Component } from "react";

export default class NavigationButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button style={{ color: "white" }} onPress={this.props.toggleNavbar}>
          <ion-icon name="menu" size="large" />
        </button>
      </div>
    );
  }
}

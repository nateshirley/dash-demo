import React, { Component } from "react";
import ToggleButton from "react-toggle-button";

export default class ThemeToggle extends Component {
  //false = default = dark theme
  //true = light
  constructor(props) {
    super(props);
    this.state = {
      value: false
    };
  }

  returnToggleValue = value => {
    this.setState({
      value: !value
    });
  };

  returnState = () => {
    return this.state.value;
  };

  render() {
    this.props.sendToggleValue(this.state.value);
    return (
      <div>
        {" "}
        Light theme:
        <ToggleButton
          value={this.state.value}
          onToggle={value => {
            this.toggleValue(value);
          }}
        />
      </div>
    );
  }
}

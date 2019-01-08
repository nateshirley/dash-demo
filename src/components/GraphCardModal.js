import React, { Component } from "react";
import DetailedGraph from "./DetailedGraph";
import "../css/Modal.css";
import { Button, Card } from "reactstrap";
import Modal from "react-modal";
Modal.setAppElement("#root");

/*
This component uses a basic react-modal library to render a modal with the detailed graph inside
The modal includes a title, a close button, and the detailedGraph component with appropriate data
*/

const darkThemeColors = {
  cardBackground: "#444444",
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

export default class GraphCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleCloseModal = () => {
    this.toggleModal();
  };

  render() {
    colors = this.props.isLight ? lightThemeColors : darkThemeColors;
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className="detailed-graph-modal"
        overlayClassName="Overlay"
      >
        <Card
          body
          inverse
          style={{
            borderColor: colors.cardBorder,
            backgroundColor: colors.cardBackground
          }}
          className="modal-card"
        >
          <div
            className="header"
            style={{ color: colors.text, paddingBottom: 10 }}
          >
            {this.props.title}
            <Button onClick={this.toggleModal} className="modal-close">
              Close
            </Button>
          </div>
          <div className="detailed-graph-div">
            <DetailedGraph
              graphData={this.props.graphData}
              title={this.props.title}
              isLight={this.props.isLight}
            />
          </div>
        </Card>
      </Modal>
    );
  }
}

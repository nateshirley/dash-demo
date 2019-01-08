import React, { Component } from "react";

var AWS = require("aws-sdk");

var bucket = "beanstalk.mock.data";
var accessKey = "AKIAJP2EMBBKVAL4GEKA";
var secretAccessKey = "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";

export default class LogoWhiteAWS extends Component {
  render() {
    return;
    <img
      src={
        "https://s3.amazonaws.com/beanstalk.mock.data/Logo_white_transparent.png"
      }
      style={{ height: 40 }}
    />;
  }
}

import React, { Component } from "react";
import "../css/WaterScreen.css";
import ScreenFrame from "../components/ScreenFrame";

//configuration of Amazon S3 database
var s3 = require("aws-sdk/clients/s3");
var s3 = new s3({
  apiVersion: "2006-03-01",
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAJR3NH5EQVUJK4E4Q",
    secretAccessKey: "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"
  }
});

//Screen name is passed in as a prop, this object
//will hold the names of buckets/keys where data for the specific screen is stored
let screenDataFilters;

// Component communicates with aws s3 in order to retrieve
// stored data. It renders the screen and passes the data
// down as props
export default class DataFetch extends Component {
  constructor(props) {
    super(props);
    //state holds an array. This array will contain obejects
    //that hold all data for one measurement (e.g. temperature, ph)
    this.state = {
      screenMeasurementsData: []
    };
  }

  //global variabe screenDataFilters will be set based on which screen was passed down in the props
  setScreenDataFilters = () => {
    if (this.props.screen === "WaterScreen") {
      this.setWaterFilters();
    }
    if (this.props.screen === "ElectricScreen") {
      this.setElectricFilters();
    }
    if (this.props.screen === "MechanicalScreen") {
      this.setMechanicalFilters();
    }
    if (this.props.screen === "InventoryScreen") {
      this.setInventoryFilters();
    }
  };

  //Sets the bucket/key to retrieve data based on which pieces of data
  //need to be displayed in the water screen
  setWaterFilters = () => {
    screenDataFilters = {
      name: "Water Screen",
      title: "Irrigation",
      bucket: "beanstalk.mock.data",
      measurementFilters: [
        {
          name: "temperature",
          key: "mockTemperatureDataTest.json"
        },
        {
          name: "ph",
          key: "mockPhData.json"
        }
      ]
    };
  };

  setInventoryFilters = () => {
    screenDataFilters = {
      name: "Inventory Screen",
      title: "Inventory",
      bucket: "beanstalk.mock.data",
      measurementFilters: [
        {
          name: "growth",
          key: "growthData.json"
        }
      ]
    };
  };

  //maps over the measurement filters and retrieves data for each measurement
  //data is then pushed on to the array in the state
  getDataFromAws = () => {
    if (screenDataFilters.measurementFilters) {
      screenDataFilters.measurementFilters.map(filter => {
        var retrievedData;
        s3.getObject({
          Bucket: screenDataFilters.bucket,
          Key: filter.key
        })
          .promise()
          .then(response => {
            retrievedData = JSON.parse(response.Body);
            //spread operator makes a copy of the old state array and adds the new data on to it
            //the updated copy becomes the new state array
            this.setState({
              screenMeasurementsData: [
                ...this.state.screenMeasurementsData,
                retrievedData
              ]
            });
          });
      });
    } else console.log("navigation did not pass prop");
  };

  //call functions before render
  componentWillMount() {
    this.setScreenDataFilters();
    //this.getDataFromAws();
  }

  //after component renders, set an interval to re-fetch the data from AWS
  componentDidMount() {
    //setInterval(() => this.getDataFromAws(), 10000);
  }

  //render intended screen with recently fetched data
  render() {
    console.log(this.state.screenMeasurementsData);
    if (this.props.screen === "WaterScreen") {
      return (
        <ScreenFrame
          screenMeasurementsData={this.state.screenMeasurementsData}
          screen={this.props.screen}
          title={screenDataFilters.title}
        />
      );
    }

    if (this.props.screen === "ElectricScreen") {
      return <div />;
    }
    if (this.props.screen === "MechanicalScreen") {
      return <div />;
    }
    if (this.props.screen === "InventoryScreen") {
      return (
        <ScreenFrame
          screenMeasurementsData={this.state.screenMeasurementsData}
          screen={this.props.screen}
          title={screenDataFilters.title}
        />
      );
    }
  }
}

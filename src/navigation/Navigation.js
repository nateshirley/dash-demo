import React, { Component } from "react";
import ElectricScreen from "../screens/ElectricScreen";
import InventoryScreen from "../screens/InventoryScreen";
import MechanicalScreen from "../screens/MechanicalScreen";
import DataFetch from "../data/DataFetch";
import LandingPage from "../screens/LandingPage";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import * as Routes from "../constants/Routes";

/*
Navigation component organizes site navigation, where landing page is "LandingPage" component

Routes for the exact paths are imported from the Routes.js file in the constants folder. 

Each route renders the DataFetch component, 
which fetches data from aws and then renders the respective screen with that data
*/
class Navigation extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            exact
            path={Routes.WATER_SCREEN}
            /*
            Becasue water screen is the only fully implemented screen, 
            this is the only route that renders DataFetch as opposed the screen component directly
            */
            component={() => <DataFetch screen="WaterScreen" />}
          />
          <Route
            exact
            path={Routes.ELECTRIC_SCREEN}
            component={() => <ElectricScreen />}
          />
          {/*
          <Route
            path={Routes.MECHANICAL_SCREEN}
            component={() => <MechanicalScreen />}
          />
          <Route
            exact
            path={Routes.INVENTORY_SCREEN}
            component={() => <DataFetch screen="InventoryScreen" />}
          />
          */}
        </div>
      </BrowserRouter>
    );
  }
}

export default Navigation;

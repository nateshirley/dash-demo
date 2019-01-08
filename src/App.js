import React, { Component } from "react";
import Navigation from "./navigation/Navigation";

/*
App component renders navigation for the site.

Total component hiearchy: App -> Navigation -> DataFetch -> 
Screen -> (Header, Sidebar, {GraphCard(s) -> GraphCardModal})
*/
class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
      </div>
    );
  }
}

export default App;

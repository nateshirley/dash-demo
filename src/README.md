## Overview

This dashboard is meant as a collection to tools to use to display data as the first facility comes into working order. On each page, there is a sidebar that allows for navigation between four screens. The screens are broken down by system category, such as electrical or irrigation.

The water screen is fully implemented to show what a screen on this dashboard will look like when it is fully implemented. Each graph is expandable, displaying a larger more-detailed graph with a trendline on expansion.
With the features discussed below, we hope this skelton facilitates the process of managing facility 1.

## Features

### Line Graph Card

LineGraphCard.js displays current value, high, and low of the data that varies with time. This component also contains different time scales to observe trends over different pereiods of time. There is a detailed version of the graph with a trend line.

### Histogram Card

HistogramCard.js is meant to display the potential for other types of graphs that can be created with this card format. The data is less complex and only for one time scale.

### Light/Dark Theme

On the Sidebar.js component, there is a button that displays a switch to change from dark to light theme.

### Information Flow

App.js renders Navigation.js, which establishes the route names for each screen. Depending on the route selected, DataFectch.js is called with a certain screen name passed in as a prop. This screen name tells DataFetch.js what file in AWS s3 to grab the data from. This data is then passed in as a prop to the selected screen componenent. The screen componenet passes said props to each card to render specific information.

### Data Storage on Amazon s3

The data used for the graphs on the dashboard is pulled from amazon s3. The credentials are verified in the DataFetch.js Componeent, and each chart uses data from a different file contained in a bucket called beanstalk.mock.data.

### Navigation using React Router

The navigation uses react router. The routes are held in a file called Routes.js in the constants folder. Navigation.js in the navigation folder uses the constants in Routes.js to create a BrowserRouter that renders certain screens depending on the route selected.

### Detailed Graph

There is an expandable version of the line graph that is displayed by clicking the expand button in the top right of the LineGraphCard.js. The expandable graph is displayed with a modal from reactstrap. This larger graph displays gridlines and a trendline.

## Future Additions

### Text messages

Amazons SNS (simple notification system) is a great tool for notifications attached to data. Buckets can be configured to send notifications (text or email) when a file is added or editted. One implementation would be to do data analaysis on the backend and add to "issue" bucket when there is a problem. Additions to the "issue" bucket could trigger a notification. https://docs.aws.amazon.com/AmazonS3/latest/user-guide/enable-event-notifications.html

### Adding More Graph Cards

Looking at the render functions of HistogramCard.js and LineGraphCard.js will show that these components are broken up into a left third where a header and select data is displayed and a right two thirds where some sort of graph is displayed. Creating another card component would require importing a new chart from react-chartjs-2 and replacing the Bar or Line component. The new data would have to be put on AWS, pulled down in DataFetch.js, and sent as props to the screen then the new card component.

### Adding More Screens

To add more screens, add the screen to Routes.js. Then, create a new Route in Navigation whose path is the const created in Routes.js. The component prop should correspond to a new component. Decide what data must be pulled form AWS in the DataFetch.js for the new screen, and make sure getDatafromAws() in DataFetch.js pulls said data. Send this data to the new screen as it is rendered in DataFetch.js. Use the WaterScreen as a template to fill the new screen with cards to display data, and send those cards the necessary data as props.

# Simple Calculator React

A simple web application built with Meteor.js and React that functions as a graphing calculator.

## Description

This application allows users to input mathematical functions and visualize their graphs over a specified range of x-values. It utilizes React for the user interface, Chart.js for plotting the graphs, and Math.js for parsing and evaluating mathematical expressions.

## Features

*   Plot various mathematical functions (e.g., polynomials, trigonometric functions).
*   Specify the range for the x-axis.
*   Adjust the number of points used for plotting.

## Technologies Used

*   Meteor.js
*   React
*   Chart.js
*   Math.js

## Prerequisites

Before running this application, ensure you have the following installed:

*   Node.js
*   Meteor

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd simple-calculator-react
    ```
3.  Install dependencies:
    ```bash
    meteor npm install
    ```

## Usage

1.  Start the Meteor application:
    ```bash
    meteor
    ```
    The application should be available at `http://localhost:3000` (or another port if 3000 is in use).

2.  In the application interface:
    *   Enter the function you want to plot in the "y =" input field (e.g., `x^2`, `sin(x)`, `log(x)`).
    *   Specify the minimum and maximum values for x.
    *   Enter the number of points to use for plotting.
    *   Click the "Plot" button to generate the graph.

## Project Structure

*   `.meteor/`: Meteor specific configuration and local environment data.
*   `client/`: Contains client-side code.
*   `server/`: Contains server-side code.
*   `imports/`: Contains code imported by both client and server, including UI components and API definitions.
    *   `imports/ui/`: React components like the `GraphingCalculator`.
    *   `imports/api/`: Placeholder for potential API definitions.
*   `tests/`: Placeholder for tests. 
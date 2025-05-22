// imports/ui/App.jsx
import React from 'react';
import { Calculator } from './Calculator';
import { GraphingCalculator } from './GraphingCalculator'; // Import

export const App = () => (
  <div>
    <h1>Scientific Calculator</h1>
    <Calculator />
    <hr />
    <GraphingCalculator />
  </div>
);
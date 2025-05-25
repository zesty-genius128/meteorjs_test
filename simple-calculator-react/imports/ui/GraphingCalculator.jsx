// imports/ui/GraphingCalculator.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { create, all } from 'mathjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const math = create(all);

export const GraphingCalculator = () => {
  const [funcStr, setFuncStr] = useState('x^2');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'y = f(x)',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [points, setPoints] = useState(100);

  const plotFunction = () => {
    try {
      const compiledFunc = math.compile(funcStr);
      const xValues = [];
      const yValues = [];
      const step = (xMax - xMin) / (points - 1);

      for (let i = 0; i < points; i++) {
        const x = xMin + i * step;
        xValues.push(x.toFixed(2));
        try {
          const y = compiledFunc.evaluate({ x: x });
          if (typeof y === 'number' && isFinite(y)) {
             yValues.push(y);
          } else {
             yValues.push(null);
          }
        } catch (e) {
          yValues.push(null);
        }
      }

      setChartData({
        labels: xValues,
        datasets: [
          {
            ...chartData.datasets[0],
            label: `y = ${funcStr}`,
            data: yValues,
          },
        ],
      });
    } catch (error) {
      console.error("Error plotting function:", error);
      alert("Invalid function string: " + error.message);
    }
  };

  useEffect(() => {
    plotFunction();
  }, [funcStr, xMin, xMax, points]);

  return (
    <div>
      <h3>Graphing Calculator</h3>
      <div>
        <label htmlFor="funcInput">y = </label>
        <input
          type="text"
          id="funcInput"
          value={funcStr}
          onChange={(e) => setFuncStr(e.target.value)}
          placeholder="e.g., x^2 or sin(x)"
        />
      </div>
      <div>
        <label>X Min: <input type="number" value={xMin} onChange={e => setXMin(parseFloat(e.target.value))} /></label>
        <label>X Max: <input type="number" value={xMax} onChange={e => setXMax(parseFloat(e.target.value))} /></label>
        <label>Points: <input type="number" value={points} onChange={e => setPoints(parseInt(e.target.value))} /></label>
      </div>
      <button onClick={plotFunction}>Plot</button>
      <div style={{ width: '600px', height: '400px', margin: '20px auto' }}>
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }}/>
      </div>
    </div>
  );
};
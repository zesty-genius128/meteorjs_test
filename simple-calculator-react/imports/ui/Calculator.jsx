// imports/ui/Calculator.jsx
import React, { useState } from 'react';
import { create, all } from 'mathjs'; 

const math = create(all); 

export const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isRadians, setIsRadians] = useState(true); 

  const handleInput = (value) => {
    if (displayValue === '0' && !'()'.includes(value) && !math.isFunction(value) && !isOperator(value)) {
      setDisplayValue(value);
    } else if (isOperator(value) && isOperator(displayValue.slice(-1))) {
      setDisplayValue(displayValue + value);
    }
    else {
      setDisplayValue(displayValue + value);
    }
  };

  const isOperator = (char) => {
    return ['+', '-', '*', '/'].includes(char);
  };

  const clearDisplay = () => {
    setDisplayValue('0');
  };

  const backspace = () => {
    setDisplayValue(displayValue.length > 1 ? displayValue.slice(0, -1) : '0');
  };

  const calculateResult = () => {
    try {
      let expression = displayValue;

      const result = math.evaluate(expression);
      setDisplayValue(String(result));
    } catch (error) {
      setDisplayValue('Error');
      console.error("Calculation error:", error);
    }
  };

  const inputFunction = (funcName) => {
    if (displayValue === '0') {
      setDisplayValue(funcName + '(');
    } else {
      setDisplayValue(displayValue + funcName + '(');
    }
  };

  const toggleMode = () => {
    setIsRadians(!isRadians);
  };

  const buttonStyle = { /* ... your existing style ... */ width: '60px', margin:'3px' };
  const displayStyle = { /* ... your existing style ... */ width: 'auto', minWidth: '260px', maxWidth: 'calc(100% - 20px)'};
  const calculatorStyle = { /* ... your existing style ... */ width: 'auto', maxWidth: '450px'};

  return (
    <div style={calculatorStyle}>
      <div style={displayStyle}>{displayValue}</div>
      <div>Mode: {isRadians ? 'RAD' : 'DEG'} <button onClick={toggleMode}>Toggle</button></div>
      {/* Row 1 */}
      <div>
        <button style={buttonStyle} onClick={() => inputFunction('sin')}>sin</button>
        <button style={buttonStyle} onClick={() => inputFunction('cos')}>cos</button>
        <button style={buttonStyle} onClick={() => inputFunction('tan')}>tan</button>
        <button style={buttonStyle} onClick={() => inputFunction('log')}>log</button> {/* log10 */}
        <button style={buttonStyle} onClick={() => inputFunction('ln')}>ln</button> {/* natural log */}
      </div>
      {/* Row 2 */}
      <div>
        <button style={buttonStyle} onClick={() => handleInput('(')}>(</button>
        <button style={buttonStyle} onClick={() => handleInput(')')}>)</button>
        <button style={buttonStyle} onClick={() => inputFunction('sqrt')}>√</button>
        <button style={buttonStyle} onClick={() => handleInput('^')}>x^y</button>
        <button style={buttonStyle} onClick={() => handleInput('!')}>n!</button> {/* Math.js supports factorial: 5! */}
      </div>
      {/* Row 3 - Numbers & Basic Ops */}
      <div>
        <button style={buttonStyle} onClick={() => handleInput('7')}>7</button>
        <button style={buttonStyle} onClick={() => handleInput('8')}>8</button>
        <button style={buttonStyle} onClick={() => handleInput('9')}>9</button>
        <button style={buttonStyle} onClick={() => handleInput('/')}>/</button>
        <button style={buttonStyle} onClick={backspace}>DEL</button>
      </div>
      {/* Row 4 */}
      <div>
        <button style={buttonStyle} onClick={() => handleInput('4')}>4</button>
        <button style={buttonStyle} onClick={() => handleInput('5')}>5</button>
        <button style={buttonStyle} onClick={() => handleInput('6')}>6</button>
        <button style={buttonStyle} onClick={() => handleInput('*')}>*</button>
        <button style={buttonStyle} onClick={clearDisplay}>C</button>
      </div>
      {/* Row 5 */}
      <div>
        <button style={buttonStyle} onClick={() => handleInput('1')}>1</button>
        <button style={buttonStyle} onClick={() => handleInput('2')}>2</button>
        <button style={buttonStyle} onClick={() => handleInput('3')}>3</button>
        <button style={buttonStyle} onClick={() => handleInput('-')}>-</button>
        <button style={{...buttonStyle, height: '126px'}} onClick={calculateResult}>=</button> {/* Taller equals */}
      </div>
      {/* Row 6 */}
      <div>
        <button style={{...buttonStyle, width: '126px'}} onClick={() => handleInput('0')}>0</button>
        <button style={buttonStyle} onClick={() => handleInput('.')}>.</button>
        <button style={buttonStyle} onClick={() => handleInput('+')}>+</button>
        {/* Equals is now on the side */}
      </div>
       {/* Constants */}
       <div>
        <button style={buttonStyle} onClick={() => handleInput('pi')}>π</button>
        <button style={buttonStyle} onClick={() => handleInput('e')}>e</button>
      </div>
    </div>
  );
};
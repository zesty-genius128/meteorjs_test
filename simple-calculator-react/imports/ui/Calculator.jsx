// imports/ui/Calculator.jsx
import React, { useState, useEffect } from 'react';

export const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (currentValue == null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = calculate(currentValue, inputValue, operator);
      setDisplayValue(String(result));
      setCurrentValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (prevValue, nextValue, op) => {
    switch (op) {
      case '+':
        return prevValue + nextValue;
      case '-':
        return prevValue - nextValue;
      case '*':
        return prevValue * nextValue;
      case '/':
        return prevValue / nextValue;
      default:
        return nextValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);
    if (operator && currentValue !== null) {
      const result = calculate(currentValue, inputValue, operator);
      setDisplayValue(String(result));
      setCurrentValue(result); // Or setCurrentValue(null) if you want to reset after equals
      setOperator(null);
      setWaitingForOperand(true); // So next digit starts a new number
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      if (/[0-9]/.test(key)) {
        inputDigit(parseInt(key));
      } else if (/[+\-*/]/.test(key)) {
        performOperation(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === 'Enter' || key === '=') {
        handleEquals();
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputDigit, inputDecimal, clearDisplay, performOperation, handleEquals]); // Add dependencies

  // Basic styling (you can move this to a CSS file)
  const buttonStyle = {
    width: '50px',
    height: '50px',
    margin: '2px',
    fontSize: '18px',
  };

  const displayStyle = {
    width: '218px', // 4 buttons * (50px width + 2*2px margin)
    height: '50px',
    backgroundColor: '#eee',
    textAlign: 'right',
    padding: '10px',
    boxSizing: 'border-box',
    marginBottom: '10px',
    fontSize: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const calculatorStyle = {
    width: '230px',
    margin: '20px auto',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div style={calculatorStyle}>
      <div style={displayStyle}>{displayValue}</div>
      <div>
        <button style={buttonStyle} onClick={() => performOperation('/')}>/</button>
        <button style={buttonStyle} onClick={() => performOperation('*')}>*</button>
        <button style={buttonStyle} onClick={() => performOperation('-')}>-</button>
        <button style={buttonStyle} onClick={() => performOperation('+')}>+</button>
      </div>
      <div>
        <button style={buttonStyle} onClick={() => inputDigit(7)}>7</button>
        <button style={buttonStyle} onClick={() => inputDigit(8)}>8</button>
        <button style={buttonStyle} onClick={() => inputDigit(9)}>9</button>
        <button style={{...buttonStyle, height: '104px'}} onClick={handleEquals} rowSpan="2">=</button>
      </div>
      <div>
        <button style={buttonStyle} onClick={() => inputDigit(4)}>4</button>
        <button style={buttonStyle} onClick={() => inputDigit(5)}>5</button>
        <button style={buttonStyle} onClick={() => inputDigit(6)}>6</button>
      </div>
      <div>
        <button style={buttonStyle} onClick={() => inputDigit(1)}>1</button>
        <button style={buttonStyle} onClick={() => inputDigit(2)}>2</button>
        <button style={buttonStyle} onClick={() => inputDigit(3)}>3</button>
        <button style={{...buttonStyle, height: '104px'}} onClick={clearDisplay} rowSpan="2">C</button>
      </div>
      <div>
        <button style={{...buttonStyle, width: '104px'}} onClick={() => inputDigit(0)} colSpan="2">0</button>
        <button style={buttonStyle} onClick={inputDecimal}>.</button>
      </div>
    </div>
  );
};
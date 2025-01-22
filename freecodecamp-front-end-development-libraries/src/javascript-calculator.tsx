import ReactDOM from 'react-dom';
import { evaluate } from 'mathjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode, useState } from 'react';

interface ButtonProps {
  id:
    | 'zero'
    | 'one'
    | 'two'
    | 'three'
    | 'four'
    | 'five'
    | 'six'
    | 'seven'
    | 'eight'
    | 'nine'
    | 'add'
    | 'subtract'
    | 'multiply'
    | 'divide'
    | 'decimal'
    | 'clear'
    | 'equals';
  onClick: (value: string) => void;
  className?: string;
}

function Button(props: ButtonProps) {
  const buttonValues = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    add: '+',
    subtract: '-',
    multiply: '*',
    divide: '/',
    decimal: '.',
    clear: 'C',
    equals: '=',
  };

  return (
    <button
      className={'btn btn-primary ' + props.className}
      id={props.id}
      onClick={() => props.onClick(buttonValues[props.id])}
    >
      {buttonValues[props.id]}
    </button>
  );
}

function App() {
  const [state, setState] = useState({ display: '0' });

  const isOperator = (char: string) => ['+', '-', '*', '/'].includes(char);

  function handleDecimal(value: string) {
    const numbers = state.display.split(/[-+*/]/);
    const currentNumber = numbers[numbers.length - 1];

    // Check if the current number already contains a decimal
    if (currentNumber.includes('.')) {
      return state.display;
    }
    return state.display + value;
  }

  function handleOperator(value: string) {
    const lastChar = state.display.slice(-1);
    const secondLastChar = state.display.slice(-2, -1);

    // Handle negative numbers
    if (value === '-' && isOperator(lastChar) && !isOperator(secondLastChar)) {
      return state.display + value;
    }

    // Replace consecutive operators with the new one
    if (isOperator(lastChar)) {
      if (isOperator(secondLastChar)) {
        // If we have two operators and getting a third, remove both previous ones
        return state.display.slice(0, -2) + value;
      }
      // Replace single operator with new one
      return state.display.slice(0, -1) + value;
    }

    return state.display + value;
  }

  function setDisplay(value: string) {
    setState((prevState) => {
      let newDisplay = prevState.display;

      if (newDisplay === '0' && !isOperator(value) && value !== '.') {
        newDisplay = value;
      } else if (value === '.') {
        newDisplay = handleDecimal(value);
      } else if (isOperator(value)) {
        newDisplay = handleOperator(value);
      } else {
        newDisplay += value;
      }

      return {
        display: newDisplay,
      };
    });
  }

  function clearDisplay() {
    setState({ display: '0' });
  }

  function calculate() {
    try {
      const result = evaluate(state.display);

      setState({
        display: String(result),
      });
    } catch {
      setState({
        display: 'Error',
      });
    }
  }

  return (
    <section className="d-flex justify-content-center pt-5">
      <div id="quote-box" className="card w-50">
        <div className="card-header text-center">JavaScript Calculator</div>
        <div className="card-body">
          <div className="container text-center">
            <div className="row mb-4">
              <div className="col-3">
                <Button className='btn-danger' id="clear" onClick={clearDisplay} />
              </div>
              <div className="col-9">
                <div className="border h-100 pt-1" id="display">
                  {state.display}
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-3">
                <Button id="seven" onClick={setDisplay} />
              </div>
              <div className="col-3">
                <Button id="eight" onClick={setDisplay} />
              </div>
              <div className="col-3">
                <Button id="nine" onClick={setDisplay} />
              </div>
              <div className="col-3">
                <Button id="add" onClick={setDisplay} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-3">
                <Button id="four" onClick={setDisplay} />
              </div>
              <div className="col-3">
                <Button id="five" onClick={setDisplay} />
              </div>
              <div className="col-3">
                <Button id="six" onClick={setDisplay} />
              </div>
              <div className="col-3">
                <Button id="subtract" onClick={setDisplay} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-3">
                <Button id="one" onClick={setDisplay} />
              </div>
              <div className="col-3">
                <Button id="two" onClick={setDisplay} />
              </div>
              <div className="col-3">
                <Button id="three" onClick={setDisplay} />
              </div>
              <div className="col-3">
                <Button id="divide" onClick={setDisplay} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-3">
                <Button id="zero" onClick={setDisplay} />
              </div>
              <div className="col-3">
                <Button id="decimal" onClick={setDisplay} />
              </div>
              <div className="col-3">
                <Button className='btn-secondary' id="equals" onClick={calculate} />
              </div>
              <div className="col-3">
                <Button id="multiply" onClick={setDisplay} />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-body-secondary d-flex justify-content-between"></div>
        <a
          className="btn border-top"
          href="https://github.com/VienDinhCom/practice-makes-perfect/tree/main/front-end-development-libraries"
          target="_blank"
        >
          Source on GitHub
        </a>
      </div>
    </section>
  );
}
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')!
);

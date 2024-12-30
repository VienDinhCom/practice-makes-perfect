import ReactDOM from 'react-dom';
import { evaluate } from 'mathjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode, useEffect, useState } from 'react';

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

  const value = buttonValues[props.id];

  return (
    <button
      id={props.id}
      onClick={() => {
        props.onClick(String(value));
      }}
    >
      {value}
    </button>
  );
}

function App() {
  const [state, setState] = useState({ display: '0', temp: 0 });

  function setDisplay(value: string) {
    setState((state) => {
      let display = state.display;

      if (display === '0') {
        display = value;
      } else {
        display += value;
      }

      return { ...state, display };
    });
  }

  function clearDisplay() {
    setState((state) => {
      return { ...state, display: '0' };
    });
  }

  function caculate() {
    setState((state) => {
      return { ...state, display: evaluate(state.display) };
    });
  }

  return (
    <section className="d-flex justify-content-center pt-5">
      <div id="quote-box" className="card w-50">
        <div className="card-header text-center">JavaScript Calculator</div>
        <div className="card-body">
          <div className="container text-center">
            <div className="row mb-4">
              <div className="col">
                <Button id="clear" onClick={clearDisplay} />
              </div>
              <div className="col ">
                <div id="display">{state.display}</div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <Button id="seven" onClick={setDisplay} />
              </div>
              <div className="col">
                <Button id="eight" onClick={setDisplay} />
              </div>
              <div className="col">
                <Button id="nine" onClick={setDisplay} />
              </div>
              <div className="col">
                <Button id="add" onClick={setDisplay} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <Button id="four" onClick={setDisplay} />
              </div>
              <div className="col">
                <Button id="five" onClick={setDisplay} />
              </div>
              <div className="col">
                <Button id="six" onClick={setDisplay} />
              </div>
              <div className="col">
                <Button id="subtract" onClick={setDisplay} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <Button id="one" onClick={setDisplay} />
              </div>
              <div className="col">
                <Button id="two" onClick={setDisplay} />
              </div>
              <div className="col">
                <Button id="three" onClick={setDisplay} />
              </div>
              <div className="col">
                <Button id="divide" onClick={setDisplay} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <Button id="zero" onClick={setDisplay} />
              </div>
              <div className="col">
                <Button id="decimal" onClick={setDisplay} />
              </div>
              <div className="col">
                <Button id="equals" onClick={caculate} />
              </div>
              <div className="col">
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

import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StrictMode, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { padStart } from 'es-toolkit/compat';
import { useInterval } from 'ahooks';

interface LengthButtonsProps {
  id: string;
  value: number;
  disabled: boolean;
  onChange: (change: number) => void;
}

function LengthButtons(props: LengthButtonsProps) {
  return (
    <div className="btn-group btn-group-sm" role="group">
      <button
        disabled={props.disabled}
        onClick={() => {
          if (props.value > 0) {
            props.onChange(-1);
          }
        }}
        id={`${props.id}-decrement`}
        type="button"
        className="btn btn-outline-primary"
      >
        <i className="bi bi-arrow-down"></i>
      </button>
      <button id={`${props.id}-length`} type="button" className="btn btn-outline-primary">
        <b>{props.value}</b>
      </button>
      <button
        disabled={props.disabled}
        onClick={() => {
          if (props.value < 60) {
            props.onChange(+1);
          }
        }}
        id={`${props.id}-increment`}
        type="button"
        className="btn btn-outline-primary"
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </div>
  );
}

function App() {
  const defaultState = {
    breaking: false,
    running: false,
    paused: false,
    beakTime: 5,
    sessionTime: 25,
    timeLeft: 25 * 60,
  };

  const [state, setState] = useState(defaultState);

  useInterval(() => {
    setState((state) => {
      const draft = structuredClone(state);

      if (draft.running && !draft.paused && draft.timeLeft) {
        draft.timeLeft -= 1;
      }

      return draft;
    });
  }, 1000);

  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft - minutes * 60;

  const formatedTimeLeft = `${padStart(String(minutes), 2, '0')}:${padStart(String(seconds), 2, '0')}`;

  console.log({ ...state, minutes, seconds });

  return (
    <section id="drum-machine" className="d-flex justify-content-center pt-5">
      <div className="card">
        <h5 className="card-header text-center">25 + 5 Clock</h5>
        <div className="card-body">
          <div className="row mb-4 text-center">
            <div className="col-6">
              <div id="break-label">Break Length</div>
              <LengthButtons
                id="break"
                disabled={state.running}
                value={state.beakTime}
                onChange={(change) => {
                  setState((state) => {
                    const draft = structuredClone(state);

                    draft.beakTime += change;

                    return draft;
                  });
                }}
              />
            </div>
            <div className="col-6">
              <div id="session-label">Session Length</div>
              <LengthButtons
                id="session"
                disabled={state.running}
                value={state.sessionTime}
                onChange={(change) => {
                  setState((state) => {
                    const draft = structuredClone(state);

                    draft.sessionTime += change;
                    draft.timeLeft = draft.sessionTime * 60;

                    return draft;
                  });
                }}
              />
            </div>
          </div>

          <div className="alert alert-success text-center" role="alert">
            <h5 id="timer-label" className="alert-heading">
              Session
            </h5>
            <span id="time-left">{formatedTimeLeft}</span>
          </div>

          <div className="text-center">
            <div className="btn-group btn-group-sm" role="group">
              <button
                id="start_stop"
                type="button"
                className={clsx('btn', state.paused ? 'btn-success' : state.running ? 'btn-warning' : 'btn-success')}
                onClick={() => {
                  setState((state) => {
                    const draft = structuredClone(state);

                    if (draft.running) {
                      draft.paused = !draft.paused;
                    } else {
                      draft.running = true;
                    }

                    return draft;
                  });
                }}
              >
                {state.paused ? 'Resume' : state.running ? 'Pause' : 'Play'}
              </button>
              <button
                id="reset"
                onClick={() => {
                  setState(defaultState);
                }}
                type="button"
                className="btn btn-secondary"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
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

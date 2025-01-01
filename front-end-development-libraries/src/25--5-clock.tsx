import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StrictMode, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { padStart } from 'es-toolkit/compat';

interface LengthButtonsProps {
  id: string;
  defaultValue: number;
  disabled: boolean;
  onChange: (value: number) => void;
}

function LengthButtons(props: LengthButtonsProps) {
  const [state, setState] = useState({ value: props.defaultValue });

  return (
    <div className="btn-group btn-group-sm" role="group">
      <button
        disabled={props.disabled}
        onClick={() => {
          setState((state) => {
            const draft = structuredClone(state);

            if (draft.value === 0) {
              return draft;
            }

            draft.value--;

            return draft;
          });

          props.onChange(state.value);
        }}
        id={`${props.id}-decrement`}
        type="button"
        className="btn btn-outline-primary"
      >
        <i className="bi bi-arrow-down"></i>
      </button>
      <button id={`${props.id}-length`} type="button" className="btn btn-outline-primary">
        <b>{state.value}</b>
      </button>
      <button
        disabled={props.disabled}
        onClick={() => {
          setState((state) => {
            const draft = structuredClone(state);

            if (draft.value === 60) {
              return draft;
            }

            draft.value++;

            return draft;
          });

          props.onChange(state.value);
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
    timeLeft: 0,
  };

  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const interval = setInterval(() => {
      setState((state) => {
        const draft = structuredClone(state);

        if (draft.running && !draft.paused && draft.timeLeft) {
          draft.timeLeft -= 1;
        }

        return draft;
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const minutes = Math.floor(state.timeLeft / 60) || state.sessionTime;
  const seconds = state.timeLeft ? (state.timeLeft - minutes * 60) : 0;

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
                defaultValue={state.beakTime}
                onChange={(value) => {
                  setState((state) => {
                    return { ...state, sessionTime: value };
                  });
                }}
              />
            </div>
            <div className="col-6">
              <div id="session-label">Session Length</div>
              <LengthButtons
                id="session"
                disabled={state.running}
                defaultValue={state.sessionTime}
                onChange={(value) => {
                  setState((state) => {
                    return { ...state, sessionTime: value };
                  });
                }}
              />
            </div>
          </div>

          <div className="alert alert-success text-center" role="alert">
            <h5 id="timer-label" className="alert-heading">
              Session
            </h5>
            <span id="time-left">
              {padStart(String(minutes), 2, '0')}:{padStart(String(seconds), 2, '0')}
            </span>
          </div>

          <div className="text-center">
            <div className="btn-group btn-group-sm" role="group">
              <button
                id="start_stop"
                type="button"
                className={clsx('btn', state.paused ? 'btn-success': state.running ? 'btn-warning' : 'btn-success')}
                onClick={() => {
                  setState((state) => {
                    const draft = structuredClone(state);

                    if (draft.running) {
                      draft.paused = !draft.paused;
                    } else {
                      draft.running = true;
                    }

                    // on start
                    if (draft.timeLeft === 0) {
                      draft.timeLeft = draft.sessionTime * 60;
                    }

                    return draft;
                  });
                }}
              >
                {state.paused ? 'Resume': state.running ? 'Pause' : 'Play'}
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

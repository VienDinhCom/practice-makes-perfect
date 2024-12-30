import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

interface PadProps {
  code: 'q' | 'w' | 'e' | 'a' | 's' | 'd' | 'z' | 'x' | 'c';
  onClick: (lable: string) => void;
}

function Pad(props: PadProps) {
  const audio = (() => {
    switch (props.code) {
      case 'q':
        return {
          src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3',
          label: 'Heater 1',
        };

      case 'w':
        return {
          src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3',
          label: 'Heater 2',
        };

      case 'e':
        return {
          src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3',
          label: 'Heater 3',
        };

      case 'a':
        return {
          src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3',
          label: 'Heater 4',
        };

      case 's':
        return {
          src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3',
          label: 'Clap',
        };

      case 'd':
        return {
          src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3',
          label: 'Open-HH',
        };

      case 'z':
        return {
          src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3',
          label: "Kick-n'-Hat",
        };

      case 'x':
        return {
          src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3',
          label: 'Kick',
        };

      case 'c':
        return {
          src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3',
          label: 'Closed-HH',
        };

      default:
        throw new Error('code is not valid');
    }
  })();

  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useHotkeys(props.code, () => {
    buttonRef.current?.click();
  });

  return (
    <button
      id={`drum-pad-${props.code}`}
      className="btn btn-primary drum-pad"
      ref={buttonRef}
      onClick={() => {
        props.onClick(audio.label);
        audioRef.current?.play();
      }}
    >
      {props.code.toUpperCase()}
      <audio id={props.code.toUpperCase()} className="clip" ref={audioRef} src={audio.src} />
    </button>
  );
}

function App() {
  const [state, setState] = useState({ label: 'Ready' });

  return (
    <section id="drum-machine" className="d-flex justify-content-center pt-5">
      <div className="card">
        <h5 className="card-header text-center">Drum Machine</h5>
        <div className="card-body">
          <div className="container text-center">
            <div className="row mb-4">
              <div className="col">
                <Pad code="q" onClick={(label) => setState((state) => ({ ...state, label }))} />
              </div>
              <div className="col">
                <Pad code="w" onClick={(label) => setState((state) => ({ ...state, label }))} />
              </div>
              <div className="col">
                <Pad code="e" onClick={(label) => setState((state) => ({ ...state, label }))} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <Pad code="a" onClick={(label) => setState((state) => ({ ...state, label }))} />
              </div>
              <div className="col">
                <Pad code="s" onClick={(label) => setState((state) => ({ ...state, label }))} />
              </div>
              <div className="col">
                <Pad code="d" onClick={(label) => setState((state) => ({ ...state, label }))} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Pad code="z" onClick={(label) => setState((state) => ({ ...state, label }))} />
              </div>
              <div className="col">
                <Pad code="x" onClick={(label) => setState((state) => ({ ...state, label }))} />
              </div>
              <div className="col">
                <Pad code="c" onClick={(label) => setState((state) => ({ ...state, label }))} />
              </div>
            </div>
          </div>
        </div>
        <div id="display" className="card-footer text-center">
          {state.label}
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

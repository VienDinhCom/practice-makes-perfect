import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode, useRef, useState } from 'react';
import useSound from 'use-sound';
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

  const [play] = useSound(audio.src);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useHotkeys(props.code, () => {
    buttonRef.current?.click();
  });

  return (
    <button
      ref={buttonRef}
      onClick={() => {
        play();
        props.onClick(audio.label);
      }}
    >
      {props.code.toUpperCase()}
    </button>
  );
}

function App() {
  const [state, setState] = useState({ label: '' });

  return (
    <section className="d-flex justify-content-center pt-5">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Pad code="q" onClick={(label) => setState((state) => ({ ...state, label }))} />
    </section>
  );
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')!
);

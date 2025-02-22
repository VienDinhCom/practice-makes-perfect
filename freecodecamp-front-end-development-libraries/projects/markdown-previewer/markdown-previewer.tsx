import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode, useState } from 'react';
import { marked } from 'marked';

interface EditorProps {
  defaultText: string;
  className?: string;
  onChange: (text: string) => void;
}

function Editor(props: EditorProps) {
  const [state, setState] = useState({ text: props.defaultText });

  return (
    <textarea
      id="editor"
      className={`border p-3 ` + props.className}
      value={state.text}
      onChange={(event) => {
        setState({ ...state, text: event.target.value });
        props.onChange(event.target.value);
      }}
    ></textarea>
  );
}

interface PreviewerProps {
  text: string;
  className?: string;
}

function Previewer(props: PreviewerProps) {
  return (
    <div
      id="preview"
      className={`overflow-x-auto border p-3 ` + props.className}
      dangerouslySetInnerHTML={{ __html: marked.parse(props.text, { breaks: true }) }}
    ></div>
  );
}

const defaultText = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`.trim();

function App() {
  const [state, setState] = useState({ text: defaultText });

  return (
    <section className="w-100 p-5">
      <div className="card">
        <div className="card-header">Markdown Previewer</div>
        <div className="card-body d-flex flex-1">
          <Editor
            className="w-50"
            defaultText={state.text}
            onChange={(text) => {
              setState({ ...state, text });
            }}
          />
          <Previewer className="w-50" text={state.text} />
        </div>
        <a
          className="btn border-top"
          href="https://github.com/VienDinhCom/practice-makes-perfect/tree/main/freecodecamp-front-end-development-libraries/projects/markdown-previewer"
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

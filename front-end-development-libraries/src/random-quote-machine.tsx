import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode, useEffect, useState } from 'react';

interface Quote {
  quote: string;
  author: string;
}

async function getQuotes(): Promise<Quote[]> {
  const url =
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

  const res = await fetch(url);

  const { quotes } = await res.json();

  return quotes;
}

interface State {
  quotes: Quote[];
  loading: boolean;
  error: boolean;
  randomIndex: number;
}

function App() {
  const [state, setState] = useState<State>({
    quotes: [],
    loading: true,
    error: false,
    randomIndex: 0,
  });

  useEffect(() => {
    getQuotes()
      .then((quotes) => {
        setState((state) => {
          const draft = structuredClone(state);

          draft.quotes = quotes;
          draft.loading = false;

          return draft;
        });
      })
      .catch(() => {
        setState((state) => {
          const draft = structuredClone(state);

          draft.loading = false;
          draft.error = true;

          return draft;
        });
      });
  }, []);

  const quote = state.quotes[state.randomIndex] || {};

  if (state.loading)
    return (
      <div className="alert alert-warning text-center" role="alert">
        Loading...
      </div>
    );

  if (state.error)
    return (
      <div className="alert alert-danger text-center" role="alert">
        Can't get quotes
      </div>
    );

  return (
    <section className="d-flex justify-content-center pt-5">
      <div id="quote-box" className="card w-50">
        <div className="card-header">Random Quote Machine</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p id="text">{quote.quote}</p>
            <footer id="author" className="blockquote-footer">
              {quote.author}
            </footer>
          </blockquote>
        </div>

        <div className="card-footer text-body-secondary d-flex justify-content-between">
          <div>
            <a
              id="tweet-quote"
              className="btn"
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
                `"${quote.quote}" __${quote.author}`
              )}`}
            >
              Twitter
            </a>
            <a
              id="tumblr-quote"
              className="btn"
              href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(
                quote.author
              )}&content=${encodeURIComponent(
                quote.quote
              )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
            >
              Tumblr
            </a>
          </div>
          <div>
            <button
              className="btn btn-primary"
              id="new-quote"
              onClick={() => {
                setState((state) => {
                  const draft = structuredClone(state);

                  draft.randomIndex = Math.floor(Math.random() * draft.quotes.length);

                  return draft;
                });
              }}
            >
              New Quote
            </button>
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

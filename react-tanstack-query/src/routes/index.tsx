import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>React Tanstack Query</h3>
      <ol>
        <li>
          <Link to="/01-setup">Setup</Link>
        </li>
        <li>
          <Link to="/02-basic-queries">Basic Queries</Link>
        </li>
        <li>
          <Link to="/03-query-loading-state">Query Loading State</Link>
        </li>
        <li>
          <Link to="/04-query-error-state">Query Error State</Link>
        </li>
        <li>
          <Link to="/05-devtools">Devtools</Link>
        </li>
        <li>
          <Link to="/06-window-focus">Window Focus</Link>
        </li>
        <li>
          <Link to="/07-refetching-indicators">Refetching Indicators</Link>
        </li>
        <li>
          <Link to="/08-stale-time">Stale Time</Link>
        </li>
        <li>
          <Link to="/09-cache-time">Cache Time</Link>
        </li>
        <li>
          <Link to="/10-keys-and-caching">Keys and Caching</Link>
        </li>
        <li>
          <Link to="/11-reuse-queries">Reuse Queries</Link>
        </li>
        <li>
          <Link to="/12-parallel-queries">Parallel Queries</Link>
        </li>
        <li>
          <Link to="/13-props-and-state">Props and State</Link>
        </li>
        <li>
          <Link to="/14-disabling-queries">Disabling Queries</Link>
        </li>
        <li>
          <Link to="/15-multipart-query-keys">Multipart Query Keys</Link>
        </li>
        <li>
          <Link to="/16-query-retries">Query Retries</Link>
        </li>
        <li>
          <Link to="/17-query-cancellation">Query Cancellation</Link>
        </li>
        <li>
          <Link to="/18-dependent-queries">Dependent Queries</Link>
        </li>
        <li>
          <Link to="/19-initial-data">Initial Data</Link>
        </li>
        <li>
          <Link to="/20-related-lists-and-items">Related Lists and Items</Link>
        </li>
      </ol>
    </div>
  );
}

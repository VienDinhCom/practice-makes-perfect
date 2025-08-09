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
          <Link to="/20-initial-data-as-stale">Initial Data as Stale</Link>
        </li>
        <li>
          <Link to="/21-related-lists-and-items">Related Lists and Items</Link>
        </li>
        <li>
          <Link to="/22-seeding-initial-data-from-other-queries">
            Seeding Initial Data from Other Queries
          </Link>
        </li>
        <li>
          <Link to="/23-seeding-future-queries">
            Seeding Initial Data for Future Queries
          </Link>
        </li>
        <li>
          <Link to="/24-query-side-effects">Query Side Effects</Link>
        </li>
        <li>
          <Link to="/25-scroll-restoration">Scroll Restoration</Link>
        </li>
        <li>
          <Link to="/26-refetch-intervals">Refetching Intervals</Link>
        </li>
        <li>
          <Link to="/27-invalidation-basics">Invalidation Basics</Link>
        </li>
        <li>
          <Link to="/28-invalidating-without-refetching-active-queries">
            Invalidating without Refetching Active Queries
          </Link>
        </li>
        <li>
          <Link to="/29-invalidating-and-refetching-inactive-queries">
            Invalidating and Refetching Inactive Queries
          </Link>
        </li>
        <li>
          <Link to="/30-invalidating-multiple-queries-with-similar-query-keys">
            Invalidating Multiple Queries with Similar Query Keys
          </Link>
        </li>
        <li>
          <Link to="/31-basic-query-prefetching">Basic Query Prefetching</Link>
        </li>
        <li>
          <Link to="/32-hover-based-query-prefetching">
            Hover-based Query Prefetching
          </Link>
        </li>
        <li>
          <Link to="/33-prefetching-and-stale-time">
            Prefetching and Stale Time
          </Link>
        </li>
        <li>
          <Link to="/34-forced-prefetching">
            Forced Prefetching and Cache Time
          </Link>
        </li>
        <li>
          <Link to="/35-mutations-overview">Mutations Overview</Link>
        </li>
        <li>
          <Link to="/36-mutations-with-the-usemutation-hook">
            Mutations with the useMutation Hook
          </Link>
        </li>
        <li>
          <Link to="/37-mutation-side-effects">Mutation Side Effects</Link>
        </li>
        <li>
          <Link to="/38-updating-query-data-with-mutation-responses">
            Updating Query Data with Mutation Responses
          </Link>
        </li>
        <li>
          <Link to="/39-optimistic-updates-for-list-like-queries">
            Optimistic Updates for List-like Queries
          </Link>
        </li>
      </ol>
    </div>
  );
}

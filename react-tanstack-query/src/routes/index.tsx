import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const lessons = [
    { path: "/01-setup", title: "Setup" },
    { path: "/02-basic-queries", title: "Basic Queries" },
    { path: "/03-query-loading-state", title: "Query Loading State" },
    { path: "/04-query-error-state", title: "Query Error State" },
    { path: "/05-devtools", title: "Devtools" },
    { path: "/06-window-focus", title: "Window Focus" },
    { path: "/07-refetching-indicators", title: "Refetching Indicators" },
    { path: "/08-stale-time", title: "Stale Time" },
    { path: "/09-cache-time", title: "Cache Time" },
    { path: "/10-keys-and-caching", title: "Keys and Caching" },
    { path: "/11-reuse-queries", title: "Reuse Queries" },
    { path: "/12-parallel-queries", title: "Parallel Queries" },
    { path: "/13-props-and-state", title: "Props and State" },
    { path: "/14-disabling-queries", title: "Disabling Queries" },
    { path: "/15-multipart-query-keys", title: "Multipart Query Keys" },
    { path: "/16-query-retries", title: "Query Retries" },
    { path: "/17-query-cancellation", title: "Query Cancellation" },
    { path: "/18-dependent-queries", title: "Dependent Queries" },
    { path: "/19-initial-data", title: "Initial Data" },
    { path: "/20-initial-data-as-stale", title: "Initial Data as Stale" },
    { path: "/21-related-lists-and-items", title: "Related Lists and Items" },
    {
      path: "/22-seeding-initial-data-from-other-queries",
      title: "Seeding Initial Data from Other Queries",
    },
    {
      path: "/23-seeding-future-queries",
      title: "Seeding Initial Data for Future Queries",
    },
    { path: "/24-query-side-effects", title: "Query Side Effects" },
    { path: "/25-scroll-restoration", title: "Scroll Restoration" },
    { path: "/26-refetch-intervals", title: "Refetching Intervals" },
    { path: "/27-invalidation-basics", title: "Invalidation Basics" },
    {
      path: "/28-invalidating-without-refetching-active-queries",
      title: "Invalidating without Refetching Active Queries",
    },
    {
      path: "/29-invalidating-and-refetching-inactive-queries",
      title: "Invalidating and Refetching Inactive Queries",
    },
    {
      path: "/30-invalidating-multiple-queries-with-similar-query-keys",
      title: "Invalidating Multiple Queries with Similar Query Keys",
    },
    { path: "/31-basic-query-prefetching", title: "Basic Query Prefetching" },
    {
      path: "/32-hover-based-query-prefetching",
      title: "Hover-based Query Prefetching",
    },
    {
      path: "/33-prefetching-and-stale-time",
      title: "Prefetching and Stale Time",
    },
    {
      path: "/34-forced-prefetching",
      title: "Forced Prefetching and Cache Time",
    },
    { path: "/35-mutations-overview", title: "Mutations Overview" },
    {
      path: "/36-mutations-with-the-usemutation-hook",
      title: "Mutations with the useMutation Hook",
    },
    { path: "/37-mutation-side-effects", title: "Mutation Side Effects" },
    {
      path: "/38-updating-query-data-with-mutation-responses",
      title: "Updating Query Data with Mutation Responses",
    },
    {
      path: "/39-optimistic-updates-for-list-like-queries",
      title: "Optimistic Updates for List-like Queries",
    },
    {
      path: "/40-rollbacks-for-list-like-queries",
      title: "Rollbacks for List-like Queries",
    },
    {
      path: "/41-optimistic-updates-for-single-entity-queries",
      title: "Optimistic Updates for Single-Entity Queries",
    },
    {
      path: "/42-rollbacks-for-single-entity-queries",
      title: "Rollbacks for Single-Entity Queries",
    },
    { path: "/43-paginated-queries", title: "Paginated Queries" },
    {
      path: "/44-prefetching-paginated-queries",
      title: "Prefetching Paginated Queries",
    },
    { path: "/45-infinite-queries", title: "Infinite Queries" },
  ];

  return (
    <div className="page">
      <h1>React TanStack Query Tutorials</h1>
      <div className="grid">
        {lessons.map((lesson, i) => (
          <Link key={lesson.path} to={lesson.path} className="card">
            <span className="number">{String(i + 1).padStart(2, "0")}</span>
            <span className="title">{lesson.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

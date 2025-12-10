interface Props {
  is404?: boolean;
}

export function PageError({ is404 }: Props) {
  const code = is404 ? '404' : '500';
  const title = is404 ? 'Page Not Found' : 'Internal Error';
  const message = is404
    ? "Oops! The page you're looking for can't be found. Please try again later."
    : 'Sorry, something went wrong and the website is not working properly.';

  return (
    <main className="flex h-screen items-start justify-center px-3 pt-40">
      <div className=" text-center">
        <p className="mb-4 text-base font-semibold text-primary">{code}</p>
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mb-6 text-base leading-7">{message}</p>
        <div className="flex items-center justify-center gap-x-6">
          <a href="/" className="btn">
            Go back home
          </a>
          <button className="btn" onClick={() => window.location.reload()}>
            Reload the page
          </button>
        </div>
      </div>
    </main>
  );
}

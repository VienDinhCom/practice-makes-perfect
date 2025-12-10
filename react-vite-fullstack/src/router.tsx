import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/layouts/AppLayout';
import { PageError } from './components/common/PageError';

import '@app/assets/style.css';

// https://omarelhawary.me/blog/file-based-routing-with-react-router

const imports = Object.entries(import.meta.glob('./pages/**/[a-z[]*.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <PageError is404 />,
    children: imports.map(([path, page]) => ({
      path: path
        .replace(/\.\/pages|index|\.tsx$/g, '')
        .replace(/\[\.{3}.+\]/, '*')
        .replace(/\[(.+)\]/, ':$1'),
      async lazy() {
        return { Component: await page().then(({ Page }: any) => Page) };
      },
    })),
  },
]);

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

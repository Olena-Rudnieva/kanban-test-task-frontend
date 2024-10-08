import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from '../loader';
import { Header } from '../header';

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

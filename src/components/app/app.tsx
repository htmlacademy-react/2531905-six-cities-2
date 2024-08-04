import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {AppRoute} from '@/constants';

import Main from '@/pages/main/main';
import Favorites from '@/pages/favorites/favorites';
import Login from '@/pages/login/login';
import PrivateRoute from '@/components/private-route/private-route';
import ErrorBoundary from '@/components/error-boundary/error-boundary';

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: AppRoute.MainPage,
      element: <Main />,
      errorElement: <ErrorBoundary />
    },
    {
      path: AppRoute.LoginPage,
      element: <Login />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: AppRoute.FavoritesPage,
      errorElement: <ErrorBoundary />,
      element:
        <PrivateRoute>
          <Favorites />
        </PrivateRoute>,
    },
    {
      path: `${AppRoute.OfferPage}`,
      errorElement: <ErrorBoundary />,
      async lazy() {
        const { Offer } = await import('@/pages/offer/offer');
        return { Component: Offer };
      },
    },
    {
      path: AppRoute.NotFoundPage,
      errorElement: <ErrorBoundary />,
      async lazy() {
        const { NotFound } = await import('@/pages/not-found/not-found');
        return { Component: NotFound };
      },
    },
    {
      path: AppRoute.DefaultPage,
      errorElement: <ErrorBoundary />,
      async lazy() {
        const { NotFound } = await import('@/pages/not-found/not-found');
        return { Component: NotFound };
      },
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;

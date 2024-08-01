import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {AppRoute} from '@/constants';

import Main from '@/pages/main/main';
import Favorites from '@/pages/favorites/favorites';
import Login from '@/pages/login/login';
import PrivateRoute from '@/components/private-route/private-route';

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: AppRoute.MainPage,
      element: <Main />,
    },
    {
      path: AppRoute.LoginPage,
      element: <Login />,
    },
    {
      path: AppRoute.FavoritesPage,
      element:
        <PrivateRoute>
          <Favorites />
        </PrivateRoute>,
    },
    {
      path: `${AppRoute.OfferPage}`,
      async lazy() {
        const { Offer } = await import('@/pages/offer/offer');
        return { Component: Offer };
      },
    },
    {
      path: AppRoute.NotFoundPage,
      async lazy() {
        const { NotFound } = await import('@/pages/not-found/not-found');
        return { Component: NotFound };
      },
    },
    {
      path: AppRoute.DefaultPage,
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

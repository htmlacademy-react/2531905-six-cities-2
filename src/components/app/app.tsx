import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {AppRoute} from '@/constants';

import Main from '@/pages/main/main';
import Favorites from '@/pages/favorites/favorites';
import Login from '@/pages/login/login';
import Offer from '@/pages/offer/offer';
import NotFound from '@/pages/not-found/not-found';
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
      element: <Offer />,
    },
    {
      path: AppRoute.NotFoundPage,
      element: <NotFound />,
    },
    {
      path: AppRoute.DefaultPage,
      element: <NotFound />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;

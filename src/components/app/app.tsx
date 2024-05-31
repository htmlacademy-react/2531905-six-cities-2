import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '@/constants';
import {OfferListItem} from '@/types';

import Main from '@/pages/main/main';
import Favorites from '@/pages/favorites/favorites';
import Login from '@/pages/login/login';
import Offer from '@/pages/offer/offer';
import NotFound from '@/pages/not-found/not-found';
import PrivateRoute from '@/components/private-route/private-route';

type AppProps = {
  offers: OfferListItem[];
}

function App({offers}: AppProps): JSX.Element {
  const router = createBrowserRouter([
    {
      path: AppRoute.MainPage,
      element: <Main offers={offers} />,
    },
    {
      path: AppRoute.LoginPage,
      element: <Login />,
    },
    {
      path: AppRoute.FavoritesPage,
      element:
        <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
          <Favorites />
        </PrivateRoute>,
    },
    {
      path: `${AppRoute.OfferPage}/:id`,
      element: <Offer />,
    },
    {
      path: AppRoute.NotFoundPage,
      element: <NotFound />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;

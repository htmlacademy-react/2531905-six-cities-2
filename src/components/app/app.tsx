import {Route, BrowserRouter, Routes} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../constants';
import {OfferListItem} from '../../types';

import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offers: OfferListItem[];
}

function App({offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.MainPage}
          element={<Main offers={offers} />}
        />
        <Route
          path={AppRoute.LoginPage}
          element={<Login />}
        />
        <Route
          path={AppRoute.FavoritesPage}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.OfferPage}/:id`}
          element={<Offer />}
        />
        <Route
          path={AppRoute.NotFoundPage}
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

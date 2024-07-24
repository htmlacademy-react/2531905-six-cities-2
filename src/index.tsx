import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';

import {store} from './store';
import {checkAuth} from '@/store/user/api-actions';
import {loadOffers} from '@/store/offers/api-actions';

await store.dispatch(checkAuth());
store.dispatch(loadOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/app';
import { store } from './store/store';
import { fetchQuestsAction, checkAuthAction } from './store/api-actions';
import { getToken } from './services/token';
import { changeAuthorizationStatus } from './store/user-slice/user-slice';

const token = getToken();

if (token !== '') {
  store.dispatch(checkAuthAction());
} else {
  store.dispatch(changeAuthorizationStatus());
}

store.dispatch(fetchQuestsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App></App>
    </Provider>
  </React.StrictMode>
);

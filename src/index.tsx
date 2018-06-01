// Application styles must come first in order, to allow for overrides
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { store } from './ducks';

const appEl = document.getElementById('app');
render(<App store={store}/>, appEl);

// Hot reload
if ((module as any).hot) {
  (module as any).hot.accept('./ducks/reducer', () => {
    store.replaceReducer(require('./ducks/reducer'));
  });

  (module as any).hot.accept('./App', () => {
    render(<App store={store}/>, appEl);
  });
}

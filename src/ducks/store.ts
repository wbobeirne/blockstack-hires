import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import { handleLogin } from './blockstack/actions';
import { getUser } from './blockstack/selectors';

// Compose middleware
let middleware = applyMiddleware(thunk);
if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(middleware);
}

// Create store
const store = createStore(reducer, {}, middleware);
export const persistor = persistStore(store, null, () => {
  const state = store.getState();
  if (!getUser(state)) {
    store.dispatch(handleLogin());
  }
});

export default store;

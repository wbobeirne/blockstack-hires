import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

let middleware = applyMiddleware(thunk);
if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(middleware);
}

export default createStore(reducer, {}, middleware);

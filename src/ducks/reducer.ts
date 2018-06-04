import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import blockstack, { State as BlockstackState } from './blockstack/reducer';

export interface ReduxState {
  blockstack: BlockstackState;
}

export default combineReducers<ReduxState>({
  blockstack: persistReducer({
    key: 'blockstack',
    storage
  }, blockstack)
});

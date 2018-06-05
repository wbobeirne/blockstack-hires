import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user, { State as UserState } from './user/reducer';
import resume, { State as ResumeState } from './resume/reducer';

export interface ReduxState {
  user: UserState;
  resume: ResumeState;
}

export default combineReducers<ReduxState>({
  user: persistReducer({
    key: 'user',
    storage
  }, user),
  resume
});

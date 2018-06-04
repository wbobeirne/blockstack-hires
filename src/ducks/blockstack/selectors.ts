import { ReduxState } from 'ducks';

export function getIsLoggingIn(state: ReduxState) {
  return state.blockstack.isLoggingIn;
}

export function getUser(state: ReduxState) {
  return state.blockstack.user;
}

export function getUserProfile(state: ReduxState) {
  return getUser(state) ? getUser(state).profile : null;
}

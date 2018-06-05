import { ReduxState } from 'ducks';

export function getIsLoggingIn(state: ReduxState) {
  return state.user.isLoggingIn;
}

export function getUser(state: ReduxState) {
  return state.user.user;
}

export function getUserProfile(state: ReduxState) {
  return getUser(state) ? getUser(state).profile : null;
}

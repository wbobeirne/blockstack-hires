import { ReduxState } from 'ducks';

export function getResume(state: ReduxState, username: string) {
  return state.resume.resumes[username];
}

export function getUserResume(state: ReduxState) {
  return state.resume.userResume;
}

export function getIsSavingResume(state: ReduxState) {
  return state.resume.isSavingResume;
}

export function getSaveError(state: ReduxState) {
  return state.resume.saveError;
}

export function getIsFetchingResume(state: ReduxState) {
  return state.resume.isFetchingResume;
}

export function getFetchError(state: ReduxState) {
  return state.resume.fetchError;
}

import { Dispatch } from 'redux';
import { ReduxState } from 'ducks';
import { getFile, putFile } from 'blockstack';
import { TypeKeys, ResumeAction, Resume } from './types';
import { getUser } from 'ducks/user/selectors';

const RESUME_PATH = 'resume';

export function saveResume(resume: Resume) {
  return function (dispatch: Dispatch<ResumeAction, ReduxState>) {
    dispatch({ type: TypeKeys.SAVE });

    putFile(RESUME_PATH, JSON.stringify(resume), { encrypt: false })
      .then(() => {
        dispatch({
          type: TypeKeys.SAVE_SUCCESS,
          payload: resume,
        });
      })
      .catch(() => {
        dispatch({
          type: TypeKeys.SAVE_FAILURE,
          payload: 'Failed to save your resume',
        });
      });
  }
}

export function saveResumeLocal(resume: Resume) {
  return {
    type: TypeKeys.SAVE_LOCAL,
    payload: resume,
  };
}

export function fetchResume(username?: string) {
  return function (dispatch: Dispatch<ResumeAction, ReduxState>, getState: () => ReduxState) {
    const state = getState();

    dispatch({ type: TypeKeys.FETCH });

    if (!username && !getUser(state)) {
      dispatch({
        type: TypeKeys.FETCH_FAILURE,
        payload: 'Must be logged in to view this resume',
      });
      return;
    }

    getFile(RESUME_PATH, {
      decrypt: false,
      username: username,
    })
      .then((res: string) => {
        const resume = res ? JSON.parse(res) as Resume : {};
        dispatch({
          type: TypeKeys.FETCH_SUCCESS,
          payload: {
            resume,
            username,
          }
        });
      })
      .catch(() => {
        dispatch({
          type: TypeKeys.FETCH_FAILURE,
          payload: 'Failed to fetch resume',
        })
      });
  }
}

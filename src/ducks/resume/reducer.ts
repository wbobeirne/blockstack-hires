import { TypeKeys, ResumeAction, Resume } from './types';

export interface State {
  userResume: Resume | null;
  resumes: { [key: string]: Resume };
  isSavingResume: boolean;
  saveError: string | null;
  isFetchingResume: boolean;
  fetchError: string | null;
}

export const INITIAL_STATE: State = {
  userResume: null,
  resumes: {},
  isSavingResume: false,
  saveError: null,
  isFetchingResume: false,
  fetchError: null,
}

export default function userReducer(
  state: State = INITIAL_STATE,
  action: ResumeAction,
): State {
  switch (action.type) {
    case TypeKeys.SAVE:
      return {
        ...state,
        saveError: null,
        isSavingResume: true,
      };

    case TypeKeys.SAVE_SUCCESS:
      return {
        ...state,
        userResume: action.payload,
        isSavingResume: false,
      };

    case TypeKeys.SAVE_FAILURE:
      return {
        ...state,
        saveError: action.payload,
        isSavingResume: false,
      };

    case TypeKeys.FETCH:
      return {
        ...state,
        fetchError: null,
        isFetchingResume: true,
      };

    case TypeKeys.FETCH_SUCCESS:
      return {
        ...state,
        resumes: action.payload.username ? {
          ...state.resumes,
          [action.payload.username]: action.payload.resume,
        } : state.resumes,
        userResume: !action.payload.username ? action.payload.resume : state.userResume,
        isFetchingResume: false,
      };

    case TypeKeys.FETCH_FAILURE:
      return {
        ...state,
        isFetchingResume: false,
        fetchError: action.payload,
      };
  }

  return state;
}

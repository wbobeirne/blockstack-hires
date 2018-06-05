import { TypeKeys, UserAction, User } from './types';

export interface State {
  isLoggingIn: boolean;
  user: User | null;
}

export const INITIAL_STATE: State = {
  isLoggingIn: false,
  user: null,
}

export default function userReducer(
  state: State = INITIAL_STATE,
  action: UserAction,
): State {
  switch (action.type) {
    case TypeKeys.LOGIN:
      return {
        ...state,
        isLoggingIn: true
      };

    case TypeKeys.HANDLE_LOGIN:
      return {
        ...state,
        isLoggingIn: true
      };

    case TypeKeys.HANDLE_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggingIn: false
      };

    case TypeKeys.HANDLE_LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false
      }

    case TypeKeys.LOGOUT:
      return {
        ...state,
        user: null
      };
  }

  return state;
}

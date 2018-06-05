import { Dispatch } from 'redux';
import { ReduxState } from 'ducks';
import { redirectToSignIn, handlePendingSignIn, signUserOut } from 'blockstack';
import { TypeKeys, UserAction, User } from './types';

export function login() {
  redirectToSignIn(undefined, undefined, ['store_write', 'publish_data']);
  return {
    type: TypeKeys.LOGIN
  };
}

export function handleLogin() {
  return function (dispatch: Dispatch<UserAction, ReduxState>) {
    dispatch({ type: TypeKeys.HANDLE_LOGIN });

    handlePendingSignIn()
      .then((user: User) => {
        dispatch({
          type: TypeKeys.HANDLE_LOGIN_SUCCESS,
          payload: user,
        });
      })
      .catch((err) => {
        dispatch({
          type: TypeKeys.HANDLE_LOGIN_FAILURE,
          payload: err,
        })
      });
  }
}

export function logout() {
  signUserOut();
  return {
    type: TypeKeys.LOGOUT
  };
}

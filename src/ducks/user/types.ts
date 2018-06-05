import { User as BlockstackUser, Profile as BlockstackProfile } from 'blockstack';

export enum TypeKeys {
  LOGIN = 'USER_LOGIN',
  HANDLE_LOGIN = 'USER_HANDLE_LOGIN',
  HANDLE_LOGIN_SUCCESS = 'USER_HANDLE_LOGIN_SUCCESS',
  HANDLE_LOGIN_FAILURE = 'USER_HANDLE_LOGIN_FAILURE',
  LOGOUT = 'USER_LOGOUT'
}

export interface Profile extends BlockstackProfile {};

export type User = BlockstackUser<Profile>;

export interface LoginAction {
  type: TypeKeys.LOGIN;
}


export interface HandleLoginAction {
  type: TypeKeys.HANDLE_LOGIN;
}

export interface HandleLoginSuccessAction {
  type: TypeKeys.HANDLE_LOGIN_SUCCESS;
  payload: User;
}

export interface HandleLoginFailureAction {
  type: TypeKeys.HANDLE_LOGIN_FAILURE;
  payload?: string;
}


export interface LogoutAction {
  type: TypeKeys.LOGOUT;
}

export type UserAction =
  | LoginAction
  | HandleLoginAction
  | HandleLoginSuccessAction
  | HandleLoginFailureAction
  | LogoutAction;

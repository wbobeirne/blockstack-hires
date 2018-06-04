import { User as BlockstackUser, Profile as BlockstackProfile } from 'blockstack';

export enum TypeKeys {
  LOGIN = 'BLOCKSTACK_LOGIN',
  HANDLE_LOGIN = 'BLOCKSTACK_HANDLE_LOGIN',
  HANDLE_LOGIN_SUCCESS = 'BLOCKSTACK_HANDLE_LOGIN_SUCCESS',
  HANDLE_LOGIN_FAILURE = 'BLOCKSTACK_HANDLE_LOGIN_FAILURE',
  LOGOUT = 'BLOCKSTACK_LOGOUT'
}

export interface Profile extends BlockstackProfile {

};

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

export type BlockstackAction =
  | LoginAction
  | HandleLoginAction
  | HandleLoginSuccessAction
  | HandleLoginFailureAction
  | LogoutAction;

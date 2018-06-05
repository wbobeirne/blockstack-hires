declare module 'blockstack' {
  // This is not exhaustive of the Blockstack API, only the functions used
  // in this application.
  export type Scope = 'store_write' | 'publish_data' | 'email';

  export interface Profile {
    '@context': 'http://schema.org',
    '@type': 'Person',
    name?: string;
  }

  export interface User<T = Profile> {
    appPrivateKey: string;
    authResponseToken: string;
    coreSessionToken: string | null;
    decentralizedID: string;
    hubUrl: string;
    identityAddress: string;
    username: string | null;
    profile: T;
  }

  // Auth
  export function redirectToSignIn(
    redirectURI?: string,
    manifestURI?: string,
    scopes?: Scope[]
  ): void;
  export function isSignInPending(): boolean;
  export function handlePendingSignIn(nameLookupURL?: string): Promise<User>;
  export function loadUserData(): any;
  export function isUserSignedIn(): boolean;
  export function signUserOut(redirectURL?: string): void;

  // File
  interface GetFileOptions {
    decrypt: boolean;
    username: string;
    app?: string;
    zoneFileLookupURL?: string;
  }
  export function getFile(path: string, options?: GetFileOptions);

  interface PutFileOptions {
    encrypt: boolean;
  }
  export function putFile(
    path: string,
    content: String | Buffer,
    options?: PutFileOptions,
  );
}

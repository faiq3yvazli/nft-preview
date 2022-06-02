import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SignInDto } from '../dtos/sign-in';
import { SignUpDto } from '../dtos/sign-up';
import { IUser } from '../types/user';
import { IAuthTokens } from '../types/auth-tokens';

export type AuthState = {
  isInitialized: boolean;
  isLoading: boolean;
  user: IUser | null;
  myAccountIsOpen: boolean;
};

export interface AuthActions {
  InitializePending: PayloadAction;
  InitializeFulfilled: PayloadAction<IUser | undefined>;
  InitializeRejected: PayloadAction<string>;
  SignInPending: PayloadAction<SignInDto>;
  SignInFulfilled: PayloadAction<IAuthTokens>;
  SignInRejected: PayloadAction<string>;
  SignUpPending: PayloadAction<SignUpDto>;
  SignUpFulfilled: PayloadAction<IAuthTokens>;
  SignUpRejected: PayloadAction<string>;
  SignedOut: PayloadAction;
  MyAccountOpened: PayloadAction;
  MyAccountClosed: PayloadAction;
}

export type AuthCaseReducer = {
  initializePending: CaseReducer<AuthState, AuthActions['InitializePending']>;
  initializeFulfilled: CaseReducer<AuthState, AuthActions['InitializeFulfilled']>;
  initializeRejected: CaseReducer<AuthState, AuthActions['InitializeRejected']>;
  signInPending: CaseReducer<AuthState, AuthActions['SignInPending']>;
  signInFulfilled: CaseReducer<AuthState, AuthActions['SignInFulfilled']>;
  signInRejected: CaseReducer<AuthState, AuthActions['SignInRejected']>;
  signUpPending: CaseReducer<AuthState, AuthActions['SignUpPending']>;
  signUpFulfilled: CaseReducer<AuthState, AuthActions['SignUpFulfilled']>;
  signUpRejected: CaseReducer<AuthState, AuthActions['SignUpRejected']>;
  signedOut: CaseReducer<AuthState, AuthActions['SignedOut']>;
  myAccountOpened: CaseReducer<AuthState, AuthActions['MyAccountOpened']>;
  myAccountClosed: CaseReducer<AuthState, AuthActions['MyAccountClosed']>;
};

export const authSlice = createSlice<AuthState, AuthCaseReducer, 'auth'>({
  name: 'auth',
  initialState: {
    isInitialized: false,
    isLoading: false,
    user: null,
    myAccountIsOpen: false,
  },
  reducers: {
    initializePending: (state) => {
      state.isLoading = true;
    },
    initializeFulfilled: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
      state.isLoading = false;
      state.isInitialized = true;
    },
    initializeRejected: (state) => {
      state.isLoading = false;
      state.isInitialized = true;
    },
    signInPending: () => {},
    signInFulfilled: () => {},
    signInRejected: () => {},
    signUpPending: () => {},
    signUpFulfilled: () => {},
    signUpRejected: () => {},
    signedOut: (state) => {
      state.user = null;
      state.myAccountIsOpen = false;
    },
    myAccountOpened: (state) => {
      state.myAccountIsOpen = true;
    },
    myAccountClosed: (state) => {
      state.myAccountIsOpen = false;
    },
  },
});

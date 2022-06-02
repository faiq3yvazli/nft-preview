import { createSelector, Selector } from '@reduxjs/toolkit';
import { RootState } from '@root/infra/store/types';

import type { AuthState } from './slice';
import type { IWalletAddress } from '../types/wallet';

const getState = (state: RootState) => state.auth;
const getSelf = (state: AuthState) => state;
const getIsInitialized = (state: AuthState) => state.isInitialized;
const getIsLoading = (state: AuthState) => state.isLoading;
const getUser = (state: AuthState) => state.user;
const getIsAuthed = (state: AuthState) => !!state.user;
const getWalletAddress = (state: AuthState) => state.user?.address;
const getMyAccountIsOpen = (state: AuthState) => state.myAccountIsOpen;

export const authSelector = {
  self: createSelector<[Selector<RootState, AuthState>], AuthState>([getState], getSelf),
  isInitialized: createSelector<[Selector<RootState, AuthState>], AuthState['isInitialized']>([getState], getIsInitialized),
  isLoading: createSelector<[Selector<RootState, AuthState>], AuthState['isLoading']>([getState], getIsLoading),
  isAuthed: createSelector<[Selector<RootState, AuthState>], AuthState['isLoading']>([getState], getIsAuthed),
  user: createSelector<[Selector<RootState, AuthState>], AuthState['user']>([getState], getUser),
  walletAddress: createSelector<[Selector<RootState, AuthState>], IWalletAddress | undefined>([getState], getWalletAddress),
  myAccountIsOpen: createSelector<[Selector<RootState, AuthState>], boolean>([getState], getMyAccountIsOpen),
};

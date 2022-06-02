import { createSelector, Selector } from '@reduxjs/toolkit';
import { RootState } from '@root/infra/store/types';

import { WhitelistState } from './slice';
import { AuthState } from '../slice';

const getState = (state: RootState) => state.whitelist;
const getAuthState = (state: RootState) => state.auth;
const getIsSubmitted = (state: AuthState) => !!state.user?.coupon;
const getIsSufficientFunds = (state: AuthState) => !!state.user?.coupon?.isSufficientFunds;
const getStatusIsRefreshing = (state: WhitelistState) => state.statusIsRefreshing;

export const whitelistSelector = {
  isSubmitted: createSelector<[Selector<RootState, AuthState>], boolean>([getAuthState], getIsSubmitted),
  statusIsRefreshing: createSelector<[Selector<RootState, WhitelistState>], boolean>([getState], getStatusIsRefreshing),
  isSufficientFunds: createSelector<[Selector<RootState, AuthState>], boolean>([getAuthState], getIsSufficientFunds),
};

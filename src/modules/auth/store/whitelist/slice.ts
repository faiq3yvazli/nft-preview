import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SubmitWalletAddressDto } from '../../dtos/submit-wallet-address';

export type WhitelistState = {
  isSubmitting: boolean;
  statusIsRefreshing: boolean;
};

export interface WhitelistActions {
  SubmitPending: PayloadAction<SubmitWalletAddressDto>;
  SubmitWalletAddressFulfilled: PayloadAction;
  SubmitWalletAddressRejected: PayloadAction<string>;
  RefreshWhitelistStatusPending: PayloadAction;
  RefreshWhitelistStatusFulfilled: PayloadAction;
  RefreshWhitelistStatusRejected: PayloadAction<string>;
}

export type WhitelistCaseReducer = {
  submitPending: CaseReducer<WhitelistState, WhitelistActions['SubmitPending']>;
  submitFulfilled: CaseReducer<WhitelistState, WhitelistActions['SubmitWalletAddressFulfilled']>;
  submitRejected: CaseReducer<WhitelistState, WhitelistActions['SubmitWalletAddressRejected']>;
  refreshStatusPending: CaseReducer<WhitelistState, WhitelistActions['RefreshWhitelistStatusPending']>;
  refreshStatusFulfilled: CaseReducer<WhitelistState, WhitelistActions['RefreshWhitelistStatusFulfilled']>;
  refreshStatusRejected: CaseReducer<WhitelistState, WhitelistActions['RefreshWhitelistStatusRejected']>;
};

export const whitelistSlice = createSlice<WhitelistState, WhitelistCaseReducer, 'whitelist'>({
  name: 'whitelist',
  initialState: {
    isSubmitting: false,
    statusIsRefreshing: false,
  },
  reducers: {
    submitPending: (state) => {
      state.isSubmitting = true;
    },
    submitFulfilled: (state) => {
      state.isSubmitting = false;
    },
    submitRejected: (state) => {
      state.isSubmitting = false;
    },
    refreshStatusPending: (state) => {
      state.statusIsRefreshing = true;
    },
    refreshStatusFulfilled: (state) => {
      state.statusIsRefreshing = false;
    },
    refreshStatusRejected: (state) => {
      state.statusIsRefreshing = false;
    },
  },
});

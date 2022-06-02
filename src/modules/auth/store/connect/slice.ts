import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { authSlice } from '../slice';
import type { IWallet, IWalletAddress, IWalletType } from '../../types/wallet';

export type ConnectState = {
  metaMask: {
    installExtensionAsked: boolean;
    appModalIsOpen: boolean;
  };
  signatureModalIsOpen: boolean;
  selectWalletIsOpen: boolean;
  signUpIsOpen: boolean;
  wallet: IWallet | null;
  signature: string | null;
};

export interface ConnectActions {
  SelectWalletOpened: PayloadAction;
  SelectWalletClosed: PayloadAction;
  MetaMaskAppModalOpened: PayloadAction;
  MetaMaskAppModalClosed: PayloadAction;
  SignUpOpened: PayloadAction;
  SignUpClosed: PayloadAction;
  ChangeWalletRequested: PayloadAction;
  WalletConnectionPending: PayloadAction<{
    walletType: IWalletType;
    address?: IWalletAddress;
    ssoToken?: string;
  }>;
  WalletConnectionFulfilled: PayloadAction<{ wallet: IWallet; signature: string; isNewUser: boolean; ssoToken?: string }>;
  WalletConnectionRejected: PayloadAction<string>;
  InstallMetaMaskExtensionAsked: PayloadAction;
  WrongNetworkSelected: PayloadAction<{ walletType: IWalletType }>;
  SignatureRequested: PayloadAction;
  SignatureRequestAccepted: PayloadAction;
  SignatureRequestRejected: PayloadAction;
}

export type ConnectCaseReducer = {
  selectWalletOpened: CaseReducer<ConnectState, ConnectActions['SelectWalletOpened']>;
  selectWalletClosed: CaseReducer<ConnectState, ConnectActions['SelectWalletClosed']>;
  signUpOpened: CaseReducer<ConnectState, ConnectActions['SignUpOpened']>;
  signUpClosed: CaseReducer<ConnectState, ConnectActions['SignUpClosed']>;
  metaMaskAppModalOpened: CaseReducer<ConnectState, ConnectActions['MetaMaskAppModalOpened']>;
  metaMaskAppModalClosed: CaseReducer<ConnectState, ConnectActions['MetaMaskAppModalClosed']>;
  changeWalletRequested: CaseReducer<ConnectState, ConnectActions['ChangeWalletRequested']>;
  walletConnectionPending: CaseReducer<ConnectState, ConnectActions['WalletConnectionPending']>;
  walletConnectionFulfilled: CaseReducer<ConnectState, ConnectActions['WalletConnectionFulfilled']>;
  walletConnectionRejected: CaseReducer<ConnectState, ConnectActions['WalletConnectionRejected']>;
  wrongNetworkSelected: CaseReducer<ConnectState, ConnectActions['WrongNetworkSelected']>;
  installMetaMaskExtensionAsked: CaseReducer<ConnectState, ConnectActions['InstallMetaMaskExtensionAsked']>;
  signatureRequested: CaseReducer<ConnectState, ConnectActions['SignatureRequested']>;
  signatureRequestAccepted: CaseReducer<ConnectState, ConnectActions['SignatureRequestAccepted']>;
  signatureRequestRejected: CaseReducer<ConnectState, ConnectActions['SignatureRequestRejected']>;
};

export const connectSlice = createSlice<ConnectState, ConnectCaseReducer, 'connect'>({
  name: 'connect',
  initialState: {
    metaMask: {
      installExtensionAsked: false,
      appModalIsOpen: false,
    },
    signatureModalIsOpen: false,
    selectWalletIsOpen: false,
    signUpIsOpen: false,
    wallet: null,
    signature: null,
  },
  reducers: {
    selectWalletOpened: (state) => {
      state.selectWalletIsOpen = true;
    },
    selectWalletClosed: (state) => {
      state.selectWalletIsOpen = false;
      state.wallet = null;
      state.signature = null;
    },
    signUpOpened: (state) => {
      state.signUpIsOpen = true;
    },
    signUpClosed: (state) => {
      state.signUpIsOpen = false;
      state.wallet = null;
      state.signature = null;
    },
    changeWalletRequested: (state) => {
      state.selectWalletIsOpen = true;
      state.signUpIsOpen = false;
      state.wallet = null;
    },
    walletConnectionPending: () => {},
    walletConnectionFulfilled: (state, action) => {
      if (action.payload.isNewUser && !action.payload.ssoToken) {
        state.signUpIsOpen = true;
      }

      state.selectWalletIsOpen = false;
      state.wallet = action.payload.wallet;
      state.signature = action.payload.signature;
    },
    walletConnectionRejected: (state) => {
      state.selectWalletIsOpen = false;
      state.wallet = null;
      state.signature = null;
    },
    installMetaMaskExtensionAsked: (state) => {
      state.metaMask.installExtensionAsked = true;
    },
    wrongNetworkSelected: () => {},
    metaMaskAppModalOpened: (state) => {
      state.metaMask.appModalIsOpen = true;
    },
    metaMaskAppModalClosed: (state) => {
      state.metaMask.appModalIsOpen = false;
    },
    signatureRequested: (state) => {
      state.signatureModalIsOpen = true;
    },
    signatureRequestAccepted: (state) => {
      state.signatureModalIsOpen = false;
    },
    signatureRequestRejected: (state) => {
      state.signatureModalIsOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authSlice.actions.signUpFulfilled, (state) => {
      state.signUpIsOpen = false;
      state.signature = null;
      state.wallet = null;
    });
  },
});

import { createSelector, Selector } from '@reduxjs/toolkit';
import { RootState } from '@root/infra/store/types';

import { ConnectState } from './slice';
import { IWalletAddress } from '../../types/wallet';

const getState: Selector<RootState, ConnectState> = (state: RootState) => state.connect;
const getSelectWalletIsOpen = (state: ConnectState) => state.selectWalletIsOpen;
const getSignUpIsOpen = (state: ConnectState) => state.signUpIsOpen;
const getWallet = (state: ConnectState) => state.wallet;
const getSignature = (state: ConnectState) => state.signature;
const getWalletAddress = (state: ConnectState) => state.wallet?.address;
const getMetaMask = (state: ConnectState) => state.metaMask;
const getSignatureModalIsOpen = (state: ConnectState) => state.signatureModalIsOpen;

export const connectSelector = {
  selectWalletIsOpen: createSelector<[Selector<RootState, ConnectState>], boolean>([getState], getSelectWalletIsOpen),
  signUpIsOpen: createSelector<[Selector<RootState, ConnectState>], boolean>([getState], getSignUpIsOpen),
  wallet: createSelector<[Selector<RootState, ConnectState>], ConnectState['wallet']>([getState], getWallet),
  signature: createSelector<[Selector<RootState, ConnectState>], ConnectState['signature']>([getState], getSignature),
  walletAddress: createSelector<[Selector<RootState, ConnectState>], IWalletAddress | undefined>([getState], getWalletAddress),
  metaMask: createSelector<[Selector<RootState, ConnectState>], ConnectState['metaMask']>([getState], getMetaMask),
  signatureModalIsOpen: createSelector<[Selector<RootState, ConnectState>], ConnectState['signatureModalIsOpen']>([getState], getSignatureModalIsOpen),
};

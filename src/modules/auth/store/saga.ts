import { SagaReturnType, fork, call, put, takeLatest, getContext } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { ERC721Connector } from '@tw/nft-manager';
import { PayloadAction } from '@reduxjs/toolkit';

import { getTokens } from '../helpers/get-tokens';
import { updateTokens } from '../helpers/update-tokens';
import { removeTokens } from '../helpers/remove-tokens';
import { signInService } from '../services/sign-in';
import { getProfileService } from '../services/get-profile';
import { ConnectActions, connectSlice } from './connect/slice';
import { whitelistSlice } from './whitelist/slice';
import { AuthActions, authSlice } from './slice';

function* handleSignIn(action: AuthActions['SignInPending']) {
  const result: SagaReturnType<typeof signInService> = yield call(signInService, action.payload);

  if (result.status === 200) {
    updateTokens({ accessToken: result.payload.accessToken, walletType: action.payload.walletType });
    yield put(authSlice.actions.signInFulfilled(result.payload));
  } else {
    toast.error(result.payload);
    yield put(authSlice.actions.signInRejected(result.payload));
  }
}

function* initializeRejected(message: string) {
  toast.error(message);
  yield put(authSlice.actions.initializeRejected(message));
}

function* handleInitialize(action?: PayloadAction) {
  try {
    yield put(authSlice.actions.initializePending());
    const ercConnector: ERC721Connector = yield getContext('ercConnector');

    const { accessToken, walletType } = getTokens();

    if (!accessToken || !walletType) {
      removeTokens();
      return yield put(authSlice.actions.initializeFulfilled());
    }

    const result: SagaReturnType<typeof getProfileService> = yield call(getProfileService);

    if (result.status !== 200) {
      return yield initializeRejected(result.payload);
    }

    if (!action) {
      let address: string | undefined;

      if (walletType === 'meta-mask') {
        address = yield ercConnector.connectMetamask();
      } else if (walletType === 'wallet-connect') {
        address = yield ercConnector.connectWallet();
      } else {
        return yield initializeRejected('Unsupported wallet type');
      }

      if (address?.toLowerCase() !== result.payload.address.toLowerCase()) {
        return yield put(authSlice.actions.initializeFulfilled());
      }
    }

    yield put(authSlice.actions.initializeFulfilled(result.payload));
  } catch (e) {
    yield initializeRejected((e as Error).message);
  }
}

function* handleWalletConnection(action: ConnectActions['WalletConnectionFulfilled']) {
  if (!action.payload.isNewUser || !!action.payload.ssoToken) {
    yield put(
      authSlice.actions.signInPending({
        walletAddress: action.payload.wallet.address,
        signature: action.payload.signature,
        ssoToken: action.payload.ssoToken,
        walletType: action.payload.wallet.type,
      }),
    );
  }
}

function handleSignOut() {
  removeTokens();
}

export function* authSaga() {
  yield fork(handleInitialize);
  yield takeLatest(
    [whitelistSlice.actions.submitFulfilled, whitelistSlice.actions.refreshStatusFulfilled, authSlice.actions.signInFulfilled, authSlice.actions.signUpFulfilled],
    handleInitialize,
  );
  yield takeLatest(authSlice.actions.signInPending, handleSignIn);
  yield takeLatest(authSlice.actions.signedOut, handleSignOut);
  yield takeLatest(connectSlice.actions.walletConnectionFulfilled, handleWalletConnection);
}

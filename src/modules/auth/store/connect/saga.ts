import { fork, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { ConnectActions, connectSlice } from './slice';
import { handleMetaMaskConnection, handleMetaMaskEvents } from './meta-mask-saga';
import { handleWalletConnectConnection } from './wallet-connect-saga';

function* connectionRejected(message: string) {
  toast.error(message);
  yield put(connectSlice.actions.walletConnectionRejected(message));
}

function* handleConnection(action: ConnectActions['WalletConnectionPending']) {
  switch (action.payload.walletType) {
    case 'meta-mask':
      return yield handleMetaMaskConnection(action);
    case 'wallet-connect':
      return yield handleWalletConnectConnection(action);
    case 'coinbase':
      return yield connectionRejected('Coinbase is not implemented');
    default:
      return yield connectionRejected('Unknown wallet type');
  }
}

export function* connectSaga() {
  yield fork(handleMetaMaskEvents);
  yield takeLatest(connectSlice.actions.walletConnectionPending, handleConnection);
}

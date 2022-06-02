import { call, getContext, put, SagaReturnType, take } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { ERC721Connector } from '@tw/nft-manager';
import QRCodeModal from '@walletconnect/qrcode-modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { detectMobile } from '@root/shared/utils/detect-mobile';

import { ConnectActions, connectSlice } from './slice';
import { getWalletNonceService } from '../../services/get-wallet-nonce';

function* connectionRejected(message: string) {
  toast.error(message);
  yield put(connectSlice.actions.walletConnectionRejected(message));
}

export function* handleWalletConnectConnection(action: ConnectActions['WalletConnectionPending']) {
  try {
    const ercConnector: ERC721Connector = yield getContext('ercConnector');

    const result = yield ercConnector.connectWallet(QRCodeModal);
    let address: string | undefined;

    if (typeof result === 'string') {
      address = result;
    } else if (typeof result === 'object') {
      address = result.detail;
    }

    if (!address) {
      return yield connectionRejected('Account not found.');
    }

    const nonceResult: SagaReturnType<typeof getWalletNonceService> = yield call(getWalletNonceService, { address });

    if (nonceResult.status !== 200) {
      return yield connectionRejected(nonceResult.payload);
    }

    const provider: WalletConnectProvider = yield ercConnector.walletConnector.getProvider();

    if (detectMobile()) {
      yield put(connectSlice.actions.signatureRequested());
      yield take(connectSlice.actions.signatureRequestAccepted);
    }

    const signature: string = yield ercConnector.getSignature(nonceResult.payload.nonce, provider);

    yield put(
      connectSlice.actions.walletConnectionFulfilled({
        wallet: { type: 'wallet-connect', address },
        signature,
        isNewUser: nonceResult.payload.isNew,
        ssoToken: action.payload.ssoToken,
      }),
    );
  } catch (e) {
    const error = e as Error;
    yield connectionRejected(error.message);
  }
}

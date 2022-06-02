import { call, getContext, put, SagaReturnType, select, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { toast } from 'react-toastify';
import { ERC721Connector } from '@tw/nft-manager';
import type { BaseProvider } from '@metamask/providers';
import { RootState } from '@root/infra/store/types';

import { getWalletNonceService } from '../../services/get-wallet-nonce';
import { ConnectActions, connectSlice } from './slice';
import { authSlice } from '../slice';

function* connectionRejected(message: string) {
  toast.error(message);
  yield put(connectSlice.actions.walletConnectionRejected(message));
}

export function* handleMetaMaskConnection(action: ConnectActions['WalletConnectionPending']) {
  try {
    const ercConnector: ERC721Connector = yield getContext('ercConnector');

    if (!ercConnector.metamask.checkInstalledStatus()) {
      yield put(connectSlice.actions.installMetaMaskExtensionAsked());
      return yield connectionRejected('Please make sure that MetaMask extension is installed in your browser.');
    }

    if (!(yield ercConnector.metamask.checkNetwork())) {
      return yield connectionRejected("Please make sure you've chosen correct network");
    }

    const address: string = yield ercConnector.connectMetamask();

    if (!address) {
      return yield connectionRejected('Account not found.');
    }

    const nonceResult: SagaReturnType<typeof getWalletNonceService> = yield call(getWalletNonceService, { address });

    if (nonceResult.status !== 200) {
      return yield connectionRejected(nonceResult.payload);
    }

    const signature: string = yield ercConnector.getSignature(nonceResult.payload.nonce, window.ethereum as BaseProvider);

    yield put(
      connectSlice.actions.walletConnectionFulfilled({
        wallet: { type: 'meta-mask', address },
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

type AccountChanged = { type: 'accountChanged'; payload: string[] };
type ChainChanged = { type: 'chainChanged'; payload: string };

export function* handleMetaMaskEvents() {
  const provider = window.ethereum;

  const channel = eventChannel<AccountChanged | ChainChanged>((emitter) => {
    const accountChangedHandler = (accounts: string[]) => {
      emitter({ type: 'accountChanged', payload: accounts });
    };

    const chainChangedHandler = (chainId: string) => {
      emitter({ type: 'chainChanged', payload: chainId });
    };

    provider?.on('accountsChanged', accountChangedHandler);
    provider?.on('chainChanged', chainChangedHandler);

    return () => {
      provider?.off('accountsChanged', accountChangedHandler);
      provider?.off('chainChanged', chainChangedHandler);
    };
  });

  while (true) {
    const action: AccountChanged | ChainChanged = yield take(channel);
    const authed: boolean = yield select((state: RootState) => !!state.auth.user);

    switch (action.type) {
      case 'accountChanged':
        const address = provider?.selectedAddress;
        if (address && authed) {
          yield put(connectSlice.actions.walletConnectionPending({ walletType: 'meta-mask', address }));
        } else if (!address) {
          yield put(authSlice.actions.signedOut());
        }
        break;
      case 'chainChanged':
        window.location.reload();
        break;
    }
  }
}

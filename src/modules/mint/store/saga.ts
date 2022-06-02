import { ReactText } from 'react';
import { eventChannel } from 'redux-saga';
import { call, fork, getContext, put, SagaReturnType, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { ERC721Connector } from '@tw/nft-manager';
import { PhaseEnum, MyPreSaleInfo, MyPublicSaleInfo } from '@tw/nft-manager/interfaces';
import { RootState } from '@root/infra/store/types';
import { getPlansService } from '@root/modules/plans/services/get-plans';
import { AuthActions, authSlice } from '@root/modules/auth/store/slice';

import { MintActions, mintSlice } from './slice';
import { sendTransactionService } from '../services/send-transaction';

enum WarriorsExternalEvent {
  OnSalePhaseChange = 'salePhase',
  OnMyPublicSaleResult = 'infoMyPublicSale',
  OnMyPreSaleResult = 'infoMyPreSale',
}

enum WarriorsEvent {
  OnSalePhaseChange = 'onSalePhaseChange',
  OnMyPublicSaleResult = 'onMyPublicSaleResult',
  OnMyPreSaleResult = 'onMyPreSaleResult',
}

function* handleEventChannel() {
  const channel = eventChannel((emitter) => {
    const onSalePhaseChange = (salePhase) => {
      emitter({ type: WarriorsEvent.OnSalePhaseChange, payload: salePhase });
    };

    const onMyPublicSaleResult = (transaction) => {
      emitter({ type: WarriorsEvent.OnMyPublicSaleResult, payload: transaction.detail });
    };

    const onMyPreSaleResult = (transaction) => {
      emitter({ type: WarriorsEvent.OnMyPreSaleResult, payload: transaction.detail });
    };

    window.addEventListener(WarriorsExternalEvent.OnMyPreSaleResult, onMyPreSaleResult);
    window.addEventListener(WarriorsExternalEvent.OnMyPublicSaleResult, onMyPublicSaleResult);
    window.addEventListener(WarriorsExternalEvent.OnSalePhaseChange, onSalePhaseChange);

    return () => {
      window.removeEventListener(WarriorsExternalEvent.OnMyPreSaleResult, onMyPreSaleResult);
      window.removeEventListener(WarriorsExternalEvent.OnMyPublicSaleResult, onMyPublicSaleResult);
      window.removeEventListener(WarriorsExternalEvent.OnSalePhaseChange, onSalePhaseChange);
    };
  });

  while (true) {
    const action = yield take(channel);

    switch (action.type) {
      case WarriorsEvent.OnMyPreSaleResult:
        yield put(
          mintSlice.actions.warriorsUpdated({
            conqueror: {
              purchased: action.payload.conquerorSupply,
              purchaseLimit: action.payload.conquerorLimit,
              purchaseLimitForMe: action.payload.conquerorLimitForMe,
              priceInEth: parseFloat(action.payload.priceConquerorInEth),
            },
            defender: {
              purchased: action.payload.defenderSupply,
              purchaseLimit: action.payload.defenderLimit,
              purchaseLimitForMe: action.payload.defenderLimitForMe,
              priceInEth: parseFloat(action.payload.priceDefenderInEth),
            },
          }),
        );
        break;
      case WarriorsEvent.OnMyPublicSaleResult:
        yield put(
          mintSlice.actions.warriorsUpdated({
            conqueror: {
              purchased: action.payload.conquerorSupply,
              purchaseLimit: action.payload.conquerorLimit,
              purchaseLimitForMe: action.payload.conquerorLimitForMePublic,
              priceInEth: parseFloat(action.payload.priceConquerorInEth),
            },
            defender: {
              purchased: action.payload.defenderSupply,
              purchaseLimit: action.payload.defenderLimit,
              purchaseLimitForMe: action.payload.defenderLimitForMePublic,
              priceInEth: parseFloat(action.payload.priceDefenderInEth),
            },
          }),
        );
        break;
    }
  }
}

function* purchaseRejected(message: string, loadingToastId: ReactText) {
  toast.dismiss(loadingToastId);
  toast.error(message);
  yield put(mintSlice.actions.purchaseWarriorRejected(message));
}

function* handlePurchase(action: MintActions['PurchaseWarriorPending']) {
  const loadingToastId = toast.loading('Processing...');
  const ercConnector: ERC721Connector = yield getContext('ercConnector');
  const salePhase: PhaseEnum | null = yield select((state: RootState) => state.mint.salePhase);
  const couponSignature: string | undefined = yield select((state: RootState) => state.auth.user?.coupon?.signature);
  const plans: SagaReturnType<typeof getPlansService> = yield call(getPlansService);

  if (plans.status !== 200 || !plans.payload[0]) {
    return yield purchaseRejected('Plans not found.', loadingToastId);
  }

  if (!ercConnector.contractMethods) {
    return yield purchaseRejected('Contract methods not found.', loadingToastId);
  }

  if (!salePhase) {
    return yield purchaseRejected('Sale Phase not found.', loadingToastId);
  }

  try {
    let result;
    switch (salePhase) {
      case 'PublicSale':
        result =
          action.payload.type === 'Defender'
            ? yield ercConnector.contractMethods.publicMintDefender(action.payload.quantity)
            : yield ercConnector.contractMethods.publicMintConqueror(action.payload.quantity);
        break;
      case 'PreSale':
        if (!!couponSignature) {
          result =
            action.payload.type === 'Defender'
              ? yield ercConnector.contractMethods.presaleMintDefender(couponSignature, action.payload.quantity)
              : yield ercConnector.contractMethods.presaleMintConqueror(couponSignature, action.payload.quantity);
        }
        break;
      default:
        return yield purchaseRejected('Sale Phase is not supported.', loadingToastId);
    }

    if (!result) {
      return yield purchaseRejected('Purchase is not completed', loadingToastId);
    }

    const transaction = yield result.wait();
    const sendTransactionResult: SagaReturnType<typeof sendTransactionService> = yield call(sendTransactionService, {
      hash: transaction.transactionHash,
      data: transaction,
      phase: salePhase,
      tokenType: action.payload.type,
      planId: plans.payload[0].id,
      quantity: action.payload.quantity,
    });

    if (sendTransactionResult.status !== 200) {
      return yield purchaseRejected(sendTransactionResult.payload, loadingToastId);
    }

    toast.dismiss(loadingToastId);
    toast.success('Mint purchased successfully');
    yield put(mintSlice.actions.purchaseWarriorFulfilled({ type: action.payload.type }));
  } catch (e) {
    const error = e as Error;
    return yield purchaseRejected(error.message, loadingToastId);
  }
}

function* handleInitialize() {
  try {
    const ercConnector: ERC721Connector = yield getContext('ercConnector');

    if (!ercConnector.contractMethods) {
      return yield put(mintSlice.actions.initializeRejected('Contract methods not found.'));
    }

    const salePhase: PhaseEnum = yield ercConnector.contractMethods.getSalePhase();

    if (salePhase === PhaseEnum.PublicSale) {
      const publicSaleInfo: MyPublicSaleInfo = yield ercConnector.contractMethods.getMyPublicSaleInfo();

      yield put(
        mintSlice.actions.initializeFulfilled({
          salePhase,
          transactionLimit: publicSaleInfo.transactionLimit,
          conqueror: {
            purchased: publicSaleInfo.conquerorSupply,
            purchaseLimit: publicSaleInfo.conquerorLimit,
            purchaseLimitForMe: publicSaleInfo.conquerorLimitForMePublic ?? null,
            priceInEth: parseFloat(publicSaleInfo.priceConquerorInEth),
          },
          defender: {
            purchased: publicSaleInfo.defenderSupply,
            purchaseLimit: publicSaleInfo.defenderLimit,
            purchaseLimitForMe: publicSaleInfo.defenderLimitForMePublic ?? null,
            priceInEth: parseFloat(publicSaleInfo.priceDefenderInEth),
          },
        }),
      );
    } else if (salePhase === PhaseEnum.PreSale) {
      const preSaleInfo: MyPreSaleInfo = yield ercConnector.contractMethods.getMyPreSaleInfo();

      yield put(
        mintSlice.actions.initializeFulfilled({
          salePhase,
          transactionLimit: preSaleInfo.transactionLimit,
          conqueror: {
            purchased: preSaleInfo.conquerorSupply,
            purchaseLimit: preSaleInfo.conquerorLimit,
            purchaseLimitForMe: preSaleInfo.conquerorLimitForMe ?? null,
            priceInEth: parseFloat(preSaleInfo.priceConquerorInEth),
          },
          defender: {
            purchased: preSaleInfo.defenderSupply,
            purchaseLimit: preSaleInfo.defenderLimit,
            purchaseLimitForMe: preSaleInfo.defenderLimitForMe ?? null,
            priceInEth: parseFloat(preSaleInfo.priceDefenderInEth),
          },
        }),
      );
    } else if (salePhase === PhaseEnum.Locked) {
      yield put(mintSlice.actions.initializeFulfilled({ salePhase }));
    } else {
      yield put(mintSlice.actions.initializeRejected('Sale phase not supported'));
    }

    yield fork(handleEventChannel);
  } catch (e) {
    const error = e as Error;
    yield put(mintSlice.actions.initializeRejected(error.message));
  }
}

export function* handleAuthInitialized(action: AuthActions['InitializeFulfilled']) {
  if (!!action.payload) {
    yield put(mintSlice.actions.initializePending());
  }
}

export function* handleSignedOut() {
  yield put(mintSlice.actions.reset());
}

export function* mintSaga() {
  yield takeEvery(authSlice.actions.initializeFulfilled, handleAuthInitialized);
  yield takeEvery(authSlice.actions.signedOut, handleSignedOut);
  yield takeEvery(mintSlice.actions.purchaseWarriorPending, handlePurchase);
  yield takeLatest(mintSlice.actions.initializePending, handleInitialize);
}

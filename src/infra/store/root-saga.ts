import { all } from 'redux-saga/effects';
import { commonSaga } from '@root/modules/common/store/saga';
import { connectSaga } from '@root/modules/auth/store/connect/saga';
import { authSaga } from '@root/modules/auth/store/saga';
import { mintSaga } from '@root/modules/mint/store/saga';
import { whitelistSaga } from '@root/modules/auth/store/whitelist/saga';
import { walletSaga } from '@root/modules/wallet/store/saga';
import { timelinesSaga } from '@root/modules/timelines/store/saga';
import { purchasesSaga } from '@root/modules/purchases/store/saga';

export function* rootSaga() {
  yield all([commonSaga(), connectSaga(), authSaga(), mintSaga(), whitelistSaga(), walletSaga(), timelinesSaga(), purchasesSaga()]);
}

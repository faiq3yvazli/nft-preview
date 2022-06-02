import { SagaReturnType, call, put, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { RootState } from '@root/infra/store/types';
import { Id } from '@root/shared/utils/types';

import { refreshWhitelistStatusService } from '../../services/refresh-whitelist-status';
import { whitelistSlice } from './slice';

function* whitelistStatusRefreshRejected(message: string) {
  toast.error(message);
  return yield put(whitelistSlice.actions.refreshStatusRejected(message));
}

function* handleWhitelistStatusRefresh() {
  const couponId: Id | undefined = yield select((state: RootState) => state.auth.user?.coupon?.id);

  if (!couponId) {
    return yield whitelistStatusRefreshRejected('Coupon not found.');
  }

  const result: SagaReturnType<typeof refreshWhitelistStatusService> = yield call(refreshWhitelistStatusService, couponId);

  if (result.status !== 200) {
    return yield whitelistStatusRefreshRejected(result.payload);
  }

  yield put(whitelistSlice.actions.refreshStatusFulfilled());
}

export function* whitelistSaga() {
  yield takeLatest(whitelistSlice.actions.refreshStatusPending, handleWhitelistStatusRefresh);
}

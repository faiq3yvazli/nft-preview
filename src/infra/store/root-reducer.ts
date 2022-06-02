import { combineReducers } from '@reduxjs/toolkit';

import { layoutSlice } from '@root/infra/layout/slice';
import { commonSlice } from '@root/modules/common/store/slice';
import { connectSlice } from '@root/modules/auth/store/connect/slice';
import { authSlice } from '@root/modules/auth/store/slice';
import { whitelistSlice } from '@root/modules/auth/store/whitelist/slice';
import { mintSlice } from '@root/modules/mint/store/slice';
import { walletSlice } from '@root/modules/wallet/store/slice';
import { timelinesSlice } from '@root/modules/timelines/store/slice';
import { purchasesSlice } from '@root/modules/purchases/store/slice';

export const rootReducer = combineReducers({
  common: commonSlice.reducer,
  connect: connectSlice.reducer,
  auth: authSlice.reducer,
  whitelist: whitelistSlice.reducer,
  mint: mintSlice.reducer,
  wallet: walletSlice.reducer,
  timer: timelinesSlice.reducer,
  layout: layoutSlice.reducer,
  purchases: purchasesSlice.reducer,
});

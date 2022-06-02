import { createSelector, Selector } from '@reduxjs/toolkit';
import { MintState } from '@root/modules/mint/store/slice';
import { RootState } from '@root/infra/store/types';

const getState = (state: RootState) => state.mint;
const getConqueror = (state: MintState) => state.warriors.conqueror;
const getDefender = (state: MintState) => state.warriors.defender;
const getSalePhase = (state: MintState) => state.salePhase;
const getTransactionLimit = (state: MintState) => state.transactionLimit;
const getPurchasingWarrior = (state: MintState) => state.purchasingWarrior;
const getIsLoading = (state: MintState) => state.isLoading;
const getConquerorQuantity = (state: MintState) => state.conquerorQuantity;
const getDefenderQuantity = (state: MintState) => state.defenderQuantity;

export const mintSelector = {
  conqueror: createSelector<[Selector<RootState, MintState>], MintState['warriors']['conqueror']>([getState], getConqueror),
  defender: createSelector<[Selector<RootState, MintState>], MintState['warriors']['defender']>([getState], getDefender),
  salePhase: createSelector<[Selector<RootState, MintState>], MintState['salePhase']>([getState], getSalePhase),
  transactionLimit: createSelector<[Selector<RootState, MintState>], MintState['transactionLimit']>([getState], getTransactionLimit),
  purchasingWarrior: createSelector<[Selector<RootState, MintState>], MintState['purchasingWarrior']>([getState], getPurchasingWarrior),
  conquerorQuantity: createSelector<[Selector<RootState, MintState>], MintState['conquerorQuantity']>([getState], getConquerorQuantity),
  defenderQuantity: createSelector<[Selector<RootState, MintState>], MintState['defenderQuantity']>([getState], getDefenderQuantity),
  isLoading: createSelector<[Selector<RootState, MintState>], boolean>([getState], getIsLoading),
};

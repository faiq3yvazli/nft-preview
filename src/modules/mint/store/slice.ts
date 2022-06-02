import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PhaseEnum } from '@tw/nft-manager/interfaces';

import { WarriorMeta } from '../types/warrior-meta';

export type MintState = {
  isLoading: boolean;
  salePhase: PhaseEnum | null;
  transactionLimit: number | null;
  purchasingWarrior: 'Conqueror' | 'Defender' | null;
  conquerorQuantity: number;
  defenderQuantity: number;
  warriors: {
    conqueror: WarriorMeta | null;
    defender: WarriorMeta | null;
  };
};

export interface MintActions {
  InitializePending: PayloadAction;
  InitializeFulfilled: PayloadAction<{
    conqueror?: WarriorMeta;
    defender?: WarriorMeta;
    transactionLimit?: number;
    salePhase: PhaseEnum;
  }>;
  InitializeRejected: PayloadAction<string>;
  WarriorsUpdated: PayloadAction<{ conqueror: WarriorMeta; defender: WarriorMeta }>;
  SalePhaseUpdated: PayloadAction<PhaseEnum>;
  TransactionLimitUpdated: PayloadAction<number>;
  PurchaseWarriorPending: PayloadAction<{ type: 'Conqueror' | 'Defender'; quantity: number }>;
  PurchaseWarriorFulfilled: PayloadAction<{ type: 'Conqueror' | 'Defender' }>;
  PurchaseWarriorRejected: PayloadAction<string>;
  ConquerorQuantityUpdated: PayloadAction<number>;
  DefenderQuantityUpdated: PayloadAction<number>;
  Reset: PayloadAction;
}

export type MintCaseReducer = {
  initializePending: CaseReducer<MintState, MintActions['InitializePending']>;
  initializeFulfilled: CaseReducer<MintState, MintActions['InitializeFulfilled']>;
  initializeRejected: CaseReducer<MintState, MintActions['InitializeRejected']>;
  warriorsUpdated: CaseReducer<MintState, MintActions['WarriorsUpdated']>;
  salePhaseUpdated: CaseReducer<MintState, MintActions['SalePhaseUpdated']>;
  transactionLimitUpdated: CaseReducer<MintState, MintActions['TransactionLimitUpdated']>;
  purchaseWarriorPending: CaseReducer<MintState, MintActions['PurchaseWarriorPending']>;
  purchaseWarriorFulfilled: CaseReducer<MintState, MintActions['PurchaseWarriorFulfilled']>;
  purchaseWarriorRejected: CaseReducer<MintState, MintActions['PurchaseWarriorRejected']>;
  conquerorQuantityUpdated: CaseReducer<MintState, MintActions['ConquerorQuantityUpdated']>;
  defenderQuantityUpdated: CaseReducer<MintState, MintActions['DefenderQuantityUpdated']>;
  reset: CaseReducer<MintState, MintActions['Reset']>;
};

export const mintSlice = createSlice<MintState, MintCaseReducer, 'mint'>({
  name: 'mint',
  initialState: {
    isLoading: false,
    salePhase: null,
    transactionLimit: null,
    purchasingWarrior: null,
    conquerorQuantity: 1,
    defenderQuantity: 1,
    warriors: { conqueror: null, defender: null },
  },
  reducers: {
    initializePending: (state) => {
      state.isLoading = true;
    },
    initializeFulfilled: (state, action) => {
      state.isLoading = false;
      state.warriors.conqueror = action.payload.conqueror || null;
      state.warriors.defender = action.payload.defender || null;
      state.transactionLimit = action.payload.transactionLimit || null;
      state.salePhase = action.payload.salePhase;
    },
    initializeRejected: (state) => {
      state.isLoading = false;
    },
    warriorsUpdated: (state, action) => {
      state.warriors = action.payload;
    },
    salePhaseUpdated: (state, action) => {
      state.salePhase = action.payload;
    },
    transactionLimitUpdated: (state, action) => {
      state.transactionLimit = action.payload;
    },
    purchaseWarriorPending: (state, action) => {
      state.purchasingWarrior = action.payload.type;
    },
    purchaseWarriorFulfilled: (state, action) => {
      state.purchasingWarrior = null;
      if (action.payload.type === 'Conqueror') {
        state.conquerorQuantity = 1;
      }

      if (action.payload.type === 'Defender') {
        state.defenderQuantity = 1;
      }
    },
    purchaseWarriorRejected: (state) => {
      state.purchasingWarrior = null;
    },
    conquerorQuantityUpdated: (state, action) => {
      state.conquerorQuantity = action.payload;
    },
    defenderQuantityUpdated: (state, action) => {
      state.defenderQuantity = action.payload;
    },
    reset: (state) => {
      state.warriors = { conqueror: null, defender: null };
      state.salePhase = null;
      state.transactionLimit = null;
      state.purchasingWarrior = null;
      state.defenderQuantity = 1;
      state.conquerorQuantity = 1;
      state.isLoading = false;
    },
  },
});

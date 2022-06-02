import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { whitelistSelector } from '@root/modules/auth/store/whitelist/selector';
import { walletSelector } from '@root/modules/wallet/store/selector';
import { PhaseEnum } from '@tw/nft-manager/interfaces';

import { mintSelector } from '../store/selector';
import { mintSlice } from '../store/slice';

export const useMint = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(mintSelector.isLoading);
  const defenderData = useSelector(mintSelector.defender);
  const conquerorData = useSelector(mintSelector.conqueror);
  const purchasingWarrior = useSelector(mintSelector.purchasingWarrior);
  const transactionLimit = useSelector(mintSelector.transactionLimit);
  const defenderQuantity = useSelector(mintSelector.defenderQuantity);
  const conquerorQuantity = useSelector(mintSelector.conquerorQuantity);
  const salePhase = useSelector(mintSelector.salePhase);
  const isSufficientFunds = useSelector(whitelistSelector.isSufficientFunds);
  const balance = useSelector(walletSelector.balance);

  const updateConquerorQuantity = useCallback(
    (value: number) => {
      dispatch(mintSlice.actions.conquerorQuantityUpdated(value));
    },
    [dispatch],
  );

  const updateDefenderQuantity = useCallback(
    (value: number) => {
      dispatch(mintSlice.actions.defenderQuantityUpdated(value));
    },
    [dispatch],
  );

  const purchaseDefender = useCallback(() => {
    dispatch(mintSlice.actions.purchaseWarriorPending({ type: 'Defender', quantity: defenderQuantity }));
  }, [defenderQuantity, dispatch]);

  const purchaseConqueror = useCallback(() => {
    dispatch(mintSlice.actions.purchaseWarriorPending({ type: 'Conqueror', quantity: conquerorQuantity }));
  }, [conquerorQuantity, dispatch]);

  const defenderMaxQuantity = useMemo(() => {
    if (typeof defenderData?.purchaseLimitForMe === 'number' && typeof transactionLimit === 'number') {
      return Math.min(defenderData.purchaseLimitForMe, transactionLimit);
    } else {
      return transactionLimit || defenderData?.purchaseLimitForMe || undefined;
    }
  }, [defenderData?.purchaseLimitForMe, transactionLimit]);

  const conquerorMaxQuantity = useMemo(() => {
    if (typeof conquerorData?.purchaseLimitForMe === 'number' && typeof transactionLimit === 'number') {
      return Math.min(conquerorData.purchaseLimitForMe, transactionLimit);
    } else {
      return transactionLimit || conquerorData?.purchaseLimitForMe || undefined;
    }
  }, [conquerorData?.purchaseLimitForMe, transactionLimit]);

  const defenderMintIsDisabled = useMemo(() => {
    if (!defenderData) {
      return true;
    }

    return (
      (salePhase === PhaseEnum.PreSale && !isSufficientFunds) ||
      defenderData.purchaseLimitForMe === 0 ||
      transactionLimit === 0 ||
      balance < defenderData.priceInEth * defenderQuantity
    );
  }, [balance, defenderData, defenderQuantity, isSufficientFunds, salePhase, transactionLimit]);

  const conquerorMintIsDisabled = useMemo(() => {
    if (!conquerorData) {
      return true;
    }

    return (
      (salePhase === PhaseEnum.PreSale && !isSufficientFunds) ||
      conquerorData.purchaseLimitForMe === 0 ||
      transactionLimit === 0 ||
      balance < conquerorData.priceInEth * conquerorQuantity
    );
  }, [balance, conquerorData, conquerorQuantity, isSufficientFunds, salePhase, transactionLimit]);

  const defender = useMemo(() => {
    if (!defenderData) {
      return undefined;
    }
    return {
      ...defenderData,
      maxQuantity: defenderMaxQuantity,
      soldOut: typeof defenderData.purchaseLimit === 'number' && defenderData.purchaseLimit <= defenderData.purchased,
      isLoading: purchasingWarrior === 'Defender',
      mintIsDisabled: defenderMintIsDisabled,
      quantity: defenderQuantity,
    };
  }, [defenderData, defenderMaxQuantity, defenderMintIsDisabled, defenderQuantity, purchasingWarrior]);

  const conqueror = useMemo(() => {
    if (!conquerorData) {
      return undefined;
    }
    return {
      ...conquerorData,
      maxQuantity: conquerorMaxQuantity,
      soldOut: typeof conquerorData.purchaseLimit === 'number' && conquerorData.purchaseLimit <= conquerorData.purchased,
      isLoading: purchasingWarrior === 'Conqueror',
      mintIsDisabled: conquerorMintIsDisabled,
      quantity: conquerorQuantity,
    };
  }, [conquerorData, conquerorMaxQuantity, conquerorMintIsDisabled, conquerorQuantity, purchasingWarrior]);

  const state = {
    defender,
    conqueror,
    isLoading,
    isLocked: salePhase === PhaseEnum.Locked,
  };
  const handlers = {
    conqueror: { purchase: purchaseConqueror, updateQuantity: updateConquerorQuantity },
    defender: { purchase: purchaseDefender, updateQuantity: updateDefenderQuantity },
  };

  return [state, handlers] as [typeof state, typeof handlers];
};

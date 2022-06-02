import { Id } from '@root/shared/utils/types';
import { PhaseEnum } from '@tw/nft-manager/interfaces';

export type SendTransactionDto = {
  hash: string;
  phase: PhaseEnum;
  tokenType: 'Conqueror' | 'Defender';
  quantity: number;
  data: object;
  planId: Id;
};

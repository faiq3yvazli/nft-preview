import { Id } from '@root/shared/utils/types';

export type ICoupon = {
  id: Id;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  signature: string;
  isSufficientFunds: boolean;
  address: string;
};

export interface IUser {
  id: Id;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  username: string;
  address: string;
  email: string;
  shopUserId: Id;
  enrollerId: Id;
  isAdmin: boolean;
  coupon: ICoupon | null;
}

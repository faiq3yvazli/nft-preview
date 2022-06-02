import { AxiosError } from 'axios';
import { fetcher } from '@root/infra/fetcher';
import type { IHttpResponse } from '@root/shared/http-service';
import { handleAxiosError } from '@root/shared/utils/handle-axios-error';

import { SubmitWalletAddressDtoMapper } from '../mappers/submit-wallet-address-dto';
import { SubmitWalletAddressDto } from '../dtos/submit-wallet-address';

export type SubmitWalletAddressServiceResponse = IHttpResponse<200> | IHttpResponse<400, string>;

export const submitWalletAddressService = async (payload: SubmitWalletAddressDto): Promise<SubmitWalletAddressServiceResponse> => {
  try {
    await fetcher.post('/coupon', SubmitWalletAddressDtoMapper.toPersistence(payload));

    return {
      status: 200,
      payload: null,
    };
  } catch (e) {
    return handleAxiosError(e as AxiosError);
  }
};

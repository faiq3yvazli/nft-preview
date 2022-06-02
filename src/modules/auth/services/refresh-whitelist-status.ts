import { AxiosError } from 'axios';
import { fetcher } from '@root/infra/fetcher';
import type { IHttpResponse } from '@root/shared/http-service';
import { handleAxiosError } from '@root/shared/utils/handle-axios-error';
import { Id } from '@root/shared/utils/types';

export type RefreshWhitelistStatusServiceResponse = IHttpResponse<200> | IHttpResponse<400, string>;

export const refreshWhitelistStatusService = async (couponId: Id): Promise<RefreshWhitelistStatusServiceResponse> => {
  try {
    await fetcher.post(`/coupon/${couponId}/funds/sufficient`);

    return {
      status: 200,
      payload: null,
    };
  } catch (e) {
    return handleAxiosError(e as AxiosError);
  }
};

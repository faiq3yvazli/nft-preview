import { AxiosError } from 'axios';
import { fetcher } from '@root/infra/fetcher';
import type { IHttpResponse } from '@root/shared/http-service';
import { handleAxiosError } from '@root/shared/utils/handle-axios-error';

export type GetWalletNonceServiceData = { isNew: boolean; nonce: string };
export type GetWalletNonceServiceResponse = IHttpResponse<200, GetWalletNonceServiceData> | IHttpResponse<400, string>;
export type GetWalletNonceServiceQuery = { address: string };

export const getWalletNonceService = async (query: GetWalletNonceServiceQuery): Promise<GetWalletNonceServiceResponse> => {
  try {
    const response = await fetcher(`/auth/nonce/${query.address}`);

    return {
      status: 200,
      payload: response.data,
    };
  } catch (e) {
    return handleAxiosError(e as AxiosError);
  }
};

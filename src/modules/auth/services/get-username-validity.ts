import { AxiosError } from 'axios';
import { fetcher } from '@root/infra/fetcher';
import { IHttpResponse } from '@root/shared/http-service';
import { handleAxiosError } from '@root/shared/utils/handle-axios-error';

export type GetUsernameValidityServiceResponse = IHttpResponse<200> | IHttpResponse<400, string>;

export const getUsernameValidityService = async (username: string): Promise<GetUsernameValidityServiceResponse> => {
  try {
    await fetcher.post(`/auth/check-uniq-username`, { username }, { baseURL: process.env.REACT_APP_IGOLUXE_API_HOST });

    return {
      status: 200,
      payload: null,
    };
  } catch (e) {
    return handleAxiosError(e as AxiosError);
  }
};

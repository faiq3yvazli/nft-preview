import { AxiosError } from 'axios';
import { fetcher } from '@root/infra/fetcher';
import { IHttpResponse } from '@root/shared/http-service';
import { handleAxiosError } from '@root/shared/utils/handle-axios-error';

export type GetEmailValidityServiceResponse = IHttpResponse<200> | IHttpResponse<400, string>;

export const getEmailValidityService = async (email: string): Promise<GetEmailValidityServiceResponse> => {
  try {
    const result = await fetcher(`/user/email-verify`, {
      baseURL: process.env.REACT_APP_IGOLUXE_API_HOST,
      params: { email },
    });

    if (result.data.isSameAddress) {
      return {
        status: 400,
        payload: 'Email already used',
      };
    }

    return {
      status: 200,
      payload: null,
    };
  } catch (e) {
    return handleAxiosError(e as AxiosError);
  }
};

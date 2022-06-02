import { AxiosError } from 'axios';
import { fetcher } from '@root/infra/fetcher';
import { IHttpResponse } from '@root/shared/http-service';
import { Id } from '@root/shared/utils/types';
import { handleAxiosError } from '@root/shared/utils/handle-axios-error';

export type GetEnrollerValidityServiceResponse = IHttpResponse<200> | IHttpResponse<400, string>;

export const getEnrollerValidityService = async (enrolledId: Id): Promise<GetEnrollerValidityServiceResponse> => {
  try {
    await fetcher(`/auth/preflight/${enrolledId}`, { baseURL: process.env.REACT_APP_IGOLUXE_API_HOST });

    return {
      status: 200,
      payload: null,
    };
  } catch (e) {
    return handleAxiosError(e as AxiosError);
  }
};

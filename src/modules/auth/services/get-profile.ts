import { AxiosError } from 'axios';
import { fetcher } from '@root/infra/fetcher';
import { IHttpResponse } from '@root/shared/http-service';
import { handleAxiosError } from '@root/shared/utils/handle-axios-error';

import { IUser } from '../types/user';

export type GetProfileServiceResponse = IHttpResponse<200, IUser> | IHttpResponse<400, string>;

export const getProfileService = async (): Promise<GetProfileServiceResponse> => {
  try {
    const response = await fetcher('/profile');

    return {
      status: 200,
      payload: response.data,
    };
  } catch (e) {
    return handleAxiosError(e as AxiosError);
  }
};

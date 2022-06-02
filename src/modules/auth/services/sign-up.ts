import { AxiosError } from 'axios';
import { fetcher } from '@root/infra/fetcher';
import type { IHttpResponse } from '@root/shared/http-service';
import { handleAxiosError } from '@root/shared/utils/handle-axios-error';

import { SignUpDtoMapper } from '../mappers/sign-up-dto';
import { SignUpDto } from '../dtos/sign-up';
import { IAuthTokens } from '../types/auth-tokens';

export type SignUpServiceResponse = IHttpResponse<200, IAuthTokens> | IHttpResponse<400, string>;

export const signUpService = async (payload: SignUpDto): Promise<SignUpServiceResponse> => {
  try {
    const response = await fetcher.post('/auth/register', SignUpDtoMapper.toPersistence(payload));

    return {
      status: 200,
      payload: {
        accessToken: response.data.jwt,
      },
    };
  } catch (e) {
    return handleAxiosError(e as AxiosError);
  }
};

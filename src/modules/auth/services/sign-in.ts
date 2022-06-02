import { AxiosError } from 'axios';
import { fetcher } from '@root/infra/fetcher';
import type { IHttpResponse } from '@root/shared/http-service';
import { handleAxiosError } from '@root/shared/utils/handle-axios-error';

import { SignInDtoMapper } from '../mappers/sign-in-dto';
import { SignInDto } from '../dtos/sign-in';
import { IAuthTokens } from '../types/auth-tokens';

export type SignInServiceResponse = IHttpResponse<200, IAuthTokens> | IHttpResponse<400, string>;

export const signInService = async (payload: SignInDto): Promise<SignInServiceResponse> => {
  try {
    const response = await fetcher.post(!!payload.ssoToken ? '/auth/sso' : '/auth/login', SignInDtoMapper.toPersistence(payload));

    return {
      status: 200,
      payload: {
        accessToken: response.data.jwt,
      },
    };
  } catch (e) {
    const error = e as AxiosError;

    if (error.response?.data.error === 'TOKEN_ADDRESS_BELONG') {
      return { status: 400, payload: "User's wallet address doesn't belong to connected wallet address." };
    }

    return handleAxiosError(e as AxiosError);
  }
};

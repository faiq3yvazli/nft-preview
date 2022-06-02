import { AxiosError } from 'axios';
import { fetcher } from '@root/infra/fetcher';
import type { IHttpResponse } from '@root/shared/http-service';
import { handleAxiosError } from '@root/shared/utils/handle-axios-error';

import { SendTransactionDto } from '../dtos/send-transaction';
import { SendTransactionDtoMapper } from '../mappers/send-transaction-dto';

export type SendTransactionServiceResponse = IHttpResponse<200> | IHttpResponse<400, string>;

export const sendTransactionService = async (payload: SendTransactionDto): Promise<SendTransactionServiceResponse> => {
  try {
    await fetcher.post('transaction', SendTransactionDtoMapper.toPersistence(payload));

    return {
      status: 200,
      payload: null,
    };
  } catch (e) {
    return handleAxiosError(e as AxiosError);
  }
};

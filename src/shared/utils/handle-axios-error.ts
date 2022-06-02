import { AxiosError } from 'axios';
import { IHttpResponse } from '@root/shared/http-service';

export const handleAxiosError = (error: AxiosError): IHttpResponse<400, string> => {
  if (error.isAxiosError) {
    const rawMessage = error.response?.data.message;

    return {
      status: 400,
      payload: Array.isArray(rawMessage) ? rawMessage.join('. ') : rawMessage,
    };
  } else {
    return {
      status: 400,
      payload: 'Bad request',
    };
  }
};

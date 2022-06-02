export interface IHttpResponse<Status extends number, Payload extends any = null> {
  status: Status;
  payload: Payload;
}

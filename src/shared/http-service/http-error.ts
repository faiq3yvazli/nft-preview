export interface IHttpError {
  message: string;
}

export interface IDetailedHttpError<T extends object = Record<string, string[]>> extends IHttpError {
  details: T;
}

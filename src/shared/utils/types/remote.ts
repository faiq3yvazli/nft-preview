export type Remote<T> = {
  isLoading: boolean;
  error: string | null;
  data: T;
  loadedOnce?: boolean;
};

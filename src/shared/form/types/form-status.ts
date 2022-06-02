export interface IFormStatus {
  type: 'error' | 'success' | 'redirect';
  message: string | null;
}

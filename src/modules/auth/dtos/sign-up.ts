export type SignUpDto = {
  walletAddress: string;
  signature: string;
  invitationCode: string;
  username: string;
  email: string;
  captchaToken: string | null;
};

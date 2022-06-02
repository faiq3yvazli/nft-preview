import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const WalletWrapper = tw.div`bg-black bg-opacity-10 px-4 py-2 flex items-center`;
const WalletBody = tw.div`flex-1 min-w-0 pr-4`;
const WalletLabel = tw.h1`text-lg`;
const WalletValue = tw.p`overflow-ellipsis overflow-hidden whitespace-nowrap text-2xl font-bold`;
const WalletContent = tw.div`flex items-center`;
const WalletAction = tw.div``;
const RecaptchaWrapper = styled.div`
  transform: scale(82%);
  transform-origin: 0 0;
  margin-bottom: 4px;

  @media screen and (min-width: 450px) {
    transform: scale(106%);
    margin-bottom: 28px;
  }
`;

export const SignUpUI = {
  RecaptchaWrapper,
  Wallet: {
    Wrapper: WalletWrapper,
    Body: WalletBody,
    Label: WalletLabel,
    Value: WalletValue,
    Content: WalletContent,
    Action: WalletAction,
  },
};

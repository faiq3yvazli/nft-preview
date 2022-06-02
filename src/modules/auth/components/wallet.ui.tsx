import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const Wrapper = tw(styled.button``)`bg-black bg-opacity-10 py-3 px-6 flex items-center w-full text-left text-white disabled:opacity-30 disabled:text-white hover:text-primary-400 transition`;
const Content = tw.div`flex-1`;
const Title = tw.h6`font-bold text-xl`;
const Description = tw.p`opacity-75`;
const Logo = tw.img`w-8 h-8`;

export const WalletUI = {
  Wrapper,
  Content,
  Title,
  Description,
  Logo,
};

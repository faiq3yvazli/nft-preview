import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const StyledCharacterImage = styled.img`
  width: 100%;

  @media screen and (min-width: 1024px) {
    width: 476px;
  }

  @media screen and (min-width: 1280px) {
    width: 496px;
  }
`;

const BackgroundImage = tw.img`fixed top-0 left-0 right-0 bottom-0 h-screen w-screen object-cover -z-1`;
const Content = tw.div`container lg:min-h-screen lg:flex lg:flex-col`;
const Body = tw.div`grid lg:grid-cols-2 gap-12 lg:gap-64 flex-1 relative`;
const CharacterWrapper = tw.div`border-b border-primary-400 lg:border-none`;
const CharacterImage = tw(StyledCharacterImage)`lg:absolute lg:bottom-0`;
const BodyContent = tw.div`flex flex-col justify-center`;
const CounterContent = tw.div`w-full`;
const CounterDescription = tw.p`text-center text-mh5 lg:text-h5 text-white/80 uppercase mb-3 whitespace-nowrap`;

export const ConnectLandingUI = {
  BackgroundImage,
  Content,
  Body,
  CharacterWrapper,
  CharacterImage,
  BodyContent,
  CounterContent,
  CounterDescription,
};

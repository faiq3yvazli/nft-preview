import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  min-height: 100vh;
  margin-bottom: -114px;
  padding-bottom: 134px;

  @media screen and (min-width: 1024px) {
    background-image: url('/images/mint/particular-background.webp');
    background-repeat: no-repeat;
    background-position: top;
    background-size: 100% auto;
  }
`;

export const MintUI = {
  Wrapper: tw(StyledWrapper)`pt-52 lg:pt-32`,
  Container: tw.div`container`,
  Grid: tw.div`grid lg:grid-cols-2 gap-8`,
  Description: tw.div`flex flex-col items-center justify-center order-1 lg:order-2 lg:p-20`,
  Title: tw.h1`text-mh1 lg:text-h1 text-center font-iceberg uppercase mb-8`,
  CounterWidget: tw.div`w-full`,
  Products: tw.div`grid lg:grid-cols-2 gap-8 order-2 lg:order-1`,
};

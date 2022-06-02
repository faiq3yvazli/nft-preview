import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  background-image: url('/images/common/bg-particles.webp');
  background-repeat: repeat;
`;

export const LayoutUI = {
  Wrapper: tw(StyledWrapper)`min-h-screen flex flex-col`,
  Main: tw.main`flex-1`,
};

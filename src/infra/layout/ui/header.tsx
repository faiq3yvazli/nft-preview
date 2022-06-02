import { ComponentType } from 'react';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import { NavHashLink, NavHashLinkProps } from '@root/shared/router/hash-link';

const StyledWrapper = styled.nav<{ blurry?: boolean }>``;
const Wrapper = tw(StyledWrapper)`fixed top-0 left-0 right-0 z-50 transition ${({ blurry }) => (blurry ? 'backdrop-blur bg-black/20' : '')}`;
const Inner = tw.div`container flex flex-wrap justify-between lg:justify-start items-center py-4 flex-wrap`;
const Logo = styled.img`
  height: 60px;
  object-fit: contain;

  @media screen and (min-width: 1024px) {
    order: 1;
    height: 85px;
  }
`;
const Links = tw(styled.div<{ isOpen?: boolean }>``)`${({ isOpen }) => (isOpen ? 'block' : 'hidden')} lg:block flex-1 lg:ml-6`;

const Link: ComponentType<NavHashLinkProps> = tw(
  NavHashLink,
)`font-iceberg lg:font-sans block lg:inline-block py-4 lg:p-4 xl:p-6 lg:font-bold text-3xl uppercase lg:normal-case lg:text-lg xl:text-xl transition lg:text-white/[0.625] hover:lg:text-white/100`;
const SpecialLink: ComponentType<NavHashLinkProps> = tw(
  NavHashLink,
)`font-iceberg lg:font-sans block lg:inline-block py-4 lg:p-4 xl:p-6 lg:font-bold text-3xl uppercase lg:text-lg xl:text-xl transition text-primary-400 lg:text-white`;
const Item = tw.span`block lg:inline-block py-4 lg:px-4 lg:py-0 xl:px-6`;
const Extra = tw.div`flex flex-col lg:flex-row lg:items-center w-full lg:w-auto lg:order-4`;
const ExtraItem = tw.div`flex items-center`;
const ExtraLink = tw(NavHashLink)`font-iceberg lg:font-sans block lg:inline-block py-4 lg:p-2 lg:font-bold text-3xl uppercase lg:normal-case lg:text-lg xl:text-xl`;
const Nav = tw.div`flex items-center w-full lg:flex-1 justify-end lg:justify-start lg:order-2`;
const ToggleButton = tw.button`
  lg:order-3
  lg:hidden
  p-4
  -mr-4
`;

export const HeaderUI = {
  Wrapper,
  Inner,
  Logo,
  Links,
  Link,
  Item,
  SpecialLink,
  Extra,
  ExtraItem,
  ExtraLink,
  Nav,
  ToggleButton,
};

import { ComponentType } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { NavHashLink, NavHashLinkProps } from '@root/shared/router/hash-link';

const Wrapper = tw.footer``;
const Inner = tw.div`container flex flex-col lg:flex-row items-center py-3 flex-wrap`;
const Section = tw(styled.div<{ align?: 'right' | 'center' | 'left' }>``)`
  flex
  flex-col
  lg:flex-row
  ${({ align }) => {
    if (align === 'center') {
      return 'justify-center';
    } else if (align === 'right') {
      return 'justify-end';
    }

    return 'justify-start';
  }}
`;
const Logo = tw(styled.img`
  object-fit: contain;
  height: 85px;
  width: 169px;
`)`mb-6 lg:mb-0`;
const Link: ComponentType<NavHashLinkProps> = tw(NavHashLink)`font-bold inline-block p-2 lg:p-6 transition text-center text-xl`;
const Social = tw.a`inline-block p-6 text-xl`;

export const FooterUI = { Wrapper, Inner, Section, Logo, Link, Social };

import { ComponentType } from 'react';
import styled, { css, DefaultTheme, StyledComponentProps } from 'styled-components';
import tw from 'tailwind-styled-components';

export interface ButtonExtraProps {
  bordered?: boolean;
}

export type ButtonProps = StyledComponentProps<'button', DefaultTheme, ButtonExtraProps, any>;

const StyledButton = styled.button<ButtonExtraProps>`
  ${({ bordered }) =>
    !bordered &&
    css`
      background-image: url('/images/ui/button/bg.webp');
      background-position: center center;
      background-repeat: repeat;
      background-size: cover;
    `};
`;

export const Button: ComponentType<ButtonProps> = tw(StyledButton)`
  inline-flex items-center justify-center
  ${({ bordered }) => (!bordered ? 'text-white/75' : 'text-info-400')} font-bold uppercase
  ${({ bordered }) => (!bordered ? 'bg-primary-400' : 'bg-info-400/0 shadow-none')}
  ${({ bordered }) => (!bordered ? 'hover:text-white/100' : 'hover:bg-info-400/5 hover:shadow-xl')}
  ${({ disabled }) => (disabled ? 'grayscale-75' : '')}
  border ${({ bordered }) => (!bordered ? 'border-transparent' : 'border-info-400')}
  transition
  py-4 px-8
  text-mh4 lg:text-h4
`;

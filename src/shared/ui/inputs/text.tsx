import { ComponentType, DetailedHTMLProps, InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

export interface TextInputExtraProps {
  hasError?: boolean;
  center?: boolean;
  uppercase?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}
export interface TextInputProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'prefix'>, TextInputExtraProps {}

const StyledTextInput = styled.input<TextInputExtraProps>``;

const TailwindTextInput: ComponentType<TextInputProps> = tw(StyledTextInput)`
  bg-gradient-to-r from-gradient-secondary-from to-gradient-secondary-to
  py-4 px-4
  leading-7
  border border-transparent
  font-bold
  block
  w-full
  outline-none
  text-mh4
  lg:text-h4
  ${({ readOnly }) => readOnly && 'text-white/50'}
  ${({ hasError }) => hasError && 'text-danger-400'}
  ${({ center }) => center && 'text-center'}
  ${({ uppercase }) => uppercase && 'uppercase'}
`;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return (
    <div className='relative'>
      {props.prefix && <span className='absolute left-5 top-1/2 transform -translate-y-1/2'>{props.prefix}</span>}
      <TailwindTextInput ref={ref} {...props} />
      {props.suffix && <span className='absolute right-5 top-1/2 transform -translate-y-1/2'>{props.suffix}</span>}
    </div>
  );
});

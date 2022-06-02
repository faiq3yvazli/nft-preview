import { ComponentType, DetailedHTMLProps, HTMLAttributes } from 'react';
import tw from 'tailwind-styled-components';

export interface FieldLabelProps extends DetailedHTMLProps<HTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {}

export const FieldLabel: ComponentType<FieldLabelProps> = tw.label`
  font-bold
  text-lg lg:text-h4
  block
`;

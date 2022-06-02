import { ComponentType, DetailedHTMLProps, HTMLAttributes } from 'react';
import tw from 'tailwind-styled-components';

export interface FieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Field: ComponentType<FieldProps> = tw.div``;

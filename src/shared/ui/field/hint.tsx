import tw from 'tailwind-styled-components';
import { ComponentType, DetailedHTMLProps, HTMLAttributes } from 'react';
import styled from 'styled-components';

export type FieldHintExtraProps = {
  danger?: boolean;
};

export interface FieldHintProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, FieldHintExtraProps {}

const StyledFieldHint = styled.p<FieldHintExtraProps>``;

export const FieldHint: ComponentType<FieldHintProps> = tw(StyledFieldHint)`
  h-6
  text-lg
  ${({ danger }) => danger && 'text-danger-400'}
`;

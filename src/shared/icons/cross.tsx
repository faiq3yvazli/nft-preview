import { FC, SVGProps } from 'react';
import { baseIconProps } from './base-props';

export const CrossIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...baseIconProps} {...props} viewBox='2 2 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4 4L12.5161 12.5161' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M4 12.5166L12.5161 4.00047' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

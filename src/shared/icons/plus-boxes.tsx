import React, { FC, SVGProps } from 'react';
import { baseIconProps } from './base-props';

export const PlusBoxesIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...baseIconProps} viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect x='13.4727' y='0.5' width='26.027' height='26.027' fill='currentColor' stroke='black' />
      <rect x='10.2295' y='3.74316' width='26.027' height='26.027' fill='currentColor' stroke='black' />
      <rect x='6.98633' y='6.98633' width='26.027' height='26.027' fill='currentColor' stroke='black' />
      <rect x='3.74316' y='10.2297' width='26.027' height='26.027' fill='currentColor' stroke='black' />
      <rect x='0.5' y='13.4729' width='26.027' height='26.027' fill='currentColor' stroke='black' />
      <line x1='13' y1='20' x2='13' y2='34' stroke='black' strokeWidth='2' />
      <line x1='6' y1='27' x2='20' y2='27' stroke='black' strokeWidth='2' />
    </svg>
  );
};

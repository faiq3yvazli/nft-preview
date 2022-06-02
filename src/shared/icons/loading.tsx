import React, { FC, SVGProps } from 'react';
import { baseIconProps } from './base-props';

export const LoadingIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...baseIconProps} fill='none' viewBox='-2 -2 40 40' xmlns='http://www.w3.org/2000/svg' stroke='currentColor' {...props}>
      <circle strokeOpacity='.5' cx='18' cy='18' r='18' strokeWidth='4' />
      <path d='M36 18c0-9.94-8.06-18-18-18'>
        <animateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='1s' repeatCount='indefinite' />
      </path>
    </svg>
  );
};

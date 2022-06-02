import React, { FC, SVGProps } from 'react';
import { baseIconProps } from './base-props';

export const ShareIcon: FC<SVGProps<SVGSVGElement>> = () => {
  return (
    <svg {...baseIconProps} fill='none' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'>
      <path
        d='M11 1.03401H7.46259M11 6V10.2517C11 10.665 10.665 11 10.2517 11H1.7483C1.33503 11 1 10.665 1 10.2517V1.7483C1 1.33503 1.33503 1 1.7483 1H5.72789L11 6ZM6 6.20408L11 1.03401L6 6.20408ZM11 1.03401V4.46939V1.03401Z'
        stroke='currentColor'
        strokeWidth='1.5'
      />
    </svg>
  );
};

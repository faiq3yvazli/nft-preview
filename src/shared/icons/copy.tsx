import React, { FC, SVGProps } from 'react';
import { baseIconProps } from './base-props';

export const CopyIcon: FC<SVGProps<SVGSVGElement>> = () => {
  return (
    <svg {...baseIconProps} fill='none' viewBox='0 0 11 12' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'>
      <path
        d='M7.54545 8.5H9C9.55228 8.5 10 8.05228 10 7.5V2C10 1.44772 9.55228 1 9 1H4.45455C3.90226 1 3.45455 1.44772 3.45455 2V3.5M7.54545 8.5V4.5C7.54545 3.94772 7.09774 3.5 6.54546 3.5H3.45455L7.54545 8.5ZM7.54545 8.5V10C7.54545 10.5523 7.09774 11 6.54545 11H2C1.44771 11 1 10.5523 1 10V4.5C1 3.94772 1.44772 3.5 2 3.5H3.45455L7.54545 8.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
      />
    </svg>
  );
};

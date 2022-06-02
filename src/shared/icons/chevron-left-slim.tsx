import { FC, SVGProps } from 'react';
import { baseIconProps } from './base-props';

export const ChevronLeftSlim: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...baseIconProps} {...props} viewBox='0 0 17 30' xmlns='http://www.w3.org/2000/svg'>
      <path d='M16.4023 1.76777L14.6346 0L0.000701904 14.6339L14.6346 29.2678L16.4023 27.5L3.53722 14.6339L16.4023 1.76777Z' />
    </svg>
  );
};

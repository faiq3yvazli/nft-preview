import { FC, SVGProps } from 'react';
import { baseIconProps } from './base-props';

export const ChevronBottomIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...baseIconProps} {...props} viewBox='0 0 8 6' xmlns='http://www.w3.org/2000/svg'>
      <path d='M5.59829 4.28615L8 1.71507L6.39943 0L4 2.5723L1.59943 0L0 1.71507L2.39943 4.28615L4 6L5.59829 4.28615Z' />
    </svg>
  );
};

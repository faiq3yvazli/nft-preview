import React, { FC, SVGProps } from 'react';
import { baseIconProps } from './base-props';

export const YoutubeIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...baseIconProps} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M21.543 6.498C22 8.28 22 12 22 12C22 12 22 15.72 21.543 17.502C21.289 18.487 20.546 19.262 19.605 19.524C17.896 20 12 20 12 20C12 20 6.107 20 4.395 19.524C3.45 19.258 2.708 18.484 2.457 17.502C2 15.72 2 12 2 12C2 12 2 8.28 2.457 6.498C2.711 5.513 3.454 4.738 4.395 4.476C6.107 4 12 4 12 4C12 4 17.896 4 19.605 4.476C20.55 4.742 21.292 5.516 21.543 6.498ZM10 15.5L16 12L10 8.5V15.5Z' />
    </svg>
  );
};

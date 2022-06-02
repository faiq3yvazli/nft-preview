import React, { FC, SVGProps } from 'react';
import { baseIconProps } from './base-props';

export const CashOnHandIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...baseIconProps} viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M16.342 19.9664H12.782V23.5706C14.5679 23.2017 15.9777 21.7745 16.342 19.9664Z' />
      <path d='M27.391 29.2102C28.9038 29.2102 30.1302 27.9686 30.1302 26.4371C30.1302 24.9055 28.9038 23.6639 27.391 23.6639C25.8782 23.6639 24.6518 24.9055 24.6518 26.4371C24.6518 27.9686 25.8782 29.2102 27.391 29.2102Z' />
      <path d='M35.2141 40.883L19.944 38.4418C19.8117 38.4205 19.6911 38.366 19.5834 38.293L19.5806 38.2976L11.3631 32.7513L12.3757 31.2132L19.8336 36.2464L20.5658 35.1344C20.8507 34.7036 21.0005 34.2017 21.0005 33.6831C21.0005 32.8844 20.6462 32.1403 20.0308 31.6411L14.7688 27.3798C12.267 25.3545 8.61201 24.9607 5.74134 26.412L4.68402 26.9472C3.22677 27.6839 1.62434 28.1285 0 28.2505V38.4538H3.65225C5.5843 38.4538 7.51999 38.916 9.24933 39.7914L14.4903 42.4443C16.5009 43.4621 18.7516 44 20.9995 44H34.9731C35.8268 44 36.5216 43.2966 36.5216 42.4332C36.5216 41.6558 35.972 41.0041 35.2141 40.883Z' />
      <path d='M38.44 32.9075H42V29.3033C40.214 29.6722 38.8043 31.0994 38.44 32.9075Z' />
      <path d='M36.5947 19.9664H18.1873C17.8695 22.2006 16.4251 24.067 14.4538 24.9544C14.9642 25.2381 15.4518 25.5663 15.9101 25.937L17.3473 27.1017V25.5127H20.9995V27.3614H17.6687L21.1721 30.1983C22.0203 30.8861 22.57 31.8474 22.7535 32.9077H36.5947C36.9973 30.08 39.2069 27.843 42 27.4354V25.4387C39.2069 25.0311 36.9973 22.7941 36.5947 19.9664ZM27.391 31.0589C24.8737 31.0589 22.8257 28.9855 22.8257 26.437C22.8257 23.8886 24.8737 21.8152 27.391 21.8152C29.9083 21.8152 31.9563 23.8886 31.9563 26.437C31.9563 28.9855 29.9083 31.0589 27.391 31.0589ZM37.4347 27.3614H33.7824V25.5127H37.4347V27.3614Z' />
      <path d='M42 23.5706V19.9664H38.44C38.8043 21.7745 40.214 23.2017 42 23.5706Z' />
      <path d='M24.6112 11.3168L25.2733 13.8187C25.3466 14.0954 25.6272 14.259 25.9 14.185L26.5831 13.9997L25.5779 18.9725L22.2514 15.1747L22.9345 14.9894C23.2073 14.9154 23.3695 14.6317 23.2963 14.355L22.6341 11.8531C21.3641 7.05446 16.5972 4.13115 11.8515 5.13908L11.3211 3.13506C17.1578 1.83386 23.0489 5.41432 24.6112 11.3168Z' />
    </svg>
  );
};
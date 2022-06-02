import React, { FC, SVGProps } from 'react';
import { baseIconProps } from './base-props';

export const UserCashIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...baseIconProps} viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#clip0_1656_30178)'>
        <path
          d='M15.3848 16.4666C20.0193 16.4666 23.7764 12.7804 23.7764 8.23328C23.7764 3.68617 20.0193 0 15.3848 0C10.7502 0 6.99316 3.68617 6.99316 8.23328C6.99316 12.7804 10.7502 16.4666 15.3848 16.4666Z'
          fill='currentColor'
        />
        <path
          d='M27.3274 20.9331C26.0052 20.2677 23.8991 19.3344 21.3806 18.6677C21.031 18.5712 20.6622 18.7622 20.5406 19.0986L17.6742 26.9442L16.8064 22.6859L18.1463 18.7421C18.2173 18.533 18.1819 18.3026 18.0494 18.1236C17.9183 17.9447 17.7079 17.8389 17.4825 17.8389H13.2867C13.0614 17.8389 12.851 17.9447 12.7199 18.1236C12.5874 18.3025 12.5519 18.533 12.623 18.7421L13.9629 22.6859L13.095 26.9442L10.2287 19.0986C10.1072 18.7622 9.73703 18.5719 9.38871 18.6677C6.87011 19.3344 4.76401 20.2677 3.44194 20.9331C1.31938 22.0025 0 24.113 0 26.44V27.4444C0 28.958 1.2552 30.1889 2.79723 30.1889H13.2867H17.4825H27.9721C29.5141 30.1889 30.7693 28.958 30.7693 27.4444V26.44C30.7692 24.113 29.4498 22.0025 27.3274 20.9331Z'
          fill='currentColor'
        />
      </g>
      <rect x='22.8076' y='23.1416' width='16.6923' height='16.3585' fill='currentColor' stroke='black' />
      <path
        d='M27.6924 32.7748V33.3786C27.6924 34.3774 28.5205 35.1899 29.5385 35.1899H30.1539V36.7194H31.3847V35.1899H31.8486C32.9502 35.1899 33.8462 34.3107 33.8462 33.23C33.8462 32.3287 33.2239 31.5469 32.333 31.3284L31.3847 31.0958V29.1521H32.0001C32.3393 29.1521 32.6155 29.4231 32.6155 29.7559V30.3597H33.8462V29.7559C33.8462 28.7571 33.0181 27.9446 32.0001 27.9446H31.3847V26.415H30.1539V27.9446H29.69C28.5884 27.9446 27.6924 28.8237 27.6924 29.9045C27.6924 30.8057 28.3147 31.5876 29.2056 31.806L30.1539 32.0387V33.9823H29.5385C29.1993 33.9823 28.9232 33.7114 28.9232 33.3786V32.7748H27.6924ZM31.3847 32.3406L32.0343 32.5C32.3766 32.5837 32.6155 32.8838 32.6155 33.23C32.6155 33.6448 32.2714 33.9823 31.8486 33.9823H31.3847V32.3406ZM29.5043 30.6344C29.162 30.5507 28.9232 30.2506 28.9232 29.9045C28.9232 29.4897 29.2672 29.1521 29.69 29.1521H30.1539V30.7938L29.5043 30.6344Z'
        fill='black'
      />
      <defs>
        <clipPath id='clip0_1656_30178'>
          <rect width='30.7692' height='30.1887' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

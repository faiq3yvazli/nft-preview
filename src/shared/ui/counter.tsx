import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import tw from 'tailwind-styled-components';

const Wrapper = tw.div`w-full grid grid-cols-4 gap-4 lg:gap-6`;
const Item = tw.div`text-center rounded [background:linear-gradient(275.5deg,#1A294D_72.47%,#1A2F45_100%)] 2xl:h-[146px] 2xl:w-full 2xl:mx-auto px-0.5`;
const Value = tw.p`text-mh2 lg:text-4xl 2xl:text-h2 text-primary-400 font-iceberg py-5 mb-2`;
const Title = tw.h1`2xl:text-h5 text-white/50 font-iceberg uppercase pb-2 lg:pb-3`;

export type CounterProps = {
  date: string;
  texts?: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
};

export const Counter: FC<CounterProps> = ({ date, texts }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      setDays(dayjs(date, 'YYYY-MM-DD').diff(dayjs(), 'day'));
      setHours(dayjs(date).diff(dayjs(), 'hour') % 24);
      setMinutes(dayjs(date).diff(dayjs(), 'minutes') % 60);
      setSeconds(dayjs(date).diff(dayjs(), 'seconds') % 60);
    };

    calculateTime();

    const interval = setInterval(calculateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return (
    <Wrapper>
      <Item>
        <Value>{days}</Value>
        <Title>{texts?.days || 'Days'}</Title>
      </Item>
      <Item>
        <Value>{hours}</Value>
        <Title>{texts?.hours || 'Hours'}</Title>
      </Item>
      <Item>
        <Value>{minutes}</Value>
        <Title>{texts?.minutes || 'Minutes'}</Title>
      </Item>
      <Item>
        <Value>{seconds}</Value>
        <Title>{texts?.seconds || 'Seconds'}</Title>
      </Item>
    </Wrapper>
  );
};

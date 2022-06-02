import { FC } from 'react';

export type MintLiveWidgetProps = {
  totalRounds: number;
  currentRound: number;
  status: 'live';
};

export const MintLiveWidget: FC<MintLiveWidgetProps> = ({ totalRounds, currentRound, status }) => {
  return (
    <div className='border border-primary-400 pb-2 pt-2 lg:pt-1 px-2 w-full flex lg:flex-col justify-between items-center bg-black/20 lg:bg-transparent text-lg lg:text-base'>
      <p className='font-bold px-2'>
        Mint&nbsp;
        <span className='text-primary-400'>
          {currentRound} of {totalRounds} rounds
        </span>
      </p>
      {status === 'live' && (
        <button className='bg-primary-400 text-black lg:w-full font-bold inline-flex items-center justify-center px-4 py-2 lg:py-0'>
          <span className='h-1.5 w-1.5 rounded-full bg-black inline-flex mr-1.5' />
          <span className='text-lg lg:text-base'>Live</span>
        </button>
      )}
    </div>
  );
};

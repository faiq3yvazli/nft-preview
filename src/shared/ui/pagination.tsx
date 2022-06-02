import { FC } from 'react';
import { ChevronLeftSlim } from '@root/shared/icons/chevron-left-slim';

export type PaginationProps = {
  className?: string;
  total: number;
  page: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({ className, total, page, onPageChange }) => {
  const canGoPrev = page > 1;
  const canGoNext = page < total;

  return (
    <div className={className}>
      <div className='flex justify-center'>
        <button disabled={!canGoPrev} onClick={() => onPageChange(page - 1)} className='bg-primary-500 p-3.5 text-3xl mr-2 disabled:opacity-60'>
          <ChevronLeftSlim />
        </button>
        <button disabled={!canGoNext} onClick={() => onPageChange(page + 1)} className='bg-primary-500 p-3.5 text-3xl ml-2 disabled:opacity-60'>
          <ChevronLeftSlim className='rotate-180' />
        </button>
      </div>
    </div>
  );
};

import { LoadingIcon } from '@root/shared/icons/loading';

export const LoadingSection = () => {
  return (
    <div className='relative h-64 w-full'>
      <LoadingIcon className='text-4xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2' />
    </div>
  );
};

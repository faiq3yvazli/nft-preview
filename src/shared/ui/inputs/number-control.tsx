import { FC } from 'react';

export type NumberControlProps = {
  value: number | string;
  max?: number;
  onChange?: (value: number) => void;
};

export const NumberControl: FC<NumberControlProps> = ({ value: dirtyValue, max, onChange }) => {
  const parsedValue = parseInt(dirtyValue.toString());
  const value = !isNaN(parsedValue) ? parsedValue : 1;

  return (
    <div className='text-mh3 lg:text-h3 '>
      <button disabled={value === 1} onClick={() => onChange?.(value - 1)} className='pr-3 [text-shadow:0_0_6px_rgba(255,255,255,0.65)]'>
        -
      </button>
      <span className='2xl:px-4 [text-shadow:0_0_6px_rgba(255,255,255,0.65)]'>{value}</span>
      <button disabled={!!max && value === max} onClick={() => onChange?.(value + 1)} className='pl-3 [text-shadow:0_0_6px_rgba(255,255,255,0.65)]'>
        +
      </button>
    </div>
  );
};

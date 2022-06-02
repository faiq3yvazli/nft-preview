import { FC, ReactNode } from 'react';
import ReactModal from 'react-modal';
import clsx from 'clsx';
import { CrossIcon } from '@root/shared/icons/cross';

export type ModalProps = {
  isOpen: boolean;
  className?: string;
  title?: string;
  onCancel?: () => void;
  header?: ReactNode;
  center?: boolean;
  hideClose?: boolean;
};

ReactModal.setAppElement('#root');

export const Modal: FC<ModalProps> = ({ className, isOpen, title, onCancel, header, center, hideClose, children }) => {
  return (
    <ReactModal
      className={clsx('bg-gradient-to-r from-gradient-ternary-from to-gradient-ternary-to p-8 w-full outline-none mx-auto relative', { 'my-8 lg:mt-24': !center }, className)}
      overlayClassName={clsx('fixed z-50 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 overflow-auto backdrop-blur-sm', {
        'flex justify-center items-center': center,
        'py-8 lg:px-8': !center,
      })}
      isOpen={isOpen}
      onRequestClose={onCancel}
    >
      {header || <div className='-mt-2'>{!!title && <h1 className='font-bold text-2xl uppercase'>{title}</h1>}</div>}
      {!hideClose && (
        <button className='absolute top-6 right-6 p-1.5' onClick={onCancel}>
          <CrossIcon />
        </button>
      )}
      <div className='pt-4'>{children}</div>
    </ReactModal>
  );
};

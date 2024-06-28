import React, { ReactNode } from 'react';
import ico_plus from '../../assets/images/ico_plus.svg';
import ico_x from '../../assets/images/ico_x.svg';

interface Props {
  className?: String;
  children?: ReactNode;
}
export function ButtonRounded({ className, children, ...rest }: Props) {
  return (
    <button
      className='flex justify-center items-center bg-blue-500 text-white font-semibold text-base leading-none border-0 cursor-pointer rounded-full'
      {...rest}>
      {children}
    </button>
  );
}
export function Button({ className, children, ...rest }: Props) {
  return (
    <button
      className='w-32 h-12 flex justify-center items-center bg-blue-500 text-white font-semibold text-base leading-none border-0 cursor-pointer rounded-md'
      {...rest}>
      {children}
    </button>
  );
}

export function ButtonAddImage({ className, children, ...rest }: Props) {
  return (
    <button
      className={`w-42 h-42 flex flex-col justify-center items-center bg-gray-100 rounded-md`}
      {...rest}>
      <span>
        <img src={ico_plus} alt='' />
      </span>
      <span className='text-gray-400'>이미지 등록</span>
      {children}
    </button>
  );
}

export function ButtonDeleteRound({ className, children, ...rest }: Props) {
  return (
    <button
      className={`w-5 h-5 flex justify-center items-center bg-gray-100 rounded-full bg-gray-400 ${className}`}
      {...rest}>
      <img src={ico_x} alt='' />
    </button>
  );
}

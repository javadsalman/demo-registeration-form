import * as React from 'react';
import Background from '../../compontents/Background/Background';
import FormBox from '../../containers/FormBox/RegisterFormBox';

export interface IRegisterPageProps {
}

export default function RegisterPage (props: IRegisterPageProps) {
  return (
    <>
      <div className='h-full w-full flex justify-center items-start relative z-10'>
        <div className='w-full sm:w-10/12 lg:w-1/2 p-5 mt-10'>
          <FormBox />
        </div>
      </div>
      <Background />
    </>
  );
}

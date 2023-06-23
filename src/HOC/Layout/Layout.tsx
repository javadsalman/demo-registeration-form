import * as React from 'react';
import Navbar from '../../compontents/Navbar/Navbar';

export interface ILayoutProps {
    children: React.ReactNode
}

export default function Layout (props: ILayoutProps) {
  return (
    <div className='flex'>
      <div className='fixed z-20 w-full'>
        <Navbar />
      </div>
      <div className='h-screen w-screen pt-24'>
        {props.children}
      </div>
    </div>
  );
}

import * as React from 'react';
import WestIcon from '@mui/icons-material/West';

export interface INavbarProps {
}

export default function Navbar (props: INavbarProps) {
  return (
    <div className='pt-10 px-20 pb-5 border-b flex items-center gap-3'>
        <WestIcon className='mr-3' />
        <div>Account Verification</div>
        <div className='p-1 bg-indigo-100 text-indigo-500 inline-block rounded-lg text-xs'>
          In Progress
        </div>
      </div>
  );
}

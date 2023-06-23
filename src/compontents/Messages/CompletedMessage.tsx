import * as React from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export interface ICompletedMessageProps {
}

export default function CompletedMessage (props: ICompletedMessageProps) {
  return (
    <div className='flex flex-col items-center h-72 justify-around text-indigo-500'>
      <CheckCircleRoundedIcon sx={{fontSize: 200}} />
      <div className='text-3xl font-semibold'>REGISTRATION COMPLETED SUCCESSFULLY!</div>
    </div>
  );
}

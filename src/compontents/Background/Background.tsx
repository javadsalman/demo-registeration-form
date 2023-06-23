import * as React from 'react';
import classes from './Background.module.sass'


export interface IBackgroundProps {
}

export default function Background(props: IBackgroundProps) {

  return (
    <div className='absolute w-screen h-screen top-0 left-0 overflow-hidden z-0'>
      <div className={classes.ShapePre1}></div>
      <div className={classes.Shape1}></div>
      <div className={classes.Shape2}>
        <div className="h-16 w-5/12 bg-violet-200 rounded-r"></div>
      </div>
      <div className={classes.Shape3}>
        <div className="h-16 w-3/12 bg-indigo-500 rounded-r"></div>
      </div>
      <div className={classes.Shape4}>
        <div className="ml-auto h-16 w-3/12 bg-indigo-500 rounded-l"></div>
      </div>
      <div className={classes.Shape5}>
        <div className="ml-auto h-16 w-5/12 bg-violet-200 rounded-l"></div>
      </div>
      <div className={classes.Shape6}>
        <div className="ml-auto h-16 w-1/12 bg-purple-100 rounded-l"></div>
      </div>
    </div>
  );
}

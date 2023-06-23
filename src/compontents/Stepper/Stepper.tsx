import classNames from 'classnames';
import * as React from 'react';

export interface IStepperProps {
  stepCount: number
  currentStep: number
}

export default function Stepper(props: IStepperProps) {

  const contentJSX = React.useMemo(() => {
    const content = []
    for (let i=0; i<props.stepCount; i++) {
      let status: statusTypes;
      if (i < props.currentStep)
        status = 'full'
      else if (i === props.currentStep)
        status = 'half'
      else
        status = 'empty'

      if (i < props.stepCount-1) {
        content.push(
          <>
            <StepperNubmer number={i} active={i <= props.currentStep} />
            <StepperDivider status={status} />
          </>
        )
      } else {
        content.push(
            <StepperNubmer number={i} active={i <= props.currentStep} />
        )
      }
    }
    return content
  }, [props])

  return (
    <div className='flex items-center px-5 py-2 gap-5 select-none'>
      {contentJSX}
    </div>
  );
}

type StepperNumberProps = { number: number; active: boolean }
function StepperNubmer(props: StepperNumberProps) {
  return (
    <div className={classNames(
      'w-10 h-10 shrink-0 relative rounded-full duration-300',
      { 'bg-indigo-500': props.active, 'bg-gray-200': !props.active }
    )}>
      <div className={classNames(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-xl',
        { 'text-white': props.active, 'text-black': !props.active }
      )}>
        {props.number+1}
      </div>
    </div>
  )
}

type statusTypes = 'empty' | 'half' | 'full'
type StepperDividerProps = { status: statusTypes }
function StepperDivider(props: StepperDividerProps) {
  return (
    <div className='w-full flex h-[5px] bg-gray-200 rounded-xl'>
      <div
        className={classNames({
          'basis-0': props.status === 'empty',
          'basis-1/2 delay-200': props.status === 'half',
          'basis-full': props.status === 'full',
        },
        'bg-indigo-500 h-full rounded-xl duration-300'
        )}>

      </div>
    </div>
  )
}

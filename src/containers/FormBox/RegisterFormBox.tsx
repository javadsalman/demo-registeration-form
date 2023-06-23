import * as React from 'react';
import Stepper from '../../compontents/Stepper/Stepper';
import FirstForm from './Forms/FirstForm';
import SecondForm from './Forms/SecondForm';
import ThirdForm from './Forms/ThirdForm';
import CompletedMessage from '../../compontents/Messages/CompletedMessage';

export interface IFormBoxProps {
}

const TOTAL_STEP_COUNT = 4
export default function FormBox(props: IFormBoxProps) {
    const [step, setStep] = React.useState<number>(0)
    const [fullName, setFullName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [country, setCountry] = React.useState<string>('')
    const [city, setCity] = React.useState<string>('')
    const [postalCode, setPostalCode] = React.useState<string>('')
    const [accepted, setAccepted] = React.useState<boolean>(false)


    const goNextStep = () => {
        setStep(prev => prev < TOTAL_STEP_COUNT ? prev + 1 : prev)
    }

    const goPrevStep = () => {
        setStep(prev => prev > 0 ? prev - 1 : prev)
    }

    const firstFormSubmit = React.useCallback((fullName: string, email: string, password: string) => {
        setFullName(fullName)
        setEmail(email)
        setPassword(password)
        goNextStep()
    }, [])

    const secondFomrSubmit = React.useCallback((country: string, city: string, postalCode: string) => {
        setCountry(country)
        setCity(city)
        setPostalCode(postalCode)
        goNextStep()
    }, [])

    const secondFormCancel = React.useCallback(() => {
        setCountry('')
        setCity('')
        setPostalCode('')
        goPrevStep()
    }, [])

    const thirdFormSubmit = React.useCallback(() => {
        setAccepted(true)
        goNextStep()
    }, [])

    const thirdFormCancel = React.useCallback(() => {
        setAccepted(false)
        goPrevStep()
    }, [])
    

    let currentFormJSX = null;
    switch (step) {
        case 0:
            currentFormJSX = <FirstForm
                onSubmit={firstFormSubmit}
                values={{ fullName, email, password }}
            />;
            break
        case 1:
            currentFormJSX = <SecondForm
                values={{ country, city, postalCode }}
                onSubmit={secondFomrSubmit}
                onCancel={secondFormCancel}
            />;
            break
        case 2:
            currentFormJSX = <ThirdForm values={{accepted}} onSubmit={thirdFormSubmit} onCancel={thirdFormCancel} />
            break;
        case 3:
            currentFormJSX = <CompletedMessage />
            break;
        default:
            currentFormJSX = null;
    }

    return (
        <div className='border p-5 px-10 rounded backdrop-blur-md bg-white bg-opacity-20'>
            <Stepper stepCount={TOTAL_STEP_COUNT} currentStep={step} />
            <div className='h-[3px] w-full mx-auto bg-gray-200 my-3'></div>
            <div className=''>
                {currentFormJSX}
            </div>
        </div>
    );
}

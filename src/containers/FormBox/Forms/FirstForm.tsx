import { Form, Formik, FormikProps, } from 'formik';
import * as React from 'react';
import CustomTextField from '../../../compontents/FormElements/CustomTextField';
import { Button } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import * as Yup from 'yup';


export interface IFirstFormProps {
  values: {fullName: string; email: string; password: string}
  onSubmit: (fullName: string, email: string, password: string) => void;
}

const emptyMessage = 'This field can\'t be empty'
const validationScheme = Yup.object({
  fullName: Yup.string().required(emptyMessage),
  email: Yup.string().email('Invalid Email').required(emptyMessage),
  password: Yup.string().min(8, 'Must be 8 char minimum')
    .matches(/[A-Z]/, 'Must contain at least 1 uppercase letter')
    .matches(/[a-z]/, 'Must contain at least 1 lowercase letter')
    .matches(/[0-9]/, 'Must contain at least 1 number')
    .matches(/[!-//:-@[-`{-~]/, 'Must contain at least 1 special char')
    .required(emptyMessage),
  passwordAgain: Yup.string().oneOf([Yup.ref('password')], 'Must be same password').required(emptyMessage)
})

export default function FirstForm (props: IFirstFormProps) {

  const formikRef = React.useRef<FormikProps<{
    fullName: string;
    email: string;
    password: string;
    passwordAgain: string;
  }>>(null)


  const submitHandler = React.useCallback(() => {
    const { fullName, email, password } = formikRef.current!.values
    props.onSubmit(fullName, email, password)
  }, [props, formikRef])
  
  return (
    <div className='pt-2'>
      <Formik
        initialValues={{
            fullName: props.values.fullName,
            email: props.values.email,
            password: props.values.password,
            passwordAgain: props.values.password,
        }}
        innerRef={formikRef}
        validationSchema={validationScheme}
        onSubmit={submitHandler}
      >
        <Form>
          <div className='mb-2'>Full Name</div>
          <CustomTextField name="fullName" size="small" fullWidth />
          <div className='mb-2 mt-4'>Email</div>
          <CustomTextField name="email" type="email" size="small" fullWidth />
          <div className='mb-2 mt-4'>Password</div>
          <CustomTextField name="password" type="password" size="small" fullWidth />
          <div className='mb-2 mt-4'>Password Again</div>
          <CustomTextField name="passwordAgain" type="password" size="small" fullWidth />
          <Button variant='contained' size='small' fullWidth sx={{mt: 2}} endIcon={<ArrowRightAltIcon />} type="submit" >
            Continue
          </Button>
          {/* <Button onClick={reset} variant='contained' size='small' color='inherit' fullWidth sx={{mt: 1}} endIcon={<KeyboardBackspaceIcon />} >
            Back
          </Button> */}
        </Form>
      </Formik>
    </div>
  );
}

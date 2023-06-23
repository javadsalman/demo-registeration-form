import * as React from 'react';
import TextField from '@mui/material/TextField'
import { useField } from 'formik';
import _ from 'lodash';

export interface ICustomTextFieldProps {
}

export default function CustomTextField(props: any) {
    const [field, meta] = useField(props)
    const hasError = Boolean(meta.touched && !_.isEmpty(meta.error))
    return (
        <div>
            <TextField 
            {...field} 
            {...props} 
            error={hasError} 
            helperText={hasError && meta.error}
            />
        </div>
    );
}

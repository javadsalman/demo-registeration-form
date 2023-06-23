import * as React from 'react';
import { FormControl, InputLabel, Select, FormHelperText} from '@mui/material'
import { useField } from 'formik';
import _ from 'lodash';

export default function CustomSelectField(props: any) {
    const [field, meta] = useField(props)
    const hasError = Boolean(meta.touched && !_.isEmpty(meta.error))
    return (
        <FormControl error={hasError} fullWidth>
            <InputLabel>{props.label}</InputLabel>
            <Select
                {...field}
                {...props}
            >
                {props.children}
            </Select>
            {hasError && <FormHelperText>{meta.error}</FormHelperText>}
      </FormControl>
    );
}

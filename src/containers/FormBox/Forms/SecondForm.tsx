import * as React from 'react';
import { getCityList, getCountryList } from '../../../api/geoApi';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TextField, FormControl, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


type valuesType = { country: string; city: string; postalCode: string }
export interface ISecondFormProps {
  values: valuesType
  onSubmit: (country: string, city: string, postalCode: string) => void
  onCancel: () => void
}

const emptyMessage = 'This field can\'t be empty'
const validationSchema = Yup.object({
  country: Yup.string().required(emptyMessage),
  city: Yup.string().required(emptyMessage),
  postalCode: Yup.string()
})

export default function SecondForm(props: ISecondFormProps) {
  const [countries, setCountries] = React.useState<{ title: string }[]>();
  const [cities, setCities] = React.useState<{ title: string }[]>();


  const submitHandler = React.useCallback((values: valuesType) => {
    props.onSubmit(values.country, values.city, values.postalCode)
  }, [props])

 

  const formik = useFormik({
    initialValues: {
      country: props.values.country,
      city: props.values.city,
      postalCode: props.values.postalCode
    },
    validationSchema: validationSchema,
    onSubmit: submitHandler,
  })

  const cancelHandler = React.useCallback(() => {
    formik.resetForm()
    props.onCancel()
  }, [formik, props])

  React.useEffect(() => {
    getCountryList().then(res => {
      setCountries(res.data)
    })

    const preSelectedCountry = props.values.country
    if (preSelectedCountry) {
      getCityList(preSelectedCountry).then(res => {
        setCities(res.data)
      })
    }
  }, [props.values.country])


  const countryChangeHandler = React.useCallback((e: SelectChangeEvent) => {
    formik.setValues(values => ({ ...values, city: '' }))
    setCities([])
    const country = e.target.value
    if (country) {
      getCityList(country).then(res => {
        setCities(res.data)
      })
    }
    formik.handleChange(e)
  }, [formik])

  console.log(formik.values.city)


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='mb-2'>Country</div>
      <FormControl error={Boolean(formik.touched.country && formik.errors.country)} fullWidth>
        <Select size="small" displayEmpty {...formik.getFieldProps('country')} onChange={countryChangeHandler}>
          <MenuItem value="" disabled>Your Country</MenuItem>
          {countries?.map(c => (
            <MenuItem value={c.title}>{c.title}</MenuItem>
          ))}
        </Select>
        {formik.touched.country && <FormHelperText>{formik.errors.country}</FormHelperText>}
      </FormControl>
      <div className='mb-2 mt-3'>City</div>
      <FormControl error={Boolean(formik.touched.city && formik.errors.city)} fullWidth>
        <Select size="small" displayEmpty {...formik.getFieldProps('city')}>
          <MenuItem value="" disabled>Your City</MenuItem>
          {cities?.map(c => (
            <MenuItem value={c.title}>{c.title}</MenuItem>
          ))}
        </Select>
        {formik.touched.city && <FormHelperText>{formik.errors.city}</FormHelperText>}
      </FormControl>
      <div className='mb-2 mt-3'>Postal Code</div>
      <TextField
        size="small"
        fullWidth
        placeholder='Code'
        {...formik.getFieldProps('postalCode')}
        error={Boolean(formik.touched.postalCode && formik.errors.postalCode)}
        helperText={formik.touched.postalCode && formik.errors.postalCode ? formik.errors.postalCode : ''}
        />
        <Button variant='contained' size='small' fullWidth sx={{mt: 2}} endIcon={<ArrowRightAltIcon />} type="submit" >
            Continue
          </Button>
        <Button onClick={cancelHandler} variant='contained' size='small' color='inherit' fullWidth sx={{mt: 1}} endIcon={<KeyboardBackspaceIcon />} >
          Back
        </Button>
    </form>
  );
}

import { useFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { FormControl, FormControlLabel, FormHelperText, Checkbox, Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';



export interface IThirdFormProps {
    values: {accepted: boolean}
    onSubmit: () => void
    onCancel: () => void
}

const agreementText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos odit fugit maxime, corrupti rem eum, excepturi fuga eaque voluptatibus quos quam exercitationem officiis odio natus corporis dolores iusto earum error rerum iste dolore possimus quisquam! Fugit molestiae dolor aperiam quas doloremque reprehenderit culpa repellendus asperiores in nesciunt quae hic accusantium nobis reiciendis esse, cumque pariatur, rem, inventore eos quod! Ratione esse sequi fuga autem totam magni itaque id eveniet pariatur provident maiores dignissimos quis distinctio, quos in minima officia impedit et praesentium error voluptatem architecto laudantium! Odio, provident. Corrupti velit, eveniet ullam fuga amet obcaecati ut, dolorem aperiam, blanditiis sint magni doloremque? Impedit odit magni recusandae sed assumenda iure, voluptatum facilis adipisci tenetur ratione molestias quam maiores id neque dignissimos numquam, beatae culpa nesciunt optio vel. Fugiat quis dolor suscipit est, accusamus laboriosam voluptates sunt numquam reprehenderit nesciunt nihil culpa, officiis eius voluptatem. Reprehenderit dicta quia quod possimus consectetur explicabo iste harum dolorem labore nulla corrupti esse quidem incidunt dignissimos, soluta voluptates cumque libero inventore ea, dolorum adipisci? Quo nobis nihil mollitia fugit. Consequatur tenetur velit iste dolorem? Nobis voluptates totam, facere eos distinctio quia deserunt similique quae consequatur, autem officia tempora porro exercitationem modi voluptas id ipsa quo, dolorum aperiam dolore repellat rerum ex. Corporis, quidem recusandae obcaecati, cumque ullam quia officiis laboriosam, culpa dignissimos excepturi consequuntur commodi minima suscipit esse. Voluptatum, earum. Minus quis quas, magni vitae ratione adipisci consequatur eligendi architecto corrupti nulla animi iusto quasi perspiciatis facilis id. Harum maiores vel laborum. Voluptas, iste eveniet. Quisquam at, libero quia est architecto quaerat doloremque, asperiores laboriosam facilis expedita excepturi eius quam, velit ut fugit deserunt ab veritatis ex voluptatem cum. Eaque perferendis labore molestiae corporis ipsam similique tempora nobis laboriosam eligendi nesciunt, maxime perspiciatis hic laborum tenetur debitis saepe molestias architecto magnam fuga odio. Vel, id est inventore voluptatum quisquam laborum iusto voluptas deleniti nesciunt minima quod eum earum doloribus dolor harum nostrum! Amet suscipit sint qui tenetur velit assumenda, quibusdam numquam, facilis minima autem error ipsa, molestias earum aliquam? Enim neque quis vel, ad laudantium autem similique magni suscipit. Similique, tenetur perferendis? Dolorum similique est enim? Non temporibus culpa ut cupiditate, iste enim quia excepturi nobis fugit omnis harum molestiae quo similique aliquam a, illo odit! Provident consequatur unde quo distinctio nulla sit illum reiciendis numquam, blanditiis molestiae consectetur libero dignissimos fuga nemo animi? Dicta quaerat explicabo excepturi unde, dolore repellendus id beatae iusto libero molestias.'
const emptyMessage = 'This field can\'t be empty'
const validationSchema = Yup.object({
    'accepted': Yup.boolean().oneOf([true], 'You must accept the terms & rules').required(emptyMessage)
})

export default function ThirdForm(props: IThirdFormProps) {
    const [readed, setReaded] = React.useState<boolean>(false);

    const submitHandler = React.useCallback(() => {
        props.onSubmit()
    }, [props])

    
    const formik = useFormik({
        initialValues: { accepted: false },
        validationSchema: validationSchema,
        onSubmit: submitHandler
    })

    const cancelHandler = React.useCallback(() => {
        formik.resetForm()
        props.onCancel()
    }, [formik, props])


    const agreementTextScrollHandler = React.useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget!
        const isEnd = element.scrollTop + element.offsetHeight >= element.scrollHeight;
        if (isEnd) {
            setReaded(true)
        }
    }, [])

    const hasAcceptedError = Boolean(formik.touched.accepted && formik.errors.accepted)
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='mb-2 text-xl'>User Agreement</div>
            <div className='w-full h-80 bg-slate-200 p-3 mb-1'>
                <div onScroll={agreementTextScrollHandler} className='overflow-auto h-full p-3'>
                    {agreementText}
                </div>
            </div>
            <FormControl
                error={hasAcceptedError}
                disabled={!readed}
                variant="standard"
            >
                <FormControlLabel
                    control={
                        <Checkbox {...formik.getFieldProps('accepted')} />
                    }
                    label="Accept Agreement"
                />
                {hasAcceptedError && <FormHelperText sx={{ my: 0 }}>{formik.errors.accepted}</FormHelperText>}
            </FormControl>
            <Button variant='contained' size='small' fullWidth sx={{ mt: 1 }} type="submit" >
                Complete
            </Button>
            <Button onClick={cancelHandler} variant='contained' size='small' color='inherit' fullWidth sx={{ mt: 1 }} endIcon={<KeyboardBackspaceIcon />} >
                Back
            </Button>
        </form>
    );
}

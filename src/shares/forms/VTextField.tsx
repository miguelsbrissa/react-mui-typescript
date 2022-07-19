import { useEffect, useState } from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { useField } from '@unform/core'


type TVTextFieldProps = TextFieldProps & {
    name: string
}
export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name)

    const [value, setValue] = useState(defaultValue || '')


    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
        })
    }, [registerField, fieldName, value])


    return (
        <TextField
            {...rest}

            //o primeiro ! faz um cast de string undefined para boolean negativo o segundo ! inverte o false é true
            error={!!error}
            helperText={error}
            defaultValue={defaultValue}
            onKeyDown={(e) => {error && clearError(); rest.onKeyDown?.(e)}}
            value={value}
            onChange={e => {setValue(e.target.value); rest.onChange?.(e)}}
        />
    )
}
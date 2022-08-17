import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useAuthContext } from '../../contexts'
import * as yup from 'yup'

interface ILoginProps {
    children: React.ReactNode
}

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().required().min(5)
})

export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [emailError, setEmailError] = useState('')
    const [senhaError, setSenhaError] = useState('')

    const handleSubmit = () => {
        setIsLoading(true)
        loginSchema.validate({ email, senha }, { abortEarly: false })
            .then(dadosValidados => {
                login(dadosValidados.email, dadosValidados.senha)
                    .then(() => {
                        setIsLoading(false)
                    })
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false)
                errors.inner.forEach(error => {
                    if (error.path === 'email') {
                        setEmailError(error.message)
                    } else if (error.path === 'senha') {
                        setSenhaError(error.message)
                    }
                })
            })
    }

    if (isAuthenticated) return (
        <>{children}</>
    )
    return (
        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>
                        <Typography variant='h6' align='center'>Identifique-se</Typography>

                        <TextField
                            label='Email'
                            type='email'
                            fullWidth
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={_e => setEmailError('')}
                            error={!!email}
                            helperText={emailError}
                            disabled={isLoading}
                        />
                        <TextField
                            label='Senha'
                            type='password'
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            onKeyDown={_e => setSenhaError('')}
                            fullWidth
                            error={!!senha}
                            helperText={senhaError}
                            disabled={isLoading}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Button
                            variant='contained'
                            disabled={isLoading}
                            onClick={handleSubmit}
                            endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
                        >
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}
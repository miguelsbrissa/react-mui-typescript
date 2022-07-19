import { Box, Grid, LinearProgress, Paper, TextField, Typography } from '@mui/material'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FerramentasDeDetalhe } from '../../shares/components'
import { VTextField } from '../../shares/forms'
import { LayoutBaseDePagina } from '../../shares/layouts'
import { PessoasService } from '../../shares/services/api/pessoas/PessoasService'

interface IFormData {
    email: string
    cidadeId: number
    nomeCompleto: string
}

export const DetalhesDePessoas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>()
    const navigate = useNavigate()
    const formRef = useRef<FormHandles>(null)

    const [isLoading, setIsLoading] = useState(false)
    const [nome, setNome] = useState('')

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true)

            PessoasService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false)

                    if (result instanceof Error) {
                        alert(result.message)
                        navigate('/pessoas')
                    } else {
                        setNome(result.nomeCompleto)
                        formRef.current?.setData(result)
                    }
                })
        }
    }, [id])


    const handleSave = (dados: IFormData) => {
        if (id === 'nova') {
            PessoasService.create(dados)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        navigate(`/pessoas/detalhe/${result}`)
                    }
                })
        } else {
            PessoasService.updateById({ id: Number(id), ...dados })
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message)
                    }
                })
        }
    }

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        alert('Registro apagado com sucesso')
                        navigate('/pessoas')
                    }
                })
        }
    }

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova Pessoa' : nome}
            barraDeFerramentas={<FerramentasDeDetalhe
                textoBotaoNovo='Nova'
                mostrarBotaoSalvarEFechar
                mostrarBotaoNovo={id !== 'nova'}
                mostrarBotaoApagar={id !== 'nova'}

                aoClicarEmSalvar={() => formRef.current?.submitForm()}
                aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
                aoClicarEmApagar={() => handleDelete(Number(id))}
                aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                aoClicarEmVoltar={() => navigate('/pessoas/')}
            />}
        >
            <Form ref={formRef} onSubmit={handleSave}>

                <Box
                    margin={1}
                    display='flex'
                    flexDirection='column'
                    component={Paper}
                    variant='outlined'>
                    <Grid container direction='column' padding={2} spacing={2}>
                        {
                            isLoading && (
                                <Grid item>
                                    <LinearProgress variant='indeterminate' />
                                </Grid>
                            )
                        }
                        <Grid item>
                            <Typography variant='h6'>Geral</Typography>
                        </Grid>
                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    disabled={isLoading}
                                    fullWidth
                                    label='Nome Completo'
                                    name='nomeCompleto'
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    disabled={isLoading}
                                    fullWidth
                                    label='Email'
                                    name='email'
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    disabled={isLoading}
                                    label='Cidade'
                                    name='cidadeId'
                                />
                            </Grid>
                        </Grid>

                    </Grid>

                </Box>

            </Form>
        </LayoutBaseDePagina>


    )
}
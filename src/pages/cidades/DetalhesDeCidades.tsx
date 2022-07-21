import { Box, Paper, Grid, LinearProgress, Typography } from '@mui/material'
import { FerramentasDeDetalhe } from '../../shares/components'
import { IVFormErrors, useVForm, VForm, VTextField } from '../../shares/forms'
import { LayoutBaseDePagina } from '../../shares/layouts'
import * as yup from 'yup'
import '../../shares/forms/TraducoesYup'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CidadesService } from '../../shares/services/api/cidades/CidadesServcice'

interface IFormData {
    nome: string
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    nome: yup.string().min(3).required()
})

export const DetalhesDeCidades: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>()
    const navigate = useNavigate()
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm()

    const [isLoading, setIsLoading] = useState(false)
    const [nome, setNome] = useState('')

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true)

            CidadesService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false)

                    if (result instanceof Error) {
                        alert(result.message)
                        navigate('/cidades')
                    } else {
                        setNome(result.nome)
                        formRef.current?.setData(result)
                    }
                })
        } else {
            formRef.current?.setData({
                nome: ''
            })
        }
    }, [id])

    const handleSave = (dados: IFormData) => {
        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                if (id === 'nova') {
                    CidadesService.create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false)
                            if (result instanceof Error) {
                                alert(result.message)
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/cidades')
                                } else {
                                    navigate(`/cidades/detalhe/${result}`)
                                }
                            }
                        })
                } else {
                    CidadesService.updateById({ id: Number(id), ...dadosValidados })
                        .then((result) => {
                            if (result instanceof Error) {
                                alert(result.message)
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/cidades')
                                }
                            }
                        })
                }
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false)
                const validationErrors: IVFormErrors = {}

                errors.inner.forEach(error => {
                    if (!error.path) return

                    validationErrors[error.path] = error.message
                })

                formRef.current?.setErrors(validationErrors)
            })
    }

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            CidadesService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        alert('Registro apagado com sucesso')
                        navigate('/cidades')
                    }
                })
        }
    }
    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova Cidade' : nome}
            barraDeFerramentas={<FerramentasDeDetalhe
                textoBotaoNovo='Nova'
                mostrarBotaoSalvarEFechar
                mostrarBotaoNovo={id !== 'nova'}
                mostrarBotaoApagar={id !== 'nova'}

                aoClicarEmSalvar={save}
                aoClicarEmSalvarEFechar={saveAndClose}
                aoClicarEmApagar={() => handleDelete(Number(id))}
                aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
                aoClicarEmVoltar={() => navigate('/cidades/')}
            />}
        >
            <VForm ref={formRef} onSubmit={handleSave}>
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
                                    label='Nome'
                                    name='nome'
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                    </Grid>

                </Box>
            </VForm>
        </LayoutBaseDePagina>
    )
}
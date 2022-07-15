import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material'

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string

    mostrarBotaoNovo?: boolean
    mostrarBotaoVoltar?: boolean
    mostrarBotaoApagar?: boolean
    mostrarBotaoSalvar?: boolean
    mostrarBotaoSalvarEFechar?: boolean

    mostrarBotaoNovoCarregando?: boolean
    mostrarBotaoVoltarCarregando?: boolean
    mostrarBotaoApagarCarregando?: boolean
    mostrarBotaoSalvarCarregando?: boolean
    mostrarBotaoSalvarEFecharCarregando?: boolean

    aoClicarEmNovo?: () => void
    aoClicarEmVoltar?: () => void
    aoClicarEmApagar?: () => void
    aoClicarEmSalvar?: () => void
    aoClicarEmSalvarEFechar?: () => void
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = false,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar
}) => {
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box
            component={Paper}
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display='flex'
            gap={1}
            alignItems='center'
        >
            {
                (mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
                    <Button
                        color='primary'
                        variant='contained'
                        startIcon={<Icon>save</Icon>}
                        onClick={aoClicarEmSalvar}
                        disableElevation
                    >
                        <Typography
                            variant='button'
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='ellipsis'
                        >
                            Salvar
                        </Typography>

                    </Button>
                )
            }
            {
                mostrarBotaoSalvarCarregando && (
                    <Skeleton width={110} height={60} />
                )
            }


            {
                (mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !mdDown) && (
                    <Button
                        color='primary'
                        variant='outlined'
                        startIcon={<Icon>save</Icon>}
                        onClick={aoClicarEmSalvarEFechar}
                        disableElevation
                    >
                        <Typography
                            variant='button'
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='ellipsis'
                        >Salvar e fechar</Typography>
                    </Button>
                )
            }
            {
                (mostrarBotaoSalvarEFecharCarregando && !mdDown) && (
                    <Skeleton width={180} height={60} />
                )
            }

            {
                (mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
                    <Button
                        color='primary'
                        variant='outlined'
                        startIcon={<Icon>delete</Icon>}
                        onClick={aoClicarEmApagar}
                        disableElevation
                    >
                        <Typography
                            variant='button'
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='ellipsis'
                        >Apagar</Typography>
                    </Button>
                )
            }
            {
                mostrarBotaoApagarCarregando && (
                    <Skeleton width={110} height={60} />
                )
            }

            {
                (mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
                    <Button
                        color='primary'
                        variant='outlined'
                        startIcon={<Icon>add</Icon>}
                        onClick={aoClicarEmNovo}
                        disableElevation
                    >
                        <Typography
                            variant='button'
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='ellipsis'
                        >{textoBotaoNovo}</Typography>
                    </Button>
                )
            }
            {
                (mostrarBotaoNovoCarregando && !smDown) && (
                    <Skeleton width={110} height={60} />
                )
            }

            {
                (mostrarBotaoVoltar &&
                    (mostrarBotaoSalvar || mostrarBotaoApagar || mostrarBotaoSalvarEFechar || mostrarBotaoNovo)) && (
                    <Divider
                        variant='middle'
                        orientation='vertical'
                    />
                )
            }

            {
                (mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
                    <Button
                        color='primary'
                        variant='outlined'
                        startIcon={<Icon>arrow_back</Icon>}
                        onClick={aoClicarEmVoltar}
                        disableElevation
                    >
                        <Typography
                            variant='button'
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='ellipsis'
                        >Voltar</Typography>
                    </Button>
                )
            }
            {
                mostrarBotaoVoltarCarregando && (
                    <Skeleton width={110} height={60} />
                )
            }
        </Box>
    )
}
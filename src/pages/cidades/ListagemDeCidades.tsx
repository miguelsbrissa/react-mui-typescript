import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Icon, TableFooter, LinearProgress, Pagination } from '@mui/material'
import { useMemo, useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FerramentasDaListagem } from '../../shares/components'
import { Environment } from '../../shares/environment'
import { useDebounce } from '../../shares/hooks'
import { LayoutBaseDePagina } from '../../shares/layouts'
import { CidadesService, IListagemCidade } from '../../shares/services/api/cidades/CidadesServcice'

export const ListagemDeCidades: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { debounce } = useDebounce(500)
    const navigate = useNavigate()

    const [rows, setRows] = useState<IListagemCidade[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const busca = useMemo(() => {
        return searchParams.get('busca') || ''
    }, [searchParams])

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1')
    }, [searchParams])

    useEffect(() => {
        setIsLoading(true)

        debounce(() => {
            CidadesService.getAll(pagina, busca)
                .then((result) => {
                    setIsLoading(false)
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        setRows(result.data)
                        setTotalCount(result.totalCount)
                    }
                })
        })

    }, [busca, pagina])

    const handleDelete = (id: number) => {
        if (confirm('Deseja realmente excluir esse registro')) {
            CidadesService.deleteById(id)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        setRows(oldRows => {
                            return [
                                ...oldRows.filter(oldRow => oldRow.id !== id),
                            ]
                        })
                        alert('Registro apagado com sucesso')
                    }
                })
        }
    }
    return (
        <LayoutBaseDePagina titulo='Listagem de cidades'
            barraDeFerramentas={<FerramentasDaListagem
                textoBotaoNovo='Novo'
                mostrarInputBusca
                textoDaBusca={busca}
                aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
                aoMudarTextoDeBusca={(texto) => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
            />
            }
        >
            <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell width={100}>
                                        <IconButton size='small' onClick={() => handleDelete(row.id)}>
                                            <Icon>delete</Icon>
                                        </IconButton>
                                        <IconButton size='small' onClick={() => navigate(`/cidades/detalhe/${row.id}`)}>
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{row.nome}</TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
                    {(totalCount === 0 && !isLoading) &&
                        (
                            <caption>{Environment.LISTAGEM_VAZIA}</caption>
                        )
                    }
                    <TableFooter>
                        {
                            isLoading && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <LinearProgress variant='indeterminate' />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        {
                            (!isLoading && totalCount > Environment.LIMITE_DE_LINHAS) && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Pagination
                                            page={pagina}
                                            onChange={(e, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                                            count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)} />
                                    </TableCell>
                                </TableRow>
                            )
                        }


                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    )
}
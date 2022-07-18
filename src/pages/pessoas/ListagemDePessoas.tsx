import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FerramentasDaListagem } from '../../shares/components'
import { Environment } from '../../shares/environment'
import { useDebounce } from '../../shares/hooks'
import { LayoutBaseDePagina } from '../../shares/layouts'
import { IListagemPessoa, PessoasService } from '../../shares/services/api/pessoas/PessoasService'

export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { debounce } = useDebounce(500)
    const navigate = useNavigate()

    const [rows, setRows] = useState<IListagemPessoa[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const busca = useMemo(() => {
        return searchParams.get('busca') || ''
    }, [searchParams])

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1')
    }, [searchParams])

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message)
                    } else{
                        setRows(oldRows =>{
                            return [
                                ...oldRows.filter(oldRow => oldRow.id !== id),
                            ]
                        })
                        alert('Registro apagado com sucesso')
                    }
                })
        }
    }

    useEffect(() => {
        setIsLoading(true)

        debounce(() => {
            PessoasService.getAll(pagina, busca)
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

    return (
        <LayoutBaseDePagina titulo='Listagem de pessoas'
            barraDeFerramentas={<FerramentasDaListagem
                textoBotaoNovo='Nova'
                mostrarInputBusca
                textoDaBusca={busca}
                aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
            />
            }
        >

            <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <IconButton size='small' onClick={() => handleDelete(row.id)}>
                                            <Icon>delete</Icon>
                                        </IconButton>
                                        <IconButton size='small' onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{row.nomeCompleto}</TableCell>
                                    <TableCell>{row.email}</TableCell>
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
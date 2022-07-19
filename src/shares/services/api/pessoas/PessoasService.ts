import { Environment } from '../../../environment'
import { Api } from '../axios-config'

export interface IListagemPessoa {
    id: number
    nomeCompleto: string
    email: string
    cidadeId: number
}

export interface IDetalhePessoa {
    id: number
    nomeCompleto: string
    email: string
    cidadeId: number
}

type TPessoasComTotalCount = {
    data: IListagemPessoa[]
    totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
    try {
        const urlRelative = `/pessoas?_page=${page}}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`
        const { data, headers } = await Api.get(urlRelative)

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }

        return new Error('Erro ao listar os registros')
    } catch (error) {
        console.error(error)
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.')
    }
}

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
    try {
        const { data } = await Api.get(`/pessoas/${id}`)

        if (data) {
            return data
        }

        return new Error('Erro ao consultar registros.')
    } catch (error) {
        console.error(error)
        return new Error((error as { message: string }).message || 'Erro ao consultar registros.')
    }
}


const create = async (pessoa: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api.post<IDetalhePessoa>('/pessoas', pessoa)

        if (data) {
            return data.id
        }

        return new Error('Erro ao cadastrar um registro.')
    } catch (error) {
        console.error(error)
        return new Error((error as { message: string }).message || 'Erro ao cadastrar um registro.')
    }
}

const updateById = async (pessoa: IDetalhePessoa): Promise<void | Error> => {
    try {
        const urlRelative = `/pessoas/${pessoa.id}`
        await Api.put(urlRelative, pessoa)

        
    } catch (error) {
        console.error(error)
        return new Error((error as { message: string }).message || 'Erro ao atualizar um registro.')
    }
}

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const urlRelative = `/pessoas/${id}`
        await Api.delete(urlRelative)

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string }).message || 'Erro ao deletar um registro.')
    }
}

export const PessoasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}
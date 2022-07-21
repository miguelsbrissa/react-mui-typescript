import { Environment } from '../../../environment'
import { Api } from '../axios-config'


export interface IListagemCidade {
    id: number
    nome: string
}

export interface IDetalheCidade {
    id: number
    nome: string
}

type TCidadesComTotalCount = {
    data: IListagemCidade[]
    totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<TCidadesComTotalCount | Error> => {
    try {
        const urlRelative = `/cidades?_page=${page}}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`
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

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
    try {
        const { data } = await Api.get(`/cidades/${id}`)

        if (data) {
            return data
        }

        return new Error('Erro ao consultar registros.')
    } catch (error) {
        console.error(error)
        return new Error((error as { message: string }).message || 'Erro ao consultar registros.')
    }
}


const create = async (cidade: Omit<IDetalheCidade, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api.post<IDetalheCidade>('/cidades', cidade)

        if (data) {
            return data.id
        }

        return new Error('Erro ao cadastrar um registro.')
    } catch (error) {
        console.error(error)
        return new Error((error as { message: string }).message || 'Erro ao cadastrar um registro.')
    }
}

const updateById = async (cidade: IDetalheCidade): Promise<void | Error> => {
    try {
        const urlRelative = `/cidades/${cidade.id}`
        await Api.put(urlRelative, cidade)

        
    } catch (error) {
        console.error(error)
        return new Error((error as { message: string }).message || 'Erro ao atualizar um registro.')
    }
}

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const urlRelative = `/cidades/${id}`
        await Api.delete(urlRelative)

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string }).message || 'Erro ao deletar um registro.')
    }
}

export const CidadesService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}
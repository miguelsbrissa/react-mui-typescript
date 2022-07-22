import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { useField } from '@unform/core'
import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from '../../../shares/hooks'
import { CidadesService } from '../../../shares/services/api/cidades/CidadesServcice'

type TAutoCompleteOption = {
    id: number,
    label: string
}

interface IAutoCompleteCidadeProps {
    isExternalLoading?: boolean
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({ isExternalLoading = false }) => {
    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([])
    const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId')
    const [isLoading, setIsLoading] = useState(false)
    const [busca, setBusca] = useState('')
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue)
    const { debounce } = useDebounce()


    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
        })
    }, [registerField])

    useEffect(() => {
        setIsLoading(true)
        debounce(() => {
            CidadesService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false)
                    if (result instanceof Error) {
                        // alert(result.message)
                    } else {
                        setOpcoes(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome })))
                    }
                })
        })
    }, [busca])

    const autoCompleteOptionSelectedOption = useMemo(() => {
        if (!selectedId) return null

        const selectedOption = opcoes.find(opcao => opcao.id === selectedId)

        if (!selectedOption) return null

        return selectedOption
    }, [selectedId, opcoes])

    return (
        <Autocomplete
            value={autoCompleteOptionSelectedOption}
            loading={isLoading}
            popupIcon={(isLoading || isExternalLoading) ? <CircularProgress size={28} /> : undefined}
            disabled={isExternalLoading}
            loadingText='Carregando'
            noOptionsText='Sem opções'
            openText='Abrir'
            closeText='Fechar'
            disablePortal
            onInputChange={(_, newValue) => setBusca(newValue)}
            onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca(''); clearError() }}
            options={opcoes}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label='Cidade'
                    error={!!error}
                    helperText={error}
                />
            )}
        />
    )
}
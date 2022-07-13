import { FerramentasDaListagem } from '../../shares/components'
import { LayoutBaseDePagina } from '../../shares/layouts'

export const Dashboard = () => {
    return (
        <LayoutBaseDePagina
            titulo='Página Inicial'
            barraDeFerramentas={<FerramentasDaListagem mostrarInputBusca/>}
        >
            Testando
        </LayoutBaseDePagina>
    )
}
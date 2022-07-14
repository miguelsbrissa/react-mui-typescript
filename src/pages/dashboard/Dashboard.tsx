import { FerramentasDaListagem, FerramentasDeDetalhe } from '../../shares/components'
import { LayoutBaseDePagina } from '../../shares/layouts'

export const Dashboard = () => {
    return (
        <LayoutBaseDePagina
            titulo='Página Inicial'
            barraDeFerramentas={<FerramentasDeDetalhe  mostrarBotaoSalvarEFechar/>}
        >
            Testando
        </LayoutBaseDePagina>
    )
}
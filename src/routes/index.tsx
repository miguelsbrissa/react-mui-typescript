import { Routes, Route, Navigate } from 'react-router-dom'
import { useDrawerContext } from '../shares/contexts/DrawerContext'
import { useEffect } from 'react'
import { Dashboard, DetalhesDePessoas, ListagemDePessoas } from '../pages'
export const AppRoutes = () =>{
    const { setDrawerOptions } = useDrawerContext()

    useEffect(() =>{
        setDrawerOptions([
            {
                label: 'Página Inicial',
                icon: 'home',
                path: '/página-inicial'
            },
            {
                label: 'Pessoas',
                icon: 'people',
                path: '/pessoas'
            }
        ])
    },[])

    return(
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard/>}/>
            <Route path='/pessoas' element={<ListagemDePessoas/>}/>
            <Route path='/pessoas/detalhe/:id' element={<DetalhesDePessoas/>}/>

            <Route path='*' element={<Navigate to="/pagina-inicial"/>}></Route>
        </Routes>
    )
}
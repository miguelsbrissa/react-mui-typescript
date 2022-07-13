import { Routes, Route, Navigate } from 'react-router-dom'
import {Button} from '@mui/material'
import { useDrawerContext } from '../shares/contexts/DrawerContext'
import { useEffect } from 'react'
export const AppRoutes = () =>{
    const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext()

    useEffect(() =>{
        setDrawerOptions([
            {
                label: 'Página Inicial',
                icon: 'home',
                path: '/página-inicial'
            }
        ])
    },[])

    return(
        <Routes>
            <Route path='/pagina-inicial' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle Drawer</Button>}/>

            <Route path='*' element={<Navigate to="/pagina-inicial"/>}></Route>
        </Routes>
    )
}
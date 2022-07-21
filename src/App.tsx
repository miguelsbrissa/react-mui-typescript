import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { MenuLateral } from './shares/components'
import { DrawerProvider } from './shares/contexts'
import { AppThemeProvider } from './shares/contexts/ThemeContext'
import './shares/forms/TraducoesYup'


export const App = () => {
    return (
        <DrawerProvider>
            <AppThemeProvider>
                <BrowserRouter>
                    <MenuLateral>
                        <AppRoutes />
                    </MenuLateral>
                </BrowserRouter>
            </AppThemeProvider>
        </DrawerProvider>
    )
}

export default App

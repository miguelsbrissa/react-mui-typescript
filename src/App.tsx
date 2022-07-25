import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { Login, MenuLateral } from './shares/components'
import { AuthProvider, DrawerProvider, AppThemeProvider } from './shares/contexts'
import './shares/forms/TraducoesYup'


export const App = () => {
    return (
        <AuthProvider>
            <AppThemeProvider>

                <Login>

                    <DrawerProvider>
                        <BrowserRouter>

                            <MenuLateral>
                                <AppRoutes />
                            </MenuLateral>

                        </BrowserRouter>
                    </DrawerProvider>

                </Login>

            </AppThemeProvider>
        </AuthProvider>
    )
}

export default App

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AppThemeProvider } from './shares/contexts/ThemeContext'


export const App = () => {
    return (
        <AppThemeProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AppThemeProvider>
    )
}

export default App

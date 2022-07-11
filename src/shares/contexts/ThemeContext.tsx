import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ThemeProvider, Box } from '@mui/material';
import { DarkTheme, LightTheme } from "../themes";


interface IThemeContextData {
    themeName: 'light' | 'dark'
    toggleTheme: () => void
}
interface IAppThemeProviderProps {
    children: React.ReactNode
}

const ThemeContext = createContext({} as IThemeContextData)

export const useAppThemeContext = () => {
    return useContext(ThemeContext)
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light')
    }, []);

    //useMemo serve para armazenar valores
    //toda vez que o array de dependencias([themeName]) for alterado a função será executada
    const theme = useMemo(() => {
        if (themeName == 'light') return LightTheme

        return DarkTheme
    }, [themeName]);
    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
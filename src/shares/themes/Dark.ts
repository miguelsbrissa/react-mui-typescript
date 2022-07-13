import { createTheme } from '@mui/material'
import { cyan, yellow } from '@mui/material/colors'
export const DarkTheme = createTheme({
    palette: {
        mode:'dark',
        primary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: '#ffffff',
        },
        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#ffffff',
        },
        background:{
            //cor de fundo
            default: '#202124',
            //cor de fundo de 'dentro' tipo a de dentro do card
            paper: '#303134',
        }
    },
    typography:{
        allVariants:{
            color: 'white'
        }
    }
})
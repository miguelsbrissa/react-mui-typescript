import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useDrawerContext } from '../../contexts'

interface IMenuLateral {
    children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
    const theme = useTheme()

    //se a tela estiver menor que sm retorna true
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const {isDrawerOpen, toggleDrawerOpen } = useDrawerContext()

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} display='flex' flexDirection='column' height='100%'>
                    <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
                        <Avatar src='' 
                            sx={{
                                height: theme.spacing(12),
                                width: theme.spacing(12)
                            }}
                        />
                    </Box>

                    <Divider/>

                    <Box flex={1}>
                        <List component='nav'>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon>home</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Página Inicial'/>
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            {                        /* 1 = 8px  28 = 224px*/}
            <Box height='100vh' marginLeft={smDown? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>

    )
}
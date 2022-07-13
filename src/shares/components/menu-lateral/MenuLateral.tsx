import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'
import { useAppThemeContext, useDrawerContext } from '../../contexts'

interface IListItemLinkProps {
    label: string //nome
    icon: string //icone
    to: string  //rota de destino
    onClick: (() => void) | undefined
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ label, icon, to, onClick }) => {
    const navigate = useNavigate()

    const resolvedPath = useResolvedPath(to)
    const match = useMatch({ path: resolvedPath.pathname, end: false })


    const handleClick = () => {
        navigate(to)
        onClick?.()
    }

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )
}

interface IMenuLateral {
    children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
    const theme = useTheme()

    //se a tela estiver menor que sm retorna true
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()
    const { toggleTheme } = useAppThemeContext()

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

                    <Divider />

                    <Box flex={1}>
                        <List component='nav'>
                            {drawerOptions.map(drawerOption => (
                                <ListItemLink
                                    key={drawerOption.path}
                                    icon={drawerOption.icon}
                                    label={drawerOption.label}
                                    to={drawerOption.path}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            ))}

                        </List>
                    </Box>
                    <Box>
                        <List component='nav'>
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>dark_mode</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Alternar tema' />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            {                        /* 1 = 8px  28 = 224px*/}
            <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>

    )
}
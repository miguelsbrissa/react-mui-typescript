import React, { createContext, useCallback, useContext, useState } from 'react'

interface IDrawerOption{
    path: string
    icon: string
    label: string
}

interface IDrawerContextData {
    isDrawerOpen: boolean
    toggleDrawerOpen: () => void
    drawerOptions: IDrawerOption[]
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void
}
interface IDrawerProviderProps {
    children: React.ReactNode
}

const DrawerContext = createContext({} as IDrawerContextData)

export const useDrawerContext = () => {
    return useContext(DrawerContext)
}



export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [drawerOptions, setdrawerOptions] = useState<IDrawerOption[]>([])

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, [])

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setdrawerOptions(newDrawerOptions)
    }, [])

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen,  drawerOptions, setDrawerOptions: handleSetDrawerOptions}}>
            {children}
        </DrawerContext.Provider>
    )
}
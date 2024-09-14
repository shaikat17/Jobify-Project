import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
    const [lightMode, setLightMode] = useState(localStorage.getItem('mode') || 'light')
    
    const toggleMode = () => {
        setLightMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }

    useEffect(() => {
        localStorage.setItem('mode', lightMode);
        console.log('Theme mode updated in localStorage');
    }, [lightMode]);
    

    return (
        <ThemeContext.Provider value={{
            lightMode,
            toggleMode
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    return useContext(ThemeContext)
}
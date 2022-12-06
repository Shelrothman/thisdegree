import { useEffect } from 'react';
import { useState, useContext, createContext } from 'react';

const DarkThemeContext = createContext();

export function useTheme() {
    return useContext(DarkThemeContext);
}

export function ThemeContext({ children }) {
    const [dark, setDark] = useState(localStorage.getItem('theme') === 'theme-dark');
    
    useEffect(() => {
        if (dark) {
            localStorage.setItem('theme', 'theme-dark');
            document.body.classList.remove('theme-light');
            document.body.classList.add('theme-dark');
            document.documentElement.classList.add('theme-dark');
            //* these make it so even elements outside of the body are affected
            document.documentElement.classList.remove('theme-light');
        } else {
            localStorage.setItem('theme', 'theme-light');
            document.body.classList.remove('theme-dark');
            document.body.classList.add('theme-light');
            document.documentElement.classList.add('theme-light');
            document.documentElement.classList.remove('theme-dark');
        }
    }, [dark]);


    const handleToggleDark = () => {
        setDark((prev) => !prev);
    };

    return (
        <DarkThemeContext.Provider value={{ dark, toggleDark: handleToggleDark }}>
            {children}
        </DarkThemeContext.Provider>
    );
}
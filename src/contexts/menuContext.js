import { createContext, useContext, useEffect, useState } from "react";

const MenuContext = createContext();

export const useMenu = () => {
    const context = useContext(MenuContext);
    const {menu, setMenu} = context;
    return {menu, setMenu};
}

export const MenuProvider = ({children}) => {
    const [menu, setMenu] = useState(0);

    useEffect(() => {
        console.log('menu')
        console.log(menu)
    }, [menu])

    return (
        <MenuContext.Provider
            value={{
                menu,
                setMenu
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}
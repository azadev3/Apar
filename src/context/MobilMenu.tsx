import React, { SetStateAction } from 'react'

type MobilMenuType = {
     mobileMenu: boolean,
     setMobileMenu: React.Dispatch<SetStateAction<boolean>>;
}

type ChildrenProp = {
     children: React.ReactNode,
}

export const MobilMenuContext = React.createContext<MobilMenuType | undefined>(undefined);

export const MobilMenuContextProvider:React.FC<ChildrenProp> = ({children}) => {

     const [mobileMenu, setMobileMenu] = React.useState<boolean>(false);

     return (
          <MobilMenuContext.Provider value={{
               mobileMenu, setMobileMenu
          }}>
               {children}
          </MobilMenuContext.Provider>
     )
}

export const useMobile = () => {
     const context = React.useContext(MobilMenuContext);
     if(context === undefined) {
          throw new Error('undefined mobil menu context');
     } else {
          return context;
     }
}
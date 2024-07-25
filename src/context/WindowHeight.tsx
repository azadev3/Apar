import React, { SetStateAction } from 'react'

type ViewPortHeightType = {
     viewportHeight: number,
     setViewportHeight: React.Dispatch<SetStateAction<number>>;
}

type ChildType = {
     children: React.ReactNode,
}

export const ViewportContext = React.createContext<ViewPortHeightType | undefined>(undefined);

export const ViewportContextProvider:React.FC<ChildType> = ({children}) => {

     const [viewportHeight, setViewportHeight] = React.useState<number>(window.innerHeight);

     React.useEffect(() => {
          setViewportHeight(window.innerHeight);
     }, []);

     return (
          <ViewportContext.Provider value={{ viewportHeight, setViewportHeight }}>
               {children}
          </ViewportContext.Provider>
     )
}

export const useViewportHeight = () => {
     const context = React.useContext(ViewportContext);

     if(context === undefined) {
          throw new Error('undefined viewport context');
     } else {
          return context;
     }
}
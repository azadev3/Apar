import React, { SetStateAction } from "react";

type ScrollcontextType = {
  // secondHeader: boolean;
  // setSecondHeader: React.Dispatch<SetStateAction<boolean>>;
  // header: boolean;
  // setHeader: React.Dispatch<SetStateAction<boolean>>;
  isScrolled: boolean,
  setIsScrolled: React.Dispatch<SetStateAction<boolean>>;
  upScrollHeader: boolean,
  setUpScrollHeader: React.Dispatch<SetStateAction<boolean>>;
};

type ChildrenProps = {
  children: React.ReactNode;
};

export const ScrollContext = React.createContext<ScrollcontextType | undefined>(undefined);

export const ScrollContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);
  const [upScrollHeader, setUpScrollHeader] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    let lastScrollTop = 0;
    let ticking = false;
  
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollTop = document.documentElement.scrollTop;
  
          if (currentScrollTop > 70 && currentScrollTop > lastScrollTop) {
            setIsScrolled(true);
            setUpScrollHeader(false);
          } else if (currentScrollTop > 70) {
            setIsScrolled(false);
            setUpScrollHeader(true);
          } else {
            setIsScrolled(false);
            setUpScrollHeader(false);
          }
  
          lastScrollTop = currentScrollTop;
          ticking = false;
        });
  
        ticking = true;
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <ScrollContext.Provider
      value={{
        // secondHeader,
        // setSecondHeader,
        // setHeader,
        // header
        setIsScrolled,
        isScrolled,
        setUpScrollHeader,
        upScrollHeader
      }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrolling = () => {
  const context = React.useContext(ScrollContext);

  if (context === undefined) {
    throw new Error("undefined scroll context");
  } else {
    return context;
  }
};

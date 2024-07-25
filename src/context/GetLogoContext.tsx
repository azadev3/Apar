import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { SetStateAction } from "react";

interface Logo {
  id: number;
  logo: string;
  scroll_logo: string;
  qr_code: string;
  hero_banner: string;
  bepartner_banner: string;
  contact_banner: string;
}

type LogoType = {
  logo: Logo[];
  setLogo: React.Dispatch<SetStateAction<Logo[]>>;
  getLogo: () => void;
};

type ChildProp = {
  children: React.ReactNode;
};

export const LogoContext = React.createContext<LogoType | undefined>(undefined);

export const LogoContextProvider: React.FC<ChildProp> = ({ children }) => {
  const [logo, setLogo] = React.useState<Logo[]>([]);
  
  const getLogo = async () => {
    const response = await axios.get("https://coming.166tech.az/api/logo");
    return response.data;
  };
  const { data: logodata } = useQuery({
    queryKey: ["logodata"],
    queryFn: getLogo,
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (logodata) {
      setLogo(logodata);
    }
  }, [logodata]);

  return <LogoContext.Provider value={{ logo, setLogo, getLogo }}>{children}</LogoContext.Provider>;
};

export const useLogo = () => {
  const context = React.useContext(LogoContext);
  if (context === undefined) {
    throw new Error("undefined logo context");
  } else {
    return context;
  }
};

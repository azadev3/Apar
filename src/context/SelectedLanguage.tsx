import React, { SetStateAction } from "react";

type SelectedLanguageContextType = {
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<SetStateAction<string>>;
  handleSelectLanguage: (lang: string) => void;
};

type ChildrenProps = {
  children: React.ReactNode;
};

export const SelectedLanguageContext = React.createContext<SelectedLanguageContextType | undefined>(undefined);

export const SelectedLanguageContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>(localStorage.getItem("language") || "en");
  const handleSelectLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    localStorage.setItem("language", lang);
  };

  React.useEffect(() => {
    setSelectedLanguage(localStorage.getItem("language") || "en");
  }, [selectedLanguage]);

  return (
    <SelectedLanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        handleSelectLanguage,
      }}>
      {children}
    </SelectedLanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = React.useContext(SelectedLanguageContext);
  if (context === undefined) {
    throw new Error("undefined selectedlanguagecontext");
  } else {
    return context;
  }
};

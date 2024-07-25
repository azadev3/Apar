import axios from "axios";
import React, { SetStateAction } from "react";
import { api, option } from "../Api";
import { useQuery } from "@tanstack/react-query";
import { useLang } from "./SelectedLanguage";

export interface TranslateWordsInterface {
  [key: string]: string;
}

type GetTranslateContextType = {
  translatesWord: TranslateWordsInterface;
  setTranslatesWord: React.Dispatch<SetStateAction<TranslateWordsInterface>>;
};

type ChildType = {
  children: React.ReactNode;
};

export const GetTranslateContext = React.createContext<GetTranslateContextType | undefined>(undefined);

export const GetTranslateContextProvider: React.FC<ChildType> = ({ children }) => {
  const [translatesWord, setTranslatesWord] = React.useState<TranslateWordsInterface>({});

  const { selectedLanguage } = useLang();

  const { data: translate_datas } = useQuery({
    queryKey: ["translationData", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.translation_words, option(selectedLanguage));
      return response.data;
    },
    staleTime: 700000,
  });

  React.useEffect(() => {
    if (translate_datas) {
      setTranslatesWord(translate_datas);
    }
  }, [translate_datas]);

  return (
    <GetTranslateContext.Provider value={{ setTranslatesWord, translatesWord }}>
      {children}
    </GetTranslateContext.Provider>
  );
};

export const useTranslateApi = () => {
  const context = React.useContext(GetTranslateContext);

  if (context === undefined) {
    throw Error("undefined get translate api");
  } else {
    return context;
  }
};

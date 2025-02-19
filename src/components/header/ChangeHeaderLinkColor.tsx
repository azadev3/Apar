import { paths } from "../../App";
import { useLang } from "../../context/SelectedLanguage";
import { EnumLangType } from "../pages/WhyRidePage";

export const AccordingChangeColorToLocation = (id: number, location:any) => {

  const { selectedLanguage } = useLang();

  const ControlColor = () => {
    if (id === 1 && location.pathname === "") {
      return "#FF6600";
    } else if (id === 2 && location.pathname === paths.whyride[selectedLanguage as EnumLangType]) {
      return "#FF6600";
    } else if (id === 3 && location.pathname === paths.blog[selectedLanguage as EnumLangType]) {
      return "#FF6600";
    } else if (id === 4 && location.pathname === paths.about[selectedLanguage as EnumLangType]) {
      return "#FF6600";
    } else if (id === 5 && location.pathname === paths.be_partner[selectedLanguage as EnumLangType]) {
      return "#FF6600";
    } else if (id === 6 && location.pathname === paths.contact[selectedLanguage as EnumLangType]) {
      return "#FF6600";
    } else {
      return "";
    }
  };
  return ControlColor();
};

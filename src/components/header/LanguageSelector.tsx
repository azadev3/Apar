import { useLang } from "../../context/SelectedLanguage";
import { useScrolling } from "../../context/ScrollHeader";
import { useLocation, useMatch } from "react-router-dom";
import { EnumLangType } from "../pages/WhyRidePage";
import { paths } from "../../App";

const LanguageSelector = () => {
  const { selectedLanguage, handleSelectLanguage } = useLang();
  const { isScrolled } = useScrolling();

  const location = useLocation();
  // const match = useMatch("/blog_single/:blogid");
  const match = useMatch("/:lang/:blogid");
  const match2 = useMatch("/:lang/:latestid");
  const match3 = useMatch("/winner_single/:wthmid");

  return (
    <div
      className={`language-selector ${
        location.pathname === paths.blog[selectedLanguage as EnumLangType]
          ? "lang-selector-blog"
          : match || match2 || match3
          ? "lang-selector-blog-inner"
          : location.pathname === paths.bcycle[selectedLanguage as EnumLangType]
          ? "lang-item-bcycle"
          : location.pathname === paths.e_bcycle[selectedLanguage as EnumLangType]
          ? "lang-item-ebcycle"
          : ""
      }`}>
      <select
        name=""
        id=""
        style={{
          color:
            location.pathname === paths.whyride[selectedLanguage as EnumLangType] ||
            location.pathname === paths.about[selectedLanguage as EnumLangType] ||
            location.pathname === paths.contact[selectedLanguage as EnumLangType] ||
            isScrolled
              ? "#000000"
              : "#fff",
        }}
        onChange={(e) => handleSelectLanguage(e.target.value)}
        value={selectedLanguage}>
        <option value="en">eng</option>
        <option value="az">aze</option>
        <option value="ru">rus</option>
      </select>
    </div>
  );
};

export default LanguageSelector;

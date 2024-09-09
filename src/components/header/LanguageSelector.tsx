import { useLang } from "../../context/SelectedLanguage";
import { useScrolling } from "../../context/ScrollHeader";
import { useLocation, useMatch } from "react-router-dom";

const LanguageSelector = () => {
  const { selectedLanguage, handleSelectLanguage } = useLang();
  const { isScrolled } = useScrolling();

  const location = useLocation();
  const match = useMatch("/blog_single/:blogid");
  const match2 = useMatch("/news_single/:latestid");
  const match3 = useMatch("/winner_single/:wthmid");

  return (
    <div
      className={`language-selector ${
        location.pathname === "/blog"
          ? "lang-selector-blog"
          : match || match2 || match3
          ? "lang-selector-blog-inner"
          : location.pathname === "/bcycle"
          ? "lang-item-bcycle"
          : location.pathname === "/e-bcycle"
          ? "lang-item-ebcycle"
          : ""
      }`}>
      <select
        name=""
        id=""
        style={{
          color:
            location.pathname === "/whyride" ||
            location.pathname === "/about" ||
            location.pathname === "/contact" ||
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

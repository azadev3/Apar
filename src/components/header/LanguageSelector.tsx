import { useLang } from '../../context/SelectedLanguage'
import { useScrolling } from '../../context/ScrollHeader';
import { useLocation } from 'react-router-dom';

const LanguageSelector = () => {

  const { selectedLanguage, handleSelectLanguage } = useLang();
  const { isScrolled } = useScrolling();

  const location = useLocation();

  return (
    <div className={`language-selector ${location.pathname === "/blog" ? "lang-selector-blog" : ""}`}>
     <select name="" id=""
     style={{color:
      location.pathname === "/whyride" ||
      location.pathname === "/about" ||
      location.pathname === "/contact" || isScrolled
        ? "#000000"
        : "#fff",
      }}
     onChange={(e) => handleSelectLanguage(e.target.value)}
     value={selectedLanguage}
     >
          <option value="en">eng</option>
          <option value="az">aze</option>
          <option value="ru">rus</option>
     </select>
     </div>
  )
}

export default LanguageSelector
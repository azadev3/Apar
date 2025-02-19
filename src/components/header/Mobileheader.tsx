import "../../styles/header/responsiveheader.scss";
import { Link, useLocation } from "react-router-dom";
import { GrMenu } from "react-icons/gr";
import { useScrolling } from "../../context/ScrollHeader";
import { useMobile } from "../../context/MobilMenu";
import { useLogo } from "../../context/GetLogoContext";
import { HeaderLogoType } from "./Header";
import { paths } from "../../App";
import { EnumLangType } from "../pages/WhyRidePage";
import { useLang } from "../../context/SelectedLanguage";

const Mobileheader = () => {

  const { selectedLanguage } = useLang();
  const { isScrolled, upScrollHeader } = useScrolling();
  const { setMobileMenu } = useMobile();

  const { logo } = useLogo();

  const location = useLocation();

  return (
    <div
      className={
        `mobil-header ${
          isScrolled ? 'isScrolledMobileheader' : upScrollHeader ? 'upScrolledMobileheader' : ''
        }`
      }
      style={{ 
        zIndex: '10000001' 
        }}>
      <Link to="/" className="logo">
        {logo.slice(0,1).map((logo: HeaderLogoType, i: number) => (
          <img src={logo.logo} alt="logo-apar" key={i} />
        ))}
      </Link>

      <GrMenu
        className="list"
        onClick={() => setMobileMenu(true)}
        style={{
          color:
            isScrolled ||
            location.pathname === paths.whyride[selectedLanguage as EnumLangType] ||
            location.pathname === paths.about[selectedLanguage as EnumLangType] ||
            location.pathname === paths.contact[selectedLanguage as EnumLangType]
              ? "#000000"
              : "#fff",
        }}
      />
    </div>
  );
};

export default Mobileheader;

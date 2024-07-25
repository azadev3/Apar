import React from "react";
import "../../styles/header/upscrollheader.scss";
import { useLogo } from "../../context/GetLogoContext";
import { HeaderLogoType, HeaderTitleType } from "./Header";
import LanguageSelector from "./LanguageSelector";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../../context/SelectedLanguage";
import { AccordingChangeColorToLocation } from "./ChangeHeaderLinkColor";
import { useTranslateApi } from "../../context/GetTranslateContext";

const UpScrollHeader = () => {
  const { logo } = useLogo();
  const { selectedLanguage } = useLang();
  const { translatesWord } = useTranslateApi(); 

  const HeaderItem: HeaderTitleType[] = [
    {
      id: 1,
      title: `${translatesWord['transport_nav']}`,
      to: "/",
    },
    {
      id: 2,
      title: `${translatesWord['why_ride_nav']}`,
      to: "/whyride",
    },
    {
      id: 3,
      title: `${translatesWord['blog_nav']}`,
      to: "/blog",
    },
    {
      id: 4,
      title: `${translatesWord['about_nav']}`,
      to: "/about",
    },
    {
      id: 5,
      title: `${translatesWord['partner_nav']}`,
      to: "/bepartner",
    },
    {
      id: 6,
      title: `${translatesWord['contact_nav']}`,
      to: "/contact",
    },
  ];
  

  const location = useLocation();

  const [dropdownVehicles, setDropdownVehicles] = React.useState<boolean>(false);

  const vehiclesDivRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const outsideClicked = (e:MouseEvent) => {
      if(vehiclesDivRef.current && !vehiclesDivRef.current.contains(e.target as Node)) {
        setDropdownVehicles(false)
      } 
    }

    document.addEventListener('mousedown', outsideClicked);
    return () => {
      document.removeEventListener('click', outsideClicked);
    }
  }, []);

  return (
    <div className="up-scroll-header-wrapper">
      <div className="header-container-up-scroll">
        <div className="top-logo-and-language">
          <Link to="/" className="logo-apar">
            {logo.slice(0, 1).map((item: HeaderLogoType, i: number) => (
              <img key={i} alt="apar-logo" src={item.logo} />
            ))}
          </Link>

          <LanguageSelector />
        </div>

        <div className="bottom-fields-header">
          <Link to="/" className="scrol-logo"
          >
            {logo.slice(1, 2).map((logo: HeaderLogoType, i: number) => (
              <img key={i} alt="scroll-logo-apar" src={logo.scroll_logo} />
            ))}
          </Link>

          <nav className="navbar">
            {HeaderItem.map((item: HeaderTitleType, i: number) => (
              <Link
                to={item.to}
                className="header-item"
                onClick={(e) => {
                  item.id === 1 ? setDropdownVehicles((prev) => !prev) : ()=>{}
                  item.id === 1  ? e.preventDefault() : ""
                }}
                style={{ color: item.id !== 1 ? AccordingChangeColorToLocation(item.id, location) : dropdownVehicles ? '#ff6600' : ''}}
                key={i}>
                {item.title}
                {item.id === 1 && (
                  <img src="../dovnblack.svg" 
                  style={{transform: dropdownVehicles ? 'rotate(180deg)' : '', transition: '0.3s ease-out'}}
                  alt="down-black" />
                )}
              </Link>
            ))}
            {dropdownVehicles && (
              <div className="vehicles-dropdown" ref={vehiclesDivRef}>
                <Link to='/e-bcycle' className="e-bcycle-title"
                 style={{color: location.pathname === '/e-bcycle' ? '#ff6600' : ''}}
                >
                 {selectedLanguage === 'ru' ? 'Електронный велосипед' : 'E-bcycle'}
                </Link>
                <Link to='/bcycle' className="bcycle-title"
                 style={{color: location.pathname === '/bcycle' ? '#ff6600' : ''}}
                >
                {selectedLanguage === 'ru' ? 'Велосипед' : 'Bcycle'}
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UpScrollHeader;

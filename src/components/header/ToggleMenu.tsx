import React from "react";
import "../../styles/header/responsiveheader.scss";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { HeaderLogoType, HeaderTitleType } from "./Header";
import { useMobile } from "../../context/MobilMenu";
import { useLang } from "../../context/SelectedLanguage";
import { useLogo } from "../../context/GetLogoContext";
import axios from "axios";
import { SocialType } from "../pages/ContactPage";
import { useQuery } from "@tanstack/react-query";
import { useTranslateApi } from "../../context/GetTranslateContext";
import { paths } from "../../App";
import { EnumLangType } from "../pages/WhyRidePage";

const ToggleMenu = () => {
  const { setMobileMenu } = useMobile();

  const { selectedLanguage, handleSelectLanguage } = useLang();

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
      to: paths.whyride[selectedLanguage as EnumLangType],
    },
    {
      id: 3,
      title: `${translatesWord['blog_nav']}`,
      to: paths.blog[selectedLanguage as EnumLangType],
    },
    {
      id: 4,
      title: `${translatesWord['about_nav']}`,
      to: paths.about[selectedLanguage as EnumLangType],
    },
    {
      id: 5,
      title: `${translatesWord['partner_nav']}`,
      to: paths.be_partner[selectedLanguage as EnumLangType],
    },
    {
      id: 6,
      title: `${translatesWord['contact_nav']}`,
      to: paths.contact[selectedLanguage as EnumLangType],
    },
  ];


  const { logo } = useLogo();

  const [vehiclesMenu, setVehiclesMenu] = React.useState<boolean>(false);
  const dropdownVehicles = () => {
    setVehiclesMenu((prevMenu) => !prevMenu);
  };

  const [langMenu, setLangMenu] = React.useState<boolean>(false);
  const handleLangMenu = () => {
    setLangMenu((prevMenu) => !prevMenu);
  };

  const [socials, setSocials] = React.useState<SocialType[]>([]);
  
  const { data: socialsDataMobile } = useQuery({ 
    queryKey: ['socialsData'],
    queryFn: async () => {
      const response = await axios.get("https://coming.166tech.az/api/mobile_socials");
      console.log(response?.data, 'mobile')
      return response.data;
    },
    staleTime: 350000,
  })

  React.useEffect(() => {
    if(socialsDataMobile) {
      setSocials(socialsDataMobile);
    }
  }, [socialsDataMobile]);

  return (
    <div className="toggle-menu">
      <header className="toggle-menu-header">
        <Link to="/" onClick={() => setMobileMenu(false)} className="leftlogo">
          {logo.slice(0, 1).map((logo: HeaderLogoType, i: number) => (
            <img src={logo.logo} alt="logo-apar" key={i} />
          ))}
        </Link>
        <AiOutlineClose className="list-close" onClick={() => setMobileMenu(false)} />
      </header>

      <div className="container-toggle">
        <div className="vehicles-and-language">
          <div className="vehicles-dropdown">
            {HeaderItem.slice(0, 1).map((item: HeaderTitleType, i: number) => (
              <span className="vehicles" key={i} onClick={dropdownVehicles}>
                {item.title}
                <img src={item.id === 1 && vehiclesMenu ? "../veh2.svg" : "../veh1.svg"} alt="" />
              </span>
            ))}
            {vehiclesMenu && (
              <div className="vehicles-menu">
                <Link to={paths.e_bcycle[selectedLanguage as EnumLangType]} className="links" onClick={() => setMobileMenu(false)}>
                  <span className="rectangle"></span>
                  {translatesWord['ebcycle_dropdown']}
                </Link>
                <Link to={paths.bcycle[selectedLanguage as EnumLangType]} className="links" onClick={() => setMobileMenu(false)}>
                  <span className="rectangle"></span>
                  {translatesWord['bcycle_dropdown']}
                </Link>
              </div>
            )}
          </div>

          <div className="language">
            <span onClick={handleLangMenu}>
              {selectedLanguage === "az"
                ? "Aze"
                : selectedLanguage === "ru"
                ? "Ru"
                : selectedLanguage === "en"
                ? "Eng"
                : ""}
              <img src={langMenu ? "../veh2.svg" : "../veh1.svg"} alt="" />
            </span>
            {langMenu && (
              <div className="lang-menu">
                {selectedLanguage !== "az" && (
                  <span
                    onClick={() => {
                      handleSelectLanguage("az"), setLangMenu(false);
                    }}>
                    Aze
                  </span>
                )}
                {selectedLanguage !== "ru" && (
                  <span
                    onClick={() => {
                      handleSelectLanguage("ru"), setLangMenu(false);
                    }}>
                    Ru
                  </span>
                )}
                {selectedLanguage !== "en" && (
                  <span
                    onClick={() => {
                      handleSelectLanguage("en"), setLangMenu(false);
                    }}>
                    Eng
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <nav className="navbar">
          {HeaderItem.map((item: HeaderTitleType, i: number) => (
            <Link to={item.to} key={i} className="header-title" onClick={() => setMobileMenu(false)}>
              {item.id !== 1 && item.title}
            </Link>
          ))}
        </nav>

        <div className="regulars">
        <Link
                  to={translatesWord["footer_qaydalar_yonlendirme"]}
                  className="rule"
                  onClick={(e) => e.preventDefault()}>
                  {translatesWord["footer_rules_nav"]}
                </Link>
                <Link
                  to={translatesWord["footer_mexfilik_yonlendirme"]}
                  className="rule"
                  onClick={(e) => e.preventDefault()}>
                  {translatesWord["footer_security_nav"]}
                </Link>
        </div>

        <div className="socials">
          {socials.map((item: SocialType, i: number) => (
            <Link to={item.url ? item.url : ""} className="social-item">
              <img src={item?.colorizeicon} alt={`${i}-icon-social-media`} />
            </Link>
          ))}
        </div>

        <div className="bottom-title">
          <p>
            Apar Ride 2024 /
            {selectedLanguage === "az"
              ? "Bütün hüquqlar qorunur"
              : selectedLanguage === "ru"
              ? "Все права защищены"
              : "All rights reserved"}
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default ToggleMenu;

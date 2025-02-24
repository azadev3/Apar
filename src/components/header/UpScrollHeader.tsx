import React from "react";
import "../../styles/header/upscrollheader.scss";
import { useLogo } from "../../context/GetLogoContext";
import { HeaderLogoType, HeaderTitleType } from "./Header";
import { Link, useLocation, useMatch } from "react-router-dom";
import { AccordingChangeColorToLocation } from "./ChangeHeaderLinkColor";
import { useTranslateApi } from "../../context/GetTranslateContext";
import LanguageSelector from "./LanguageSelector";
import { useLang } from "../../context/SelectedLanguage";
import { EnumLangType } from "../pages/WhyRidePage";
import { paths } from "../../App";

const UpScrollHeader = () => {
  const { logo } = useLogo();
  const { translatesWord } = useTranslateApi();
  const { selectedLanguage } = useLang();

  const HeaderItem: HeaderTitleType[] = [
    {
      id: 1,
      title: `${translatesWord["transport_nav"]}`,
      to: "/",
    },
    {
      id: 2,
      title: `${translatesWord["why_ride_nav"]}`,
      to: paths.whyride[selectedLanguage as EnumLangType],
    },
    {
      id: 3,
      title: `${translatesWord["blog_nav"]}`,
      to: paths.blog[selectedLanguage as EnumLangType],
    },
    {
      id: 4,
      title: `${translatesWord["about_nav"]}`,
      to: paths.about[selectedLanguage as EnumLangType],
    },
    {
      id: 5,
      title: `${translatesWord["partner_nav"]}`,
      to: paths.be_partner[selectedLanguage as EnumLangType],
    },
    {
      id: 6,
      title: `${translatesWord["contact_nav"]}`,
      to: paths.contact[selectedLanguage as EnumLangType],
    },
  ];

  const location = useLocation();

  const [dropdownVehicles, setDropdown] = React.useState<number | null>(null);
  const [hoveringMenu, setHoveringMenu] = React.useState<boolean>(false);

  const handleDropdownMenu = (id: number | null) => {
    setDropdown(id);
  };

  const handleMouseLeave = () => {
    if (hoveringMenu) {
      setDropdown(null);
    }
  };

  const match = useMatch("/:lang/:blogid");
  const match2 = useMatch("/:lang/:latestid");
  const match3 = useMatch("/winner_single/:wthmid");

  return (
    <div className="up-scroll-header-wrapper">
      <div className="header-container-up-scroll">
        <div className="bottom-fields-header">
          <Link to="/" className="scrol-logo">
            {logo.slice(1, 2).map((logo: HeaderLogoType, i: number) => (
              <img key={i} alt="scroll-logo-apar" src={logo.scroll_logo} />
            ))}
          </Link>

          <div className="navleft">
            <nav className="navbar">
              {HeaderItem.map((item: HeaderTitleType, i: number) => (
                <React.Fragment key={item?.id}>
                  {item.id === 1 ? (
                    <span
                      className={`header-item ${location.pathname === paths.blog[selectedLanguage as EnumLangType]
                        ? "header-item-blog"
                        : match || match2 || match3
                          ? "bloginner"
                          : location.pathname === paths.bcycle[selectedLanguage as EnumLangType]
                            ? "header-item-bcycle"
                            : location.pathname === paths.e_bcycle[selectedLanguage as EnumLangType]
                              ? "header-item-ebcycle"
                              : location.pathname === "/news_single"
                                ? "header-item-news-single"
                                : ""
                        }`}
                      onMouseEnter={() => handleDropdownMenu(item?.id)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        color: dropdownVehicles ? "#ff6600" : "",
                      }}
                      key={i}
                    >
                      {item.title}
                      <img
                        src={location.pathname === paths.blog[selectedLanguage as EnumLangType] || match || match2 || match3 ? "../white.svg" : "../dovnblack.svg"}
                        style={{
                          transform: dropdownVehicles ? "rotate(180deg)" : "",
                          transition: "0.3s ease-out",
                        }}
                        alt="down-black"
                      />
                    </span>
                  ) : (
                    <Link
                      to={item.to}
                      className={`header-item ${location.pathname === paths.blog[selectedLanguage as EnumLangType]
                        ? "header-item-blog"
                        : match || match2 || match3
                          ? "bloginner"
                          : location.pathname === paths.bcycle[selectedLanguage as EnumLangType]
                            ? "header-item-bcycle"
                            : location.pathname === paths.e_bcycle[selectedLanguage as EnumLangType]
                              ? "header-item-ebcycle"
                              : location.pathname === "/news_single"
                                ? "header-item-news-single"
                                : ""
                        }`}
                      onMouseEnter={() => {
                        if (item.id === 1) {
                          handleDropdownMenu(item?.id);
                        }
                      }}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        color:
                          item.id !== 1
                            ? AccordingChangeColorToLocation(item.id, location)
                            : dropdownVehicles
                              ? "#ff6600"
                              : "",
                      }}
                      key={i}
                    >
                      {item.title}
                    </Link>
                  )}
                </React.Fragment>

              ))}
              {dropdownVehicles && (
                <div
                  className="vehicles-dropdown"
                  onMouseEnter={() => setHoveringMenu(true)}
                  onMouseLeave={() => {
                    setHoveringMenu(false);
                    setDropdown(null);
                  }}>
                  <Link
                    to={paths.e_bcycle[selectedLanguage as EnumLangType]}
                    className="e-bcycle-title"
                    style={{ color: location.pathname === paths.e_bcycle[selectedLanguage as EnumLangType] ? "#ff6600" : "" }}>
                    {translatesWord['ebcycle_dropdown']}
                  </Link>
                  <Link
                    to={paths.bcycle[selectedLanguage as EnumLangType]}
                    className="bcycle-title"
                    style={{ color: location.pathname === paths.bcycle[selectedLanguage as EnumLangType] ? "#ff6600" : "" }}>
                    {translatesWord['bcycle_dropdown']}
                  </Link>
                </div>
              )}
            </nav>

            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpScrollHeader;

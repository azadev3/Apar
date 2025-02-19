import React from "react";
import { useLogo } from "../../context/GetLogoContext";
import "../../styles/header/scrollheader.scss";
import { HeaderLogoType, HeaderTitleType } from "./Header";
import { Link, useLocation } from "react-router-dom";
import { AccordingChangeColorToLocation } from "./ChangeHeaderLinkColor";
import { useTranslateApi } from "../../context/GetTranslateContext";
import { useLang } from "../../context/SelectedLanguage";
import { EnumLangType } from "../pages/WhyRidePage";
import { paths } from "../../App";

const ScrollHeader = () => {
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
  const [dropdownVehicles, setDropdownVehicles] = React.useState<boolean>(false);

  const vehiclesDivRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      if (vehiclesDivRef.current && !vehiclesDivRef.current.contains(e.target as Node)) {
        setDropdownVehicles(false);
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    return () => {
      document.removeEventListener("click", outsideClicked);
    };
  }, []);

  return (
    <div className="scroll-header">
      <Link to="/" className="logo-black">
        {logo.slice(1, 2).map((logo: HeaderLogoType, i: number) => (
          <img src={logo.scroll_logo} alt="logo-apar" key={i} />
        ))}
      </Link>

      <nav>
        {HeaderItem.map((item: HeaderTitleType, i: number) => (
          <Link
            to={item.to}
            className="header-item"
            onMouseEnter={(e) => {
              item.id === 1 ? setDropdownVehicles((prev) => !prev) : () => { };
              item.id === 1 ? e.preventDefault() : "";
            }}
            onMouseLeave={() => setDropdownVehicles(false)}
            style={{
              color:
                item.id !== 1 ? AccordingChangeColorToLocation(item.id, location) : dropdownVehicles ? "#ff6600" : "",
            }}
            key={i}>
            {item.title}
            {item.id === 1 && (
              <img
                src="../dovnblack.svg"
                style={{
                  transform: dropdownVehicles ? "rotate(180deg)" : "",
                  transition: "0.3s ease-out",
                  marginLeft: "8px",
                }}
                width="18px"
                alt="down-black"
              />
            )}
          </Link>
        ))}
        {dropdownVehicles && (
          <div className="vehicles-dropdown" ref={vehiclesDivRef}>
            <Link
              to={paths.e_bcycle[selectedLanguage as EnumLangType]}
              className="e-bcycle-title"
              style={{ color: location.pathname === paths.e_bcycle[selectedLanguage as EnumLangType] ? "#ff6600" : "" }}>
              {translatesWord["ebcycle_dropdown"]}
            </Link>
            <Link
              to={paths.bcycle[selectedLanguage as EnumLangType]}
              className="bcycle-title"
              style={{ color: location.pathname === paths.bcycle[selectedLanguage as EnumLangType] ? "#ff6600" : "" }}>
              {translatesWord["bcycle_dropdown"]}
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default ScrollHeader;

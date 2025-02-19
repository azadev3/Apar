import React from "react";
import { useLogo } from "../../context/GetLogoContext";
import { HeaderLogoType } from "../header/Header";
import { LinkType } from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../../context/SelectedLanguage";
import { useTranslateApi } from "../../context/GetTranslateContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { option } from "../../Api";
import { SocialType } from "../pages/ContactPage";
import { EnumLangType } from "../pages/WhyRidePage";
import { paths } from "../../App";

const MobileFooter: React.FC = () => {
  const { translatesWord } = useTranslateApi();
  const { logo } = useLogo();
  const { selectedLanguage } = useLang();

  const Product: LinkType[] = [
    // {
    //   id: 1,
    //   title: `${translatesWord["transport_nav"]}`,
    //   to: "/",
    // },
    {
      id: 2,
      title: `${translatesWord["why_ride_nav"]}`,
      to: paths.whyride[selectedLanguage as EnumLangType],
    },
    {
      id: 3,
      title: `${translatesWord["howtoride_nav"]}`,
      to: "/",
    },
  ];

  const Contact: LinkType[] = [
    {
      id: 1,
      title: `${translatesWord["partner_nav"]}`,
      to: paths.be_partner[selectedLanguage as EnumLangType],
    },
    {
      id: 2,
      title: `${translatesWord["contact_nav"]}`,
      to: paths.contact[selectedLanguage as EnumLangType],
    },
  ];

  const Company: LinkType[] = [
    {
      id: 1,
      title: `${translatesWord["about_nav"]}`,
      to: paths.about[selectedLanguage as EnumLangType],
    },
    {
      id: 2,
      title: `${translatesWord["blog_nav"]}`,
      to: paths.blog[selectedLanguage as EnumLangType],
    },
  ];

  // const getScroll = () => {
  //   document.getElementById("feel-the-difference")?.scrollIntoView({ behavior: "smooth" });
  // };
  const getScroll2 = () => {
    document.getElementById("howtoridescrolling")?.scrollIntoView({ behavior: "smooth" });
  };
  // const getScroll3 = () => {
  //   document.getElementById("whyride")?.scrollIntoView({ behavior: "smooth" });
  // };

  const navigate = useNavigate();

  const [socials, setSocials] = React.useState<SocialType[]>([]);

  const { data: socialsData } = useQuery({
    queryKey: ["socialsData", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get("https://coming.166tech.az/api/footer_icons", option(selectedLanguage));
      return response.data;
    },
    staleTime: 550000,
  });

  React.useEffect(() => {
    if (socialsData) {
      setSocials(socialsData);
    }
  }, [selectedLanguage, socialsData]);

  return (
    <footer className="mobile-footer">
      <div className="navbar-footer" id="navbar-fo">
        <div className="nav">
          <span>{translatesWord["footer_product_nav"]}</span>
          {Product.map((item: LinkType, i: number) => (
            <span
              className="itemlink"
              key={i}
              onClick={() => {
                if (item.id === 3) {
                  getScroll2();
                } else if (item.id === 2) {
                  navigate(paths.whyride[selectedLanguage as EnumLangType]);
                }
              }}>
              {item.title}
            </span>
          ))}
        </div>

        <div className="nav">
          <span>{selectedLanguage === "az" ? "Əlaqə" : selectedLanguage === "ru" ? "Контакт" : "Contact"}</span>
          {Contact.map((item: LinkType, i: number) => (
            <Link to={item.to} className="itemlink" key={i}>
              {item.title}
            </Link>
          ))}
        </div>

        <div className="nav">
          <span>{selectedLanguage === "az" ? "Şirkət" : selectedLanguage === "ru" ? "Компания" : "Company"}</span>

          {Company.map((item: LinkType, i: number) => (
            <Link to={item.to} className="itemlink" key={i}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="rules">
        <Link
          target="_blank"
          to={translatesWord["footer_qaydalar_yonlendirme"]}
          className="rule"
          // style={{ cursor: "no-drop", color: "#CECECE38" }}
        >
          {translatesWord ? <>{translatesWord["footer_rules_nav"]?.split("/")?.join("")}</> : ""}
        </Link>
        <Link
          target="_blank"
          to={translatesWord["footer_mexfilik_yonlendirme"]}
          className="rule"
          style={{ textWrap: "nowrap" }}
          // style={{ cursor: "no-drop", color: "#CECECE38", textWrap: "nowrap" }}
        >
          {translatesWord["footer_security_nav"]}
        </Link>
      </div>

      <div className="logo-and-social">
        <Link to="/" className="left-logo">
          {logo.slice(0, 1).map((logo: HeaderLogoType, i: number) => (
            <img src={logo.logo} key={i} />
          ))}
        </Link>

        <div className="right-social">
          {socials?.map((item: SocialType, i: number) => (
            <Link to={item.url ? item.url : ""} target="_blank" className="social-item" key={item?.id}>
              <img src={item?.icon} alt={`${i}-icon`} />
            </Link>
          ))}
        </div>
      </div>

      <p>{translatesWord["footer_aparide2024"]}</p>
    </footer>
  );
};

export default MobileFooter;

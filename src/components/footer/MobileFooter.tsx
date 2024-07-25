import React from "react";
import { useLogo } from "../../context/GetLogoContext";
import { HeaderLogoType } from "../header/Header";
import { LinkType } from "./Footer";
import { Link } from "react-router-dom";
import { useLang } from "../../context/SelectedLanguage";
import { useTranslateApi } from "../../context/GetTranslateContext";

const MobileFooter: React.FC = () => {
  const { translatesWord } = useTranslateApi();
  const { logo } = useLogo();
  const { selectedLanguage } = useLang();

  const Product: LinkType[] = [
    {
      id: 1,
      title: `${translatesWord["transport_nav"]}`,
      to: "/",
    },
    {
      id: 2,
      title: `${translatesWord["why_ride_nav"]}`,
      to: "/whyride",
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
      to: "/bepartner",
    },
    {
      id: 2,
      title: `${translatesWord["contact_nav"]}`,
      to: "/contact",
    },
  ];

  const Company: LinkType[] = [
    {
      id: 1,
      title: `${translatesWord["about_nav"]}`,
      to: "/about",
    },
    {
      id: 2,
      title: `${translatesWord["blog_nav"]}`,
      to: "/blog",
    },
  ];

  const getScroll = () => {
    document.getElementById("feel-the-difference")?.scrollIntoView({ behavior: "smooth" });
  };
  const getScroll2 = () => {
    document.getElementById("how-toride")?.scrollIntoView({ behavior: "smooth" });
  };
  const getScroll3 = () => {
    document.getElementById("mobile_whyride")?.scrollIntoView({ behavior: "smooth" });
  };

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
                if (item.id === 1) {
                  getScroll();
                } else if (item.id === 2) {
                  getScroll2();
                } else if (item.id === 3) {
                  getScroll3();
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
          to={translatesWord["footer_qaydalar_yonlendirme"]}
          className="rule"
          style={{ cursor: "no-drop", color: "#CECECE38" }}
          onClick={(e) => e.preventDefault()}>
          {translatesWord["footer_rules_nav"]}
        </Link>
        <Link
          to={translatesWord["footer_mexfilik_yonlendirme"]}
          className="rule"
          style={{ cursor: "no-drop", color: "#CECECE38" }}
          onClick={(e) => e.preventDefault()}>
          {translatesWord["footer_mexfilik_nav"]}
        </Link>
        <Link
          to={translatesWord["footer_tehlukesizlik_yonlendirme"]}
          className="rule"
          style={{ cursor: "no-drop", color: "#CECECE38" }}
          onClick={(e) => e.preventDefault()}>
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
          <Link to={translatesWord["footer_facebook_link"]} className="social-item">
            <img src="../facewhite.png" alt="" />
          </Link>
          <Link to={translatesWord["footer_linkedin_link"]} className="social-item">
            <img src="../linkedinwhite.png" alt="" />
          </Link>
          <Link to={translatesWord["footer_instagram_link"]} className="social-item">
            <img src="../instawhite.png" alt="" />
          </Link>
          <Link to={translatesWord["footer_youtube_link"]} className="social-item">
            <img src="../youtubewhite.png" alt="" />
          </Link>
        </div>
      </div>

      <p>{translatesWord["footer_aparide2024"]}</p>
    </footer>
  );
};

export default MobileFooter;

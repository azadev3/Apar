import React from "react";
import "../../styles/footer/footer.scss";
import { Link } from "react-router-dom";
import MobileFooter from "./MobileFooter";
import { useLang } from "../../context/SelectedLanguage";
import axios from "axios";
import { api, option } from "../../Api";
import { useLogo } from "../../context/GetLogoContext";
import { HeaderLogoType } from "../header/Header";
import { useQuery } from "@tanstack/react-query";
import { useTranslateApi } from "../../context/GetTranslateContext";

export type LinkType = {
  id: number;
  title: string;
  to: string;
};

// export type SocialType = {
//   id: number;
//   icon: string;
// };

type SocialType = {
  id: number;
  title: string;
  account: string;
  icon: string;
  colorizeicon: string;
  url?: string;
  footer_icon: string;
};

const Footer = () => {
  const { translatesWord } = useTranslateApi();

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

  const [socials, setSocials] = React.useState<SocialType[]>([]);

  const { data: socialsData } = useQuery({
    queryKey: ["socialsData", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.social_medias, option(selectedLanguage));
      return response.data;
    },
    staleTime: 550000,
  });

  React.useEffect(() => {
    if (socialsData) {
      setSocials(socialsData);
    }
  }, [selectedLanguage, socialsData]);

  //if 768 small screens set new Footer
  const [changeFooter, setChangeFooter] = React.useState<boolean>(false);

  React.useEffect(() => {
    const controlSize = () => {
      if (window.innerWidth <= 1250) {
        setChangeFooter(true);
      } else {
        setChangeFooter(false);
      }
    };

    controlSize();

    window.addEventListener("resize", controlSize);
    return () => {
      window.removeEventListener("resize", controlSize);
    };
  }, []);

  const { logo } = useLogo();

  const getScroll = () => {
    document.getElementById("feel-the-difference")?.scrollIntoView({ behavior: "smooth" });
  };
  const getScroll2 = () => {
    document.getElementById("how-toride")?.scrollIntoView({ behavior: "smooth" });
  };
  const getScroll3 = () => {
    document.getElementById("whyride")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <React.Fragment>
      {changeFooter ? (
        <MobileFooter />
      ) : (
        <footer className="footer">
          <div className="footer-wrapper">
            <div className="top">
              <div className="left">
                <Link to="/" className="logo-wrapper">
                  {logo.slice(0, 1).map((logo: HeaderLogoType, i: number) => (
                    <img src={logo.logo} alt="logo-apar" key={i} />
                  ))}
                </Link>
              </div>
              <div className="right">
                <div className="product">
                  <span>{translatesWord["footer_product_nav"]}</span>
                  {Product.map((item: LinkType, i: number) => (
                    <span
                      className="product-item"
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

                <div className="contact">
                  <span>{selectedLanguage === "az" ? "Əlaqə" : selectedLanguage === "ru" ? "Контакт" : "Contact"}</span>
                  {Contact.map((item: LinkType, i: number) => (
                    <Link to={item.to} className="product-item" key={i}>
                      {item.title}
                    </Link>
                  ))}
                </div>

                <div className="company">
                  <span>
                    {selectedLanguage === "az" ? "Şirkət" : selectedLanguage === "ru" ? "Компания" : "Company"}
                  </span>
                  {Company.map((item: LinkType, i: number) => (
                    <Link to={item.to} className="product-item" key={i}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="bottom">
              <p>{translatesWord["footer_aparide2024"]}</p>
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

              <div className="socials">
                {socials.slice(0, 4).map((item: SocialType, i: number) => (
                  <Link to={item.url ? item.url : ""} target="_blank" className="icon" key={i}>
                    <div className="icon-wrapper">
                      <img src={item.footer_icon} alt="" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      )}
    </React.Fragment>
  );
};

export default Footer;

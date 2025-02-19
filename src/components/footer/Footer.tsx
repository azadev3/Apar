import React from "react";
import "../../styles/footer/footer.scss";
import { Link, useNavigate } from "react-router-dom";
import MobileFooter from "./MobileFooter";
import { useLang } from "../../context/SelectedLanguage";
import axios from "axios";
import { option } from "../../Api";
import { useLogo } from "../../context/GetLogoContext";
import { HeaderLogoType } from "../header/Header";
import { useQuery } from "@tanstack/react-query";
import { useTranslateApi } from "../../context/GetTranslateContext";
import { EnumLangType } from "../pages/WhyRidePage";
import { paths } from "../../App";

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
  account: any;
  icon: string;
  url: string;
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
                  target="_blank"
                  to={translatesWord["footer_qaydalar_yonlendirme"]}
                  className="rule"
                  // style={{ cursor: "no-drop", color: "#CECECE38" }}
                >
                  {translatesWord["footer_rules_nav"]}
                </Link>
                <Link
                  target="_blank"
                  to={translatesWord["footer_mexfilik_yonlendirme"]}
                  className="rule"
                  // style={{ cursor: "no-drop", color: "#CECECE38" }}
                >
                  {translatesWord["footer_security_nav"]}
                </Link>
              </div>

              <div className="socials">
                {socials?.map((item: SocialType, i: number) => (
                  <Link to={item.url ? item.url : ""} target="_blank" className="icon" key={item?.id}>
                    <div className="icon-wrapper">
                      <img src={item?.icon} alt={`${i}-icon`} />
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

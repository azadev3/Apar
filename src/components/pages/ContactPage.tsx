import React from "react";
import "../../styles/pages/contactpage.scss";
import { Link } from "react-router-dom";
import LatestNews from "./blogpageuitils/LatestNews";
import DownloadApp from "../homepage/uitilshomepage/DownloadApp";
import { useLang } from "../../context/SelectedLanguage";
import axios from "axios";
import { api, option } from "../../Api";
import { useLogo } from "../../context/GetLogoContext";
import { HeaderLogoType } from "../header/Header";
import { useQuery } from "@tanstack/react-query";
import { useTranslateApi } from "../../context/GetTranslateContext";

type NavContentType = {
  id: number;
  title: string;
  description: string;
};

type NavTypes = {
  id: number;
  title: string;
  content: NavContentType[];
};

export type SocialType = {
  id: number;
  title: string;
  account: string;
  icon: string;
  colorizeicon: string;
  url?: string;
};

const ContactPage = () => {
  const [active, setActive] = React.useState<{ [key: number]: boolean }>({ [0]: true });
  const [activeItem, setActiveItem] = React.useState<{ [key: number]: boolean }>({ [0]: true });

  const handleActived = (key: number) => {
    setActiveItem(() => ({
      [key]: true,
    }));
    setActive(() => ({
      [key]: true,
    }));
  };

  const [hoverSocial, setHoverSocial] = React.useState<{ [key: number]: boolean }>({});
  const handleHover = (key: number) => {
    setHoverSocial(() => ({
      [key]: true,
    }));
  };

  const handleLeave = (key: number) => {
    setHoverSocial(() => ({
      [key]: false,
    }));
  };

  //if 768 small screens set new WhyRidePage section
  const [changeFindus, setChangeFindus] = React.useState<boolean>(false);

  React.useEffect(() => {
    const controlSize = () => {
      if (window.innerWidth <= 1000) {
        setChangeFindus(true);
      } else {
        setChangeFindus(false);
      }
    };

    controlSize();

    window.addEventListener("resize", controlSize);
    return () => {
      window.removeEventListener("resize", controlSize);
    };
  }, []);

  const { selectedLanguage } = useLang();
  const [socials, setSocials] = React.useState<SocialType[]>([]);
  const [navData, setNavData] = React.useState<NavTypes[]>([]);

  const { data: social_media_datas } = useQuery({
    queryKey: ["social_media_datas", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.social_medias, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  const { data: getting_started_datas } = useQuery({
    queryKey: ["getting_started_datas", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.getting_started_titles, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (social_media_datas) {
      setSocials(social_media_datas);
    }
    if (getting_started_datas) {
      setNavData(getting_started_datas);
    }
  }, [social_media_datas, getting_started_datas]);

  const { logo } = useLogo();

  const { translatesWord } = useTranslateApi();

  return (
    <div className="contact-page">
      <div className="contact-page-wrapper">
        <div className="contact-page-topcontent">
          {logo.slice(5, 6).map((logo: HeaderLogoType, i: number) => (
            <img src={logo.contact_banner} key={i} loading="lazy" />
          ))}

          <div className="wrapper-findus">
            <h1 style={{ textTransform: "uppercase" }}>
              <span>{translatesWord["contact_page_title_find_us"].split(" ")[0]}</span>
              <span>{translatesWord["contact_page_title_find_us"].split(" ").slice(1).join(" ")}</span>
            </h1>
          </div>
        </div>

        <div className="nav-and-contents">
          <div className="navigators">
            {navData.map((item: NavTypes, i: number) => (
              <div className={`nav-item ${active[i] ? "active-item" : ""}`} key={i} onClick={() => handleActived(i)}>
                <span>{item.title}</span>
              </div>
            ))}
          </div>

          <div className="content">
            {navData.map((item: NavTypes, i: number) => (
              <React.Fragment key={i}>
                {activeItem[i] ? (
                  <div className="content" key={i}>
                    {item.content.map((item: NavContentType, i: number) => (
                      <React.Fragment key={i}>
                        <div className="title">
                          <h1>{item.title}</h1>
                        </div>
                        <div className="description">
                          <p>{item.description}</p>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="socials">
          <div className="social-container">
            {socials.map((item: SocialType, i: number) => (
              <Link
                to={item.url ? item.url : ""}
                className="link-item"
                key={i}
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={() => handleLeave(i)}>
                <div className="image-wrapper">
                  <img src={hoverSocial[i] || changeFindus ? item?.colorizeicon : item?.icon} alt="" />
                </div>
                <div className="titles">
                  <article>{item?.title}</article>
                  <span>{item?.account}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <LatestNews />
        {/* {changeFindus && <WinsOfTheMounth />} */}
        <DownloadApp />
      </div>
    </div>
  );
};

export default ContactPage;

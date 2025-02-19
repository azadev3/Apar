import React from "react";
import "../../styles/pages/whyridepage.scss";
import Howtorideflag from "./whyridepageuitils/Howtorideflag";
import HowToRide from "../homepage/uitilshomepage/HowToRide";
import DownloadApp from "../homepage/uitilshomepage/DownloadApp";
import { useLang } from "../../context/SelectedLanguage";
import axios from "axios";
import { api, option } from "../../Api";
import { useTranslateApi } from "../../context/GetTranslateContext";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../App";

type NavType = {
  id: number;
  title: string;
  image: string;
  description: string;
};

type BottomItemType = {
  id: number;
  title: string;
  text: string;
  image: string;
};

export const routeWhyRideTitle = {
  az: 'sürüş',
  en: 'why-ride',
  ru: 'apicumu'
}
export type EnumLangType = 'az' | 'en' | 'ru';

const WhyRidePage = () => {
  const { lang } = useParams<{ lang: 'az' | 'en' | 'ru'; }>();
  const { selectedLanguage } = useLang();
  const { translatesWord } = useTranslateApi();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (selectedLanguage && selectedLanguage !== lang) {
      const newPath = paths.whyride[selectedLanguage as keyof typeof paths.whyride];
      if (newPath) {
        navigate(newPath, { replace: true });
      }
    }
  }, [selectedLanguage, lang, navigate]);

  const [ridesdata, setRidesdata] = React.useState<BottomItemType[]>([]);
  const [navData, setNavData] = React.useState<NavType[]>([]);

  const { data: why_ride_datas } = useQuery({
    queryKey: ["why_ride_datas", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.why_rides_content, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  const { data: navdatas } = useQuery({
    queryKey: ["navdatas", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.fun_with_friends, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (why_ride_datas) {
      setRidesdata(why_ride_datas);
    }
    if (navdatas) {
      setNavData(navdatas);
    }
  }, [why_ride_datas, navdatas]);

  const [selectedNavItemIndex, setSelectedNavItemIndex] = React.useState(() => {
    const storedIndex = localStorage.getItem("selectedNavItemIndex");
    return storedIndex ? parseInt(storedIndex, 10) : 0;
  });

  const [selectedNavDetails, setSelectedNavDetails] = React.useState(() => {
    const storedDetails = localStorage.getItem("selectedNavDetails");
    return storedDetails ? JSON.parse(storedDetails) : navData[0];
  });

  const [hoveredImage, setHoveredImage] = React.useState<string>(selectedNavDetails?.image);
  const handleHover = (index: number) => {
    setSelectedNavItemIndex(index);
    setSelectedNavDetails(navData[index]);
    localStorage.setItem("selectedNavItemIndex", index.toString());
    localStorage.setItem("selectedNavDetails", JSON.stringify(navData[index]));
    const image = new Image();
    image.src = navData[index].image;
    image.onload = () => {
      setHoveredImage(navData[index].image);
    };
  };

  const handleLeave = () => {
    setSelectedNavItemIndex(0);
    setSelectedNavDetails(navData[0]);
    localStorage.setItem("selectedNavItemIndex", "0");
    localStorage.setItem("selectedNavDetails", JSON.stringify(navData[0]));
  };

  React.useEffect(() => {
    const storedIndex = localStorage.getItem("selectedNavItemIndex");
    const storedDetails = localStorage.getItem("selectedNavDetails");
    if (storedIndex && storedDetails) {
      setSelectedNavItemIndex(parseInt(storedIndex, 10));
      setSelectedNavDetails(JSON.parse(storedDetails));
    }
  }, []);

  //if 768 small screens set new WhyRidePage section
  const [changeWhyRideSection, setChangeWhyRideSection] = React.useState<boolean>(false);

  React.useEffect(() => {
    const controlSize = () => {
      if (window.innerWidth <= 968) {
        setChangeWhyRideSection(true);
      } else {
        setChangeWhyRideSection(false);
      }
    };

    controlSize();

    window.addEventListener("resize", controlSize);
    return () => {
      window.removeEventListener("resize", controlSize);
    };
  }, []);


  return (
    <div className="why-ride-page">
      <div className="whyridepage-wrapper">
        <div className="top">
          <div className="left">
            <div className="text">
              <h1
                style={{
                  textTransform: "uppercase",
                  fontSize: selectedLanguage === "ru" || selectedLanguage === "az" ? "70px" : "",
                }}>
                {translatesWord["why_ride_footer"]}
              </h1>
              <div className="description">
                <p style={{ paddingRight: "30px" }}>
                  {selectedNavDetails?.description ? selectedNavDetails?.description : navData[0]?.description}
                </p>
              </div>
            </div>
            <div className="navigators">
              {navData.map((navs: NavType, i: number) => (
                <span
                  key={i}
                  className="nav-li"
                  style={{
                    background: i === selectedNavItemIndex ? "#ff6600" : "",
                    color: i === selectedNavItemIndex ? "#FFFFFF" : "",
                  }}
                  onMouseEnter={() => (!changeWhyRideSection ? handleHover(i) : () => { })}
                  onMouseLeave={() => (!changeWhyRideSection ? handleLeave : () => { })}
                  onClick={() => (changeWhyRideSection ? handleHover(i) : () => { })}>
                  {navs.title}
                </span>
              ))}
            </div>
          </div>

          <div className="right">
            <img src={hoveredImage ? hoveredImage : navData[0]?.image} />
          </div>
        </div>
      </div>

      {ridesdata.map((item: BottomItemType, i: number) => (
        <React.Fragment key={i}>
          {changeWhyRideSection ? (
            <div className="easy-parking-section-mobile">
              <div className="left">
                <h5 className={i === 1 || i === 3 ? "shadow-text" : ""}>{item.title}</h5>
                <p>{item.text}</p>
              </div>
              <div className="right">
                <img src={item.image} alt="" />
              </div>
            </div>
          ) : (
            <div className="easy-parking-section" style={{ backgroundColor: i === 0 || i === 2 ? "#fff4ed" : "" }}>
              <div
                style={{ flexDirection: i === 1 || i === 3 ? "row-reverse" : "unset" }}
                className={`easy-parking-section-wrapper ${i === 1 || i === 3 ? "thinking-eco-system" : ""}`}>
                <div className="left">
                  <h5 className={i === 1 || i === 3 ? "shadow-text" : ""}>{item.title}</h5>
                  <p>{item.text}</p>
                </div>
                <div className="right" style={{ width: i === 3 ? "100%" : "" }}>
                  <img src={item.image} alt="" />
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}

      {!changeWhyRideSection && <Howtorideflag />}
      <HowToRide />
      {!changeWhyRideSection && (
        <>
          <br />
          <br />
          <br />
        </>
      )}
      <DownloadApp />
    </div>
  );
};

export default WhyRidePage;

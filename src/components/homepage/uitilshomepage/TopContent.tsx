import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useLang } from "../../../context/SelectedLanguage";
import axios from "axios";
import { option } from "../../../Api";
import { useQuery } from "@tanstack/react-query";

type HeroApiType = {
  id: number;
  image: string;
  is_image: boolean;
  title: string;
  video: string;
};

export type MediaDataType = {
  id: number;
  type: string;
  link: string;
  hero_icon: string;
  footer_icon: string;
};

const TopContent = () => {
  const navigate = useNavigate();

  const { selectedLanguage } = useLang();

  const [changeSocials, setChangeSocials] = React.useState<boolean>(false);

  React.useEffect(() => {
    const Controlling = () => {
      if (window.innerWidth <= 468) {
        setChangeSocials(true);
      } else {
        setChangeSocials(false);
      }
    };
    Controlling();

    window.addEventListener("resize", Controlling);
    return () => {
      window.removeEventListener("resize", Controlling);
    };
  }, []);

  const [hero, setHero] = React.useState<HeroApiType[]>([]);

  const { data: heroDatas } = useQuery({
    queryKey: ["heroDatas", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get("https://coming.166tech.az/api/mains", option(selectedLanguage));
      return response.data;
    },
    staleTime: 600000,
  });

  React.useEffect(() => {
    if (heroDatas) {
      setHero(heroDatas);
    }
  }, [heroDatas]);

  const [mediaIcon, setMediaIcon] = React.useState<MediaDataType[]>([]);
  const { data: MediaData } = useQuery({
    queryKey: ["mediadata"],
    queryFn: async () => {
      const response = await axios.get("https://coming.166tech.az/api/stores");
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (MediaData) {
      setMediaIcon(MediaData);
    }
  }, [MediaData]);

  return (
    <div className="top-content-provider">
      {changeSocials && (
        <div className="googleplay-and-appstore-for-mobile">
          {mediaIcon.map((item: MediaDataType, i: number) => (
            <React.Fragment key={i}>
              {item.type === "appstore" && (
                <Link to={item.link} className="appstorelogo">
                  <img
                    src={item.type === "appstore" ? item.hero_icon : ""}
                    alt="appstore"
                    style={{ borderRadius: "6px" }}
                  />
                </Link>
              )}
              {item.type === "playstore" && (
                <Link to={item.link} className="appstorelogo">
                  <img
                    src={item.type === "playstore" ? item.hero_icon : ""}
                    alt="playstore"
                    style={{ borderRadius: "6px" }}
                  />
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="top-content">
        {hero.map((heroitem: HeroApiType, i: number) => (
          <React.Fragment key={i}>
            {heroitem.is_image ? (
              <img src={heroitem.image} alt={heroitem.title} loading="lazy" />
            ) : (
              <video src={heroitem.video} autoPlay={true} muted={true} loop={true} controls={false} playsInline />
            )}
          </React.Fragment>
        ))}
        <div className="text-content-top-content">
          {hero.map((item: HeroApiType, i: number) => (
            <h1 onClick={() => navigate("/contact")} key={i}>
              {item?.title?.split(" ")?.map((word, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <br />}
                  {word}
                </React.Fragment>
              ))}
            </h1>
          ))}

          <div className="googleplay-and-appstore">
            {mediaIcon.map((item: MediaDataType, i: number) => (
              <React.Fragment key={i}>
                {item.type === "appstore" && (
                  <Link to={item.link} className="appstorelogo">
                    <img
                      src={item.type === "appstore" ? item.hero_icon : ""}
                      alt="appstore"
                      style={{ borderRadius: "6px" }}
                    />
                  </Link>
                )}
                {item.type === "playstore" && (
                  <Link to={item.link} className="appstorelogo">
                    <img
                      src={item.type === "playstore" ? item.hero_icon : ""}
                      alt="playstore"
                      style={{ borderRadius: "6px" }}
                    />
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopContent;

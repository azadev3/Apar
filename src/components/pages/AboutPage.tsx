import React from "react";
import "../../styles/pages/about.scss";
import Howtorideflag from "./whyridepageuitils/Howtorideflag";
import HowToRide from "../homepage/uitilshomepage/HowToRide";
import DownloadApp from "../homepage/uitilshomepage/DownloadApp";
import { useLang } from "../../context/SelectedLanguage";
import { api, option } from "../../Api";
import axios from "axios";
import { useTranslateApi } from "../../context/GetTranslateContext";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { EnumLangType } from "./WhyRidePage";
import { paths } from "../../App";

type ExperienceType = {
  id: number;
  title: string;
  text: string;
  image: string;
};

type CollectiveType = {
  id: number;
  title: string;
  position: string;
  image: string;
  color: string;
};

const AboutPage = () => {
  const { lang } = useParams<{ lang: EnumLangType }>();
  const { selectedLanguage } = useLang();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (selectedLanguage && selectedLanguage !== lang) {
      const newPath = paths.about[selectedLanguage as keyof typeof paths.about];
      if (newPath) {
        navigate(newPath, { replace: true });
      }
    }
  }, [lang, selectedLanguage, navigate]);


  const [collective, setCollective] = React.useState<CollectiveType[]>([]);

  const { data: ourCollectiveData } = useQuery({
    queryKey: ["ourCollectiveData", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.our_collective, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  const [advantages, setAdvantages] = React.useState<ExperienceType[]>([]);

  const { data: ouradvantages } = useQuery({
    queryKey: ["ouradvantages", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.our_advantages, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (ourCollectiveData) {
      setCollective(ourCollectiveData);
    }
    if (ouradvantages) {
      setAdvantages(ouradvantages);
    }
  }, [ourCollectiveData, ouradvantages]);

  const { translatesWord } = useTranslateApi();

  //selected experience-box data
  const [expBoxData, setExpBoxData] = React.useState<number | null>(0);

  const handleSelectExperienceBox = (i: number) => {
    setExpBoxData(i);
  };

  return (
    <div className="about-us">
      <div className="about-us-wrapper">
        <div className="top-our-advantages">
          <div className="left-our">
            <h1 className="ouradvantagestitle">{translatesWord["our_advantages"]}</h1>
            <div className="show-experience-data">
              {advantages &&
                advantages.length > 0 &&
                advantages.map((item: ExperienceType, i: number) => {
                  if (expBoxData === i) {
                    return (
                      <React.Fragment key={item?.id}>
                        <span style={{ textTransform: "capitalize" }}>{item?.title}</span>
                        <p>{item?.text}</p>
                      </React.Fragment>
                    );
                  }
                })}
            </div>
          </div>

          <div className="right-our">
            {advantages &&
              advantages.length > 0 &&
              advantages.map((box: ExperienceType, i: number) => (
                <div
                  onClick={() => handleSelectExperienceBox(i)}
                  key={i}
                  className={`experience-box ${expBoxData === i ? "selected-exp" : ""}`}
                  style={{
                    background:
                      i === 0 ? "#b0c5a4" : i === 1 ? "#9bb0c1" : i === 2 ? "#f2c18d" : i === 3 ? "#d37676" : "",
                  }}>
                  <div className="logo-wrapper">
                    <img src={box.image} alt="" />
                  </div>

                  <div className="text">
                    <h4>{box.title}</h4>
                    <p>{box.text}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="our-collective-section">
          <div className="title">
            <h5>{translatesWord['our_collective_title']}</h5>
          </div>

          <div className="collective-grid">
            {collective.map((item: CollectiveType, i: number) => (
              <div className="collective-items" key={i} style={{ backgroundColor: item.color }}>
                <div className="left">
                  <div className="image-wrapper">
                    <img src={item.image} alt="profile-user" />
                  </div>
                </div>

                <div className="right">
                  <h3>{item?.title}</h3>
                  <span>{item?.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Howtorideflag />
        <HowToRide />
        <DownloadApp />
      </div>
    </div>
  );
};

export default AboutPage;

import React from "react";
import "../../../styles/homepage/homepage.scss";
import { GoPlay } from "react-icons/go";
import { useLang } from "../../../context/SelectedLanguage";
import { api, option } from "../../../Api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useTranslateApi } from "../../../context/GetTranslateContext";

type HowToRideType = {
  id: number;
  title: string;
  description: string;
  image: string;
  video: string;
};

const HowToRide = () => {
  const [playing, setPlaying] = React.useState<boolean>(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const handlePlay = () => {
    let playBtn = document.getElementById("play-icon");
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
      playBtn ? (playBtn.style.display = "none") : null;
    }
  };

  const { selectedLanguage } = useLang();
  const [howtoridedata, setData] = React.useState<HowToRideType[]>([]);

  const { data: howTorideData } = useQuery({
    queryKey: ["howTorideData", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.how_to_ride, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000
  });

  React.useEffect(() => {
    if (howTorideData) {
      setData(howTorideData);
    }
  }, [howTorideData]);

  const [controlSize, setControl] = React.useState<boolean>(false);
  React.useEffect(() => {
    const Controller = () => {
      if (window.innerWidth <= 968) {
        setControl(true);
      } else {
        setControl(false);
      }
    };

    Controller();

    window.addEventListener("resize", Controller);
    return () => {
      window.removeEventListener("resize", Controller);
    };
  }, []);
  const [controlSizeMin, setControlMin] = React.useState<boolean>(false);
  React.useEffect(() => {
    const Controller = () => {
      if (window.innerWidth <= 568) {
        setControlMin(true);
      } else {
        setControlMin(false);
      }
    };

    Controller();

    window.addEventListener("resize", Controller);
    return () => {
      window.removeEventListener("resize", Controller);
    };
  }, []);
  const location = useLocation();

  const { translatesWord } = useTranslateApi();

  return (
    <div
      className="how-to-ride-section"
      style={{
        background:
          location.pathname === "/whyride" ||
          location.pathname === "/blog" ||
          location.pathname === "/about" ||
          location.pathname === "/bepartner"
            ? "transparent"
            : "",
        marginTop:
          location.pathname === "/" ||
          location.pathname === "/whyride" ||
          location.pathname === "/blog" ||
          (location.pathname === "/bepartner" && !controlSizeMin)
            ? "60px"
            : location.pathname === '/about' && controlSize ? '0' : 
            location.pathname === '/about' && !controlSize ? '50px' : ''
            ,
        paddingTop: location.pathname === "/about" && controlSize ? "24px" : "",
        paddingBottom: location.pathname === '/about' && controlSize ? '70px' : "",
        marginBottom:
          location.pathname === "/" ||
          location.pathname === "/whyride" ||
          location.pathname === "/blog" ||
          (location.pathname === "/bepartner" && !controlSizeMin)
            ? "60px"
            : location.pathname === "/about" && controlSize
            ? "0px"
            : location.pathname === '/about' && !controlSize ? '60px' : '',
        backgroundColor:
          location.pathname === "/whyride" && controlSizeMin
            ? "rgba(255, 247, 241, 1)"
            : location.pathname === "/"
            ? "#FFF7F1"
            : location.pathname === "/about" && controlSize
            ? "#FFF7F1"
            : "",
      }}>
      {howtoridedata.map((item: HowToRideType, i: number) => (
        <div className="how-to-ride-section-wrappered" key={i} id="how-toride">
          <div className="left">
            <h1
              style={{
                display:
                  (location.pathname === "/about" && window.innerWidth <= 1200) ||
                  (location.pathname === "/bepartner" && window.innerWidth <= 1200)
                    ? "none"
                    : "block",
                textTransform: "uppercase",
              }}>
                {translatesWord['how_to_ride_footer']}
            </h1>

            <div dangerouslySetInnerHTML={{ __html: item?.description }}/>
          </div>

          <div className="right" style={{ marginTop: location.pathname === "/about" && controlSize ? "49px" : "" }}>
            <div className="video-wrapper">
              <video ref={videoRef} src={item.video} controls={playing || controlSize ? true : false} />
              <GoPlay className="play-icon" style={{ display: playing ? "none" : "" }} onClick={() => handlePlay()} />
              <div className="back-wrapper-video" style={{ display: playing ? "none" : "" }}>
                <img src={item.image} alt="" className="background-video" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HowToRide;

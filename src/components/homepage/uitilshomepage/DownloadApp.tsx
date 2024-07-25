import { Link } from "react-router-dom";
import { useTranslateApi } from "../../../context/GetTranslateContext";
import { useQR } from "../../../context/QrContext";
import React from "react";
import { MediaDataType } from "./TopContent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLang } from "../../../context/SelectedLanguage";

const DownloadApp = () => {
  const { translatesWord } = useTranslateApi();

  const { handleQrModal } = useQR();

  const [changeDownload, setChangeDownload] = React.useState<boolean>(false);
  React.useEffect(() => {
    const Controller = () => {
      if (window.innerWidth <= 1140) {
        setChangeDownload(true);
      } else {
        setChangeDownload(false);
      }
    };

    Controller();

    window.addEventListener("resize", Controller);
    return () => {
      window.removeEventListener("resize", Controller);
    };
  }, []);

  const { selectedLanguage } = useLang();
  const [mediaIcon, setMediaIcon] = React.useState<MediaDataType[]>([]);
  const { data: MediaData } = useQuery({
    queryKey: ["mediadata", selectedLanguage],
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
    <React.Fragment>
      {changeDownload ? (
        <div className="download-the-app-mobile">
          <div className="text-area">
            <div className="download-text">
              <h1>D</h1>
              <div className="capa1">
                <img src="../yenicapa.svg" />
              </div>
              <h1>WNL</h1>
              <div className="capa2">
                <img src="../yenicapanarinci.svg" />
              </div>
              <div className="text-wrap">
                <h1>AD</h1>
                <h1>THE</h1>
                <h1>APP</h1>
              </div>
            </div>
            <p>{translatesWord["download_app_paragraph"]}</p>

            <div className="buttons">
              <span
                onClick={handleQrModal}
                className="get-ride-btn"
                style={{ textTransform: "capitalize", cursor: "pointer" }}>
                {translatesWord["get_the_rideapp"]}
                <img src="../bbb.svg" alt="" width="25px" height="25px" />
              </span>

              <div className="images">
                {mediaIcon.map((item: MediaDataType, i: number) => (
                  <React.Fragment key={i}>
                    {item.type === "appstore" && (
                      <Link to={item.link} className="image1">
                        <img
                          src={item.type === "appstore" ? item.footer_icon : ""}
                          alt="appstore"
                          style={{ borderRadius: "6px" }}
                        />
                      </Link>
                    )}
                    {item.type === "playstore" && (
                      <Link to={item.link} className="image2">
                        <img
                          src={item.type === "playstore" ? item.footer_icon : ""}
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

          <div className="girl">
            <img src="../girlmobile.png" alt="" />
          </div>
        </div>
      ) : (
        <div className="download-the-app">
          <div className="download-the-app-wrapper">
            <div className="left">
              <div className="title-download">
                <h1>D</h1>
                <div className="capa">
                  <img src="../yenicapa.svg" alt="" width="140%" height="100%" />
                </div>
                <h1>WNL</h1>
                <div className="capa2">
                  <img src="../yenicapanarinci.svg" alt="" width="100%" height="100%" />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "7px",
                  }}>
                  <h1 className="ad">AD</h1>
                  <h1>THE APP</h1>
                </div>
              </div>

              <div className="paragraph-dapp">
                <p>{translatesWord["download_app_paragraph"]}</p>
              </div>

              <div className="buttons">
                <span
                  onClick={handleQrModal}
                  className="get-ride-btn"
                  style={{ textTransform: "capitalize", cursor: "pointer" }}>
                  {translatesWord["get_the_rideapp"]}
                </span>

                <div className="images">
                  {mediaIcon.map((item: MediaDataType, i: number) => (
                    <React.Fragment key={i}>
                      {item.type === "appstore" && (
                        <Link to={item.link} className="image1">
                          <img
                            src={item.type === "appstore" ? item.footer_icon : ""}
                            alt="appstore"
                            style={{ borderRadius: "6px" }}
                          />
                        </Link>
                      )}
                      {item.type === "playstore" && (
                        <Link to={item.link} className="image2">
                          <img
                            src={item.type === "playstore" ? item.footer_icon : ""}
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
            <div className="right">
              <div className="girl-wrapper">
                <img src="../girl.png" alt="specific-image-girl" />
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DownloadApp;

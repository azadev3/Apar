import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../../context/SelectedLanguage";
import { EbcycleType } from "../../pages/EbcyclePage";
import axios from "axios";
import { api, option } from "../../../Api";
import { useTranslateApi } from "../../../context/GetTranslateContext";
import { useQuery } from "@tanstack/react-query";

const FeelTheDifference = () => {
  const { selectedLanguage } = useLang();
  const [ebcycledata, setData] = React.useState<EbcycleType[]>([]);

  const { data: ebcycleData_aa } = useQuery({
    queryKey: ["ebcycleData_aa", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.feel_the_difference, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (ebcycleData_aa) {
      setData(ebcycleData_aa);
    }
  }, [ebcycleData_aa]);
  
  const { translatesWord } = useTranslateApi();

  const [reelImg, setReelImg] = React.useState<boolean>(false);
  React.useEffect(() => {
    const Controller = () => {
      if (window.innerWidth <= 768) {
        setReelImg(true);
      } else {
        setReelImg(false);
      }
    };

    Controller();

    window.addEventListener("resize", Controller);
    return () => {
      window.removeEventListener("resize", Controller);
    };
  }, []);

  return (
    <div className="feel-the-difference-container" id="feel-the-difference">
      <img className="ellipse1" src="../ellipse1.svg" alt="" />
      <img className="ellipse2" src="../ellipse2.svg" alt="" />
      <div className="text-content-area-feel-the-difference">
        <div className="top-text">
          <h1 style={{ textTransform: "uppercase" }}>
           {translatesWord['feel_the_difference']}
          </h1>
        </div>

        <div className="paragraph">
          <p>{translatesWord["feel_the_difference_paragraph"]}</p>
        </div>
      </div>

      <div className="left-right-pages">
        {ebcycledata.map(
          (item: EbcycleType, i: number) =>
            i === 0 && (
              <Link to="/e-bcycle" className="e-bcycle" key={i}>
                <img src={item.image} alt="" style={{ filter: reelImg ? "grayscale(0)" : "" }} />
                <h6>{item.title}</h6>
              </Link>
            )
        )}

        {ebcycledata.map(
          (item: EbcycleType, i: number) =>
            i === 1 && (
              <Link key={i} to="/bcycle" className="bcycle">
                <img src={item.image} alt="" style={{ filter: reelImg ? "grayscale(0)" : "" }} />
                <h6>{item.title}</h6>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default FeelTheDifference;

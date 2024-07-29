import React from "react";
import "../../styles/pages/bcycle.scss";
import Blog from "../homepage/uitilshomepage/Blog";
import DownloadApp from "../homepage/uitilshomepage/DownloadApp";
import { useLang } from "../../context/SelectedLanguage";
import { EbcycleType, Specifications } from "./EbcyclePage";
import { api, option } from "../../Api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useTranslateApi } from "../../context/GetTranslateContext";

const BcyclePage = () => {

  const { translatesWord } = useTranslateApi();

  const { selectedLanguage } = useLang();
  const [ebcycledata, setData] = React.useState<EbcycleType[]>([]);

  const { data: ebcycleDataaa } = useQuery({
    queryKey: ["ebcycleDataaa", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.feel_the_difference, option(selectedLanguage));
      console.log(response.data, "ebcycle data");
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (ebcycleDataaa) {
      setData(ebcycleDataaa);
    }
  }, [ebcycleDataaa]);

  const propertyData = ebcycledata
    .filter((item: EbcycleType, i: number) => i === 1 && item.specifications)
    .flatMap((item: EbcycleType) => item.specifications);

  const bcycle = ebcycledata.find((item: EbcycleType, i: number) => i === 1 && item);

  return (
    <div className="bcycle">
      <div className="top-content-bcycle">
        {bcycle?.is_image ? (
          <img src={bcycle?.main_image} alt={`${bcycle?.id}-image`} title={bcycle?.title} />
        ) : (
          <video src={bcycle?.video} autoPlay={true} muted={true} loop={true} controls={false} playsInline />
        )}

        <div className="text">
          <div className="title">
            <h1>{bcycle?.title}</h1>
          </div>
          <div className="paragraph">
            <p>{bcycle?.description}</p>
          </div>
        </div>
      </div>

      <div className="specifications">
        <div className="title">
          <h1>{translatesWord['specifications_title']}</h1>
        </div>

        <div className="content">
          <div className="left">
            {propertyData.slice(0, 5).map((item: Specifications, i: number) => (
              <div className="property-box" key={i}>
                <span>{item.title}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="right">
            {propertyData.slice(5, 10).map((item: Specifications, i: number) => (
              <div className="property-box" key={i}>
                <span>{item.title}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Blog />
      <DownloadApp />
    </div>
  );
};

export default BcyclePage;

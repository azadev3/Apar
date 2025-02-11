import React from "react";
import "../../styles/pages/bcycle.scss";
import Blog from "../homepage/uitilshomepage/Blog";
import DownloadApp from "../homepage/uitilshomepage/DownloadApp";
import { useLang } from "../../context/SelectedLanguage";
import { api, option } from "../../Api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useTranslateApi } from "../../context/GetTranslateContext";
import Loader from "../../Loader";

export type Specifications = {
  title: string;
  text: string;
};

export type EbcycleType = {
  id: number;
  title: string;
  description: string;
  image: string;
  main_image: string;
  video: string;
  is_image: boolean;
  specifications: Specifications[];
};

const EbcyclePage = () => {

  const { translatesWord } = useTranslateApi();

  const { selectedLanguage } = useLang();
  const [ebcycledata, setData] = React.useState<EbcycleType[]>([]);

  const { data: eb_cycle_datas, isLoading } = useQuery({
    queryKey: ["eb_cycle_datas", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.feel_the_difference, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (eb_cycle_datas) {
      setData(eb_cycle_datas);
    }
  }, [eb_cycle_datas]);

  const propertyData = ebcycledata
    .filter((item: EbcycleType, i: number) => i === 0 && item.specifications)
    .flatMap((item: EbcycleType) => item.specifications);

  const ebcycle = ebcycledata.find((item: EbcycleType, i: number) => i === 0 && item);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="e-bcycle">
      <div className="top-content-bcycle">
        {ebcycle?.is_image ? (
          <img src={ebcycle?.main_image} alt={`${ebcycle?.id}-image`} title={ebcycle?.title} />
        ) : (
          <video src={ebcycle?.video} autoPlay={true} muted={true} loop={true} controls={false} playsInline />
        )}

        <div className="text">
          <div className="title">
            <h1>{ebcycle?.title}</h1>
          </div>
          <div className="paragraph">
            <p>{ebcycle?.description}</p>
          </div>
        </div>
      </div>

      <div className="specifications">
        <div className="title">
          <h4>{translatesWord['specifications_title']}</h4>
        </div>

        <div className="content">
          <div className="left">
            {propertyData?.slice(0, 5).map((item: Specifications, i: number) => (
              <div className="property-box" key={i}>
                <span>{item.title}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="right">
            {propertyData?.slice(5, 10).map((item: Specifications, i: number) => (
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

export default EbcyclePage;

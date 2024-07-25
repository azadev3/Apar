import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLang } from "../../../context/SelectedLanguage";
import axios from "axios";
import { api, option } from "../../../Api";
import { useTranslateApi } from "../../../context/GetTranslateContext";
import { useQuery } from "@tanstack/react-query";

export type PartnersType = {
  id: number;
  image: string;
};

export const Partners: PartnersType[] = [
  { id: 1, image: "../azerconnect.png" },
  { id: 2, image: "../azerconnect.png" },
  { id: 3, image: "../bakcell.png" },
  { id: 4, image: "../bakcell.png" },
];
const OurPartners = () => {

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: window.innerWidth > 1168 ? 5 : 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 0,
    cssEase: "linear",
  };

  const { selectedLanguage } = useLang();
  const [partnerData, setPartnerData] = React.useState<PartnersType[]>([]);
  const { data: partnersDatas } = useQuery({
    queryKey: ["partnersDatas", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.our_partners, option(selectedLanguage));
      return response.data;
    },
    staleTime: 600000,
  });

  React.useEffect(() => {
    if (partnersDatas) {
      setPartnerData(partnersDatas);
    }
  }, [partnersDatas]);

  const { translatesWord } = useTranslateApi();

  return (
    <div className="our-partners">
      <img src="../ellipseforpartner.svg" alt="" className="partner-ellipse" />
      <div className="title-our-partners">
        <h1 style={{ textTransform: "uppercase" }}>{translatesWord["our_partners_title_homepage"]}</h1>
      </div>

      <Slider {...settings} className="slick-carousel">
        {partnerData.map((item: PartnersType, i: number) => (
          <div className="div-content" key={i}>
            <div
              className="image-content"
              style={{ width: window.innerWidth < 890 ? "90px" : "", height: window.innerWidth < 890 ? "40px" : "" }}>
              <img src={item.image} alt="" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OurPartners;

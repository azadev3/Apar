import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLang } from "../../../context/SelectedLanguage";
import axios from "axios";
import { api, option } from "../../../Api";
import { useTranslateApi } from "../../../context/GetTranslateContext";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
        <h6 style={{ textTransform: "uppercase" }}>{translatesWord["our_partners_title_homepage"]}</h6>
      </div>

      <div className="carousel-content">
        <Swiper
          loop={true}
          spaceBetween={16}
          modules={[Autoplay]}
          autoplay={{
            delay: 1000,
          }}
          mousewheel={true}
          speed={2200}
          breakpoints={{
            200: {
              slidesPerView: 1.2,
            },
            400: {
              slidesPerView: 1.5,
            },
            568: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper">
          {partnerData && partnerData?.length > 0 ? partnerData?.map((data: PartnersType) => (
            <SwiperSlide key={data?.id}>
              <img  src={data?.image || ""} alt={`${data?.id}-logo`} />
            </SwiperSlide>
          )) : ""}
    
        </Swiper>
      </div>
    </div>
  );
};

export default OurPartners;

import "../../../styles/responsive.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useTranslateApi } from "../../../context/GetTranslateContext";
import { WhyRideBoxType } from "./WhyRide";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api, option } from "../../../Api";
import { useLang } from "../../../context/SelectedLanguage";
import React from "react";

const WhyRideMobile = () => {

  const { translatesWord } = useTranslateApi();
  const { selectedLanguage } = useLang();

  const [whyridedata, setWhyridedata] = React.useState<WhyRideBoxType[]>([]);
  
  const { data: whyride } = useQuery({
    queryKey: ["whyride", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.why_ride, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (whyride) {
      setWhyridedata(whyride);
    }
  }, [whyride]);

  return (
    <div className="mobile-whyride" id="mobile_whyride">
     <h3 style={{lineHeight: '50px', fontSize: '46px'}}>{translatesWord['why_ride']}</h3>
      <Swiper pagination={true} 
      slidesPerView={1.3}
      autoplay = {{
        delay: 2000,
        pauseOnMouseEnter: false,
      }}
      modules={[Pagination, Autoplay]} className="mySwiper">
        {whyridedata && whyridedata?.length > 0 ? whyridedata?.map((item:WhyRideBoxType, i:number) => (
          <SwiperSlide key={i} className="swiper-item">
               <div className="image-wrapper">
                    <img src={item?.image} alt="" />
               </div>

               <div className="text-box">
                    <h4 className="text-box-h4">{item?.title}</h4>
                    <p className="text-box-p">{item?.text}</p>
               </div>
          </SwiperSlide>
        )) : ""}
      </Swiper>
    </div>
  );
};

export default WhyRideMobile;

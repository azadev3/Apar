import "../../../styles/responsive.scss";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { useTranslateApi } from "../../../context/GetTranslateContext";

type SwiperItemType = {
     id: number,
     title: string,
     description: string,
     image: string,
}

const SwiperItem: SwiperItemType[] = [
     {
       id: 1,
       title: "thinking eco system",
       image: "../bro.svg",
       description: "Dekans spepp potäbelt. Kyplass gugt inte refånde endocentrism, fan i hitressade.",
     },
     {
       id: 2,
       title: "fun with friends",
       image: "../original.svg",
       description: "Dekans spepp potäbelt. Kyplass gugt inte refånde endocentrism, fan i hitressade.",
     },
     {
       id: 3,
       title: "ride without congestion",
       image: "../withoutcongestionimg.png",
       description: "Dekans spepp potäbelt. Kyplass gugt inte refånde endocentrism, fan i hitressade.",
     },
     {
       id: 4,
       title: "easy parking",
       image: "../Group1211.svg",
       description: "Dekans spepp potäbelt. Kyplass gugt inte refånde endocentrism, fan i hitressade.",
     },
   ];
   


const WhyRideMobile = () => {

  const { translatesWord } = useTranslateApi();

  return (
    <div className="mobile-whyride" id="mobile_whyride">
     <h1 style={{lineHeight: '70px', fontSize: '54px'}}>{translatesWord['why_ride']}</h1>
      <Swiper pagination={true} 
      slidesPerView={1.3}
      // autoplay = {{
      //   delay: 2000,
      //   pauseOnMouseEnter: false,
      // }}
    
      modules={[Pagination, Autoplay]} className="mySwiper">
        {SwiperItem.map((item:SwiperItemType, i:number) => (
          <SwiperSlide key={i} className="swiper-item">
               <div className="image-wrapper">
                    <img src={item.image} alt="" />
               </div>

               <div className="text-box">
                    <h1 className="text-box-h1">{item.title}</h1>
                    <p className="text-box-p">{item.description}</p>
               </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WhyRideMobile;

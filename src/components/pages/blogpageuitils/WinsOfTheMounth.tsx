import React from "react";
import "../../../styles/pages/blogpage.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../../../context/SelectedLanguage";
import axios from "axios";
import { api, option } from "../../../Api";
import { useQuery } from "@tanstack/react-query";

type LatestNewsType = {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
};

const WinsOfTheMounth = () => {
  const navigate = useNavigate();

  const { selectedLanguage } = useLang();
  const [winsmounth, setWinsmounth] = React.useState<LatestNewsType[]>([]);
  
  const { data: winsofthemounthData } = useQuery({
    queryKey: ['winsofthemounthData', selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.wins_of_the_mounth, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if(winsofthemounthData){
      setWinsmounth(winsofthemounthData)
    }
  }, [winsofthemounthData])

  //if 768 small screens set new morebutton
  const [getMoreBtn, setMoreBtn] = React.useState<boolean>(false);

  React.useEffect(() => {
    const controlSize = () => {
      if (window.innerWidth <= 1100) {
        setMoreBtn(true);
      } else {
        setMoreBtn(false);
      }
    };

    controlSize();

    window.addEventListener("resize", controlSize);
    return () => {
      window.removeEventListener("resize", controlSize);
    };
  }, []);

  const getSingleLatestNewId = async (blogid: number) => {
    const response = await axios.get(`https://coming.166tech.az/api/winner_single/${blogid}`);
    try {
      if (response.data) {
        console.log(response.data, "salama");
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error, "erorr");
    }
  };


  return (
    <div className="wins-mounth-section">
      <div className="title-winsmounth">
        <h1>wins of the mounth</h1>
      </div>

      <div className="swiper-area">
        <Swiper
          pagination={{ clickable: true, type: "bullets" }}
          spaceBetween={16}
          breakpoints={{
            1200: {
              slidesPerView: 3,
            },
            800: {
              slidesPerView: 3,
            },
            200: {
              slidesPerView: 1.3,
            },
          }}
          navigation={true}
          modules={[Navigation, Pagination, Autoplay]}
          // autoplay={{
          //   delay: 2000,
          // }}
          className="mySwiper">
          {winsmounth.map((item: LatestNewsType, i: number) => (
            <SwiperSlide key={i} 
            onClick={() => {
              getSingleLatestNewId(item.id)
              navigate(`/winner_single/${i}`)
            }}
            >
              <div className="image-wrapper">
                <img src={item.image} alt="" 
                style={{filter: getMoreBtn ? 'grayscale(0)' : ''}}
                />
              </div>

              <div className="text">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
              <article>{item.created_at}</article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {getMoreBtn && (
        <div className="buttonb">
          <Link to="/blog" className="more-btn">
            More
            <img src="../moreicon.png" alt="" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default WinsOfTheMounth;

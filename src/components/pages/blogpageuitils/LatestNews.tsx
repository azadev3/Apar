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
import { useTranslateApi } from "../../../context/GetTranslateContext";
import { EnumLangType } from "../WhyRidePage";
import { paths } from "../../../App";

type LatestNewsType = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  image: string;
  slug: {
    az: string;
    en: string;
    ru: string
  }
};

const LatestNews = () => {

  const { translatesWord } = useTranslateApi();

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

  const { selectedLanguage } = useLang();
  const [latestData, setData] = React.useState<LatestNewsType[]>([]);

  const { data: latest_datas } = useQuery({
    queryKey: ["latest_datas", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.latest_news, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (latest_datas) {
      setData(latest_datas);
    }
  }, [latest_datas]);

  const navigate = useNavigate();

  // const getSingleLatestNewId = async (blogid: number) => {
  //   const response = await axios.get(`https://coming.166tech.az/api/news_single/${blogid}`);
  //   try {
  //     if (response.data) {
  //     } else {
  //       console.log(response.status);
  //     }
  //   } catch (error) {
  //     console.log(error, "erorr");
  //   }
  // };

  return (
    <div className="latest-news-section">
      <div className="title-latest-news">
        <h5>{translatesWord['latest_news_title']}</h5>
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
              slidesPerView: 2,
            },
            200: {
              slidesPerView: 1.3,
            },
          }}
          navigation={true}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{
            delay: 4000,
            pauseOnMouseEnter: false,
          }}
          className="mySwiper">
          {latestData.map((item: LatestNewsType, i: number) => (
            <SwiperSlide
              key={i}
              onClick={() => {
                // getSingleLatestNewId(item.id);
                navigate(`/${paths.news_single[selectedLanguage as keyof typeof paths.news_single]}/${selectedLanguage}/${item.slug[selectedLanguage as keyof typeof item.slug]}`);
              }}>
              <div className="image-wrapper">
                <img src={item.image} alt="" style={{ filter: getMoreBtn ? "grayscale(0)" : "" }} />
              </div>

              <div className="text">
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
              <article>{item.created_at}</article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {getMoreBtn && (
        <div className="buttonb">
          <Link to={paths.blog[selectedLanguage as EnumLangType]} className="more-btn">
            <span style={{ textTransform: 'capitalize' }}>{translatesWord['more_button']}</span>
            <img src="../moreicon.png" alt="" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default LatestNews;

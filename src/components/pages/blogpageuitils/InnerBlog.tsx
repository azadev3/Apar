import React from "react";
import "../../../styles/pages/blogpage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Images } from "../BlogPage";
import { IoEyeOutline } from "react-icons/io5";
import LatestNews from "./LatestNews";
import DownloadApp from "../../homepage/uitilshomepage/DownloadApp";
import { useLang } from "../../../context/SelectedLanguage";
import { api, option } from "../../../Api";
import axios from "axios";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import BlogCarousel from "../../BlogCarousel";
import Loader from "../../../Loader";

const InnerBlog = () => {
  const { lang, blogid } = useParams<{ lang: 'az' | 'en' | 'ru'; blogid: string }>();
  const { selectedLanguage } = useLang();
  const navigate = useNavigate();

  const { data: blogdatas_other, isLoading } = useQuery({
    queryKey: ["blogdatas_other", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.blog, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  const findedItem = blogdatas_other && blogdatas_other?.find(
    (item: { slug: { az: string; en: string; ru: string } }) =>
      item?.slug[lang as keyof typeof item.slug] === blogid
  );

  React.useEffect(() => {
    if (findedItem && lang !== selectedLanguage) {
      navigate(`/${selectedLanguage}/${findedItem?.slug[selectedLanguage as keyof typeof findedItem.slug]}`, { replace: true });
    }
  }, [selectedLanguage, lang, navigate, findedItem]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <React.Fragment>
      <div className="blog-inner-page-container">
        {findedItem?.images?.length !== 0 ? (
          <React.Fragment>
            <Swiper
              autoplay={{
                delay: 5000,
                pauseOnMouseEnter: false,
              }}
              loop={true}
              navigation={true}
              modules={[Navigation, Autoplay]}
              className="mySwiper">
              {findedItem?.images?.map((image: Images, i: number) => (
                <SwiperSlide key={i}>
                  <img src={image.image} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="text-bloginner-swipered">
              <h5>{findedItem?.title}</h5>
              <p>{findedItem?.description}</p>
              <div className="view-and-date">
                <span className="date">{findedItem?.created_at}</span>
                <span className="view-count">
                  <IoEyeOutline className="eye" />
                  {findedItem?.view}
                </span>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="top-content-inner-blog">
            <div className="topimg-wrapper">
              <img src={findedItem?.image} alt="" />
            </div>
            <div className="text-bloginner">
              <h5>{findedItem?.title}</h5>
              <p>{findedItem?.description}</p>
              <div className="view-and-date">
                <span className="date">{findedItem?.created_at}</span>
                <span className="view-count">
                  <IoEyeOutline className="eye" />
                  {findedItem?.view}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <BlogCarousel />
      <LatestNews />
      {/* <WinsOfTheMounth /> */}
      <DownloadApp />
    </React.Fragment>
  );
};

export default InnerBlog;

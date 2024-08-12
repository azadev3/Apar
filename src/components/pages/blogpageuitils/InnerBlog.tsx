import React from "react";
import "../../../styles/pages/blogpage.scss";
import { useParams } from "react-router-dom";
import { Boxtype, Images } from "../BlogPage";
import { IoEyeOutline } from "react-icons/io5";
import LatestNews from "./LatestNews";
import WinsOfTheMounth from "./WinsOfTheMounth";
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

const InnerBlog = () => {
  const { selectedLanguage } = useLang();
  const [blogs, setBlogs] = React.useState<Boxtype[]>([]);
  const { data: blogdatas_other } = useQuery({
    queryKey: ["blogdatas_other", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.blog, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (blogdatas_other) {
      setBlogs(blogdatas_other);
    }
  }, [blogdatas_other]);

  const { blogid } = useParams();
  if (blogid === undefined) {
    console.log("undefined blogid");
    return null;
  }

  const parseID = parseInt(blogid);

  if (isNaN(parseID)) {
    console.log("isnan parseid");
    return null;
  }

  const innerBlogItem: Boxtype | undefined = blogs.find((_, i: number) => i === parseID);

  return (
    <React.Fragment>
      <div className="blog-inner-page-container">
        {innerBlogItem?.images?.length !== 0 ? (
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
              {innerBlogItem?.images?.map((image: Images, i: number) => (
                <SwiperSlide key={i}>
                  <img src={image.image} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="text-bloginner-swipered">
              <h1>{innerBlogItem?.title}</h1>
              <p>{innerBlogItem?.description}</p>
              <div className="view-and-date">
                <span className="date">{innerBlogItem?.created_at}</span>
                <span className="view-count">
                  <IoEyeOutline className="eye" />
                  {innerBlogItem?.view}
                </span>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="top-content-inner-blog">
            <div className="topimg-wrapper">
              <img src={innerBlogItem?.image} alt="" />
            </div>
            <div className="text-bloginner">
              <h1>{innerBlogItem?.title}</h1>
              <p>{innerBlogItem?.description}</p>
              <div className="view-and-date">
                <span className="date">{innerBlogItem?.created_at}</span>
                <span className="view-count">
                  <IoEyeOutline className="eye" />
                  {innerBlogItem?.view}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <LatestNews />
      <WinsOfTheMounth />
      <DownloadApp />
    </React.Fragment>
  );
};

export default InnerBlog;

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
import { Navigation } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";

const WinsOfTheMounthInner = () => {
  const { selectedLanguage } = useLang();
  const [blogs, setBlogs] = React.useState<Boxtype[]>([]);

  const { data: winsDatas } = useQuery({
    queryKey: ["winsDatas", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.wins_of_the_mounth, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (winsDatas) {
      setBlogs(winsDatas);
    }
  }, [winsDatas]);

  const { wthmid } = useParams();
  if (wthmid === undefined) {
    console.log("undefined blogid");
    return null;
  }

  const parseID = parseInt(wthmid);

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
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
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

export default WinsOfTheMounthInner;

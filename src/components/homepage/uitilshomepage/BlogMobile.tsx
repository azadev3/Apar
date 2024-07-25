import "../../../styles/responsive.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import React from "react";
import { useLang } from "../../../context/SelectedLanguage";
import { api, option } from "../../../Api";
import axios from "axios";
import { BlogType } from "./Blog";
import { useQuery } from "@tanstack/react-query";

// type BlogType = {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   image: string;
// };

// const BlogItem: BlogType[] = [
//   {
//     id: 1,
//     title: "hero of the month",
//     description: "With Our Industry-Leading Net-Zero Target Validated Our Hard Work",
//     date: "17 January, 2024",
//     image: "../blogimage.png",
//   },
//   {
//     id: 2,
//     title: "hero of the month",
//     description: "With Our Industry-Leading Net-Zero Target Validated Our Hard Work",
//     date: "17 January, 2024",
//     image: "../blogimage.png",
//   },
//   {
//     id: 3,
//     title: "hero of the month",
//     description: "With Our Industry-Leading Net-Zero Target Validated Our Hard Work",
//     date: "17 January, 2024",
//     image: "../blogimage.png",
//   },
// ];

const BlogMobile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [controlSize, setControl] = React.useState<boolean>(false);
  React.useEffect(() => {
    const Controller = () => {
      if (window.innerWidth <= 968) {
        setControl(true);
      } else {
        setControl(false);
      }
    };

    Controller();

    window.addEventListener("resize", Controller);
    return () => {
      window.removeEventListener("resize", Controller);
    };
  }, []);

  const { selectedLanguage } = useLang();
  const [blogs, setBlogs] = React.useState<BlogType[]>([]);
  
  const { data: blogsDataMobile } = useQuery({ 
    queryKey: ['blogsDataMobile', selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.blog, option(selectedLanguage));
      return response.data;
    },
    staleTime: 550000,
  })

  React.useEffect(() => {
    if(blogsDataMobile) {
      setBlogs(blogsDataMobile);
    }
  }, [blogsDataMobile]);


  return (
    <div className="blog-mobile" style={{background: controlSize && location.pathname === '/' ? '#FAFAFA' : '', paddingTop: controlSize && location.pathname === '/'  ? '3rem' :'', paddingBottom: controlSize && location.pathname === '/' ? '3rem' : ''}}>
      <h1>blog</h1>

      <Swiper
        className="mySwiper"
        slidesPerView={1.2}
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: false
        }}
      >
        {blogs.map((item: BlogType, i: number) => (
          <SwiperSlide onClick={() => navigate(`/blog/${i}-${item.title}`)} key={i} className="blog-item">
            <div className="blog-container">
              <div className="image-wrapper">
                <img src={item.image} alt="" style={{ filter: controlSize ? "grayscale(0)" : "" }} />
              </div>

              <div className="bottom-content">
                <div className="titl">
                  <h1>{item.title}</h1>
                </div>
                <div className="paragraph">
                  <p>{item.description}</p>
                </div>
                <div className="date">
                  <span>{item.created_at}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="more-btn">
        <Link to="/blog" className="more">
          More
          <img src="../bbb.svg" alt="more-arrow-icon" />
        </Link>
      </div>
    </div>
  );
};

export default BlogMobile;

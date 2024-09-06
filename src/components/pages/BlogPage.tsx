import React from "react";
import "../../styles/pages/blogpage.scss";
import { IoEyeOutline } from "react-icons/io5";
import LatestNews from "./blogpageuitils/LatestNews";
import Howtorideflag from "./whyridepageuitils/Howtorideflag";
import HowToRide from "../homepage/uitilshomepage/HowToRide";
import DownloadApp from "../homepage/uitilshomepage/DownloadApp";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import { useLang } from "../../context/SelectedLanguage";
import { api, option } from "../../Api";
import { useTranslateApi } from "../../context/GetTranslateContext";
import { useQuery } from "@tanstack/react-query";
import BlogCarousel from "../BlogCarousel";

export type Images = {
  id: number;
  image: string;
};

export type Boxtype = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  image: string;
  view: number;
  order: number;
  images?: Images[];
};

export type SidebarType = {
  id: number;
  title?: string;
  box: Boxtype[];
};

const BlogPage = () => {
  const navigate = useNavigate();

  const { selectedLanguage } = useLang();
  const [blogs, setBlogs] = React.useState<Boxtype[]>([]);

  const { data: blogsDatass } = useQuery({
    queryKey: ["blogsDatass", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.blog, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    setBlogs(blogsDatass);
  }, [blogsDatass]);

  //if 768 small screens set new BlogPage section
  const [changeBlogpage, setChangeBlogPage] = React.useState<boolean>(false);
  const { translatesWord } = useTranslateApi();

  React.useEffect(() => {
    const controlSize = () => {
      if (window.innerWidth <= 1290) {
        setChangeBlogPage(true);
      } else {
        setChangeBlogPage(false);
      }
    };

    controlSize();

    window.addEventListener("resize", controlSize);
    return () => {
      window.removeEventListener("resize", controlSize);
    };
  }, []);

  const getSingleBlogId = async (blogid: number) => {
    const response = await axios.get(`https://coming.166tech.az/api/blog_single/${blogid}`);
    try {
      if (response.data) {
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error, "erorr");
    }
  };


  return (
    <div className="blog-page">
      <div className="blog-page-wrapper">
        <React.Fragment>
          {changeBlogpage ? (
            <div className="top-content-blog-page-mobile">
              <div className="titleblog">
                <h1>{translatesWord['blog']}</h1>
              </div>
              <div className="content">
                <div className="left-in-content">
                  {blogs?.map((box: Boxtype, i: number) => (
                    <React.Fragment key={i}>
                      {i === 0 && (
                        <React.Fragment key={i}>
                          <div className="image-wrapper">
                            <img
                              src={box.image}
                              alt=""
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                getSingleBlogId(box.id);
                                navigate(`/blog_single/${i}`);
                              }}
                            />
                          </div>
                          <div className="title-news">
                            <h1>{box.title}</h1>
                          </div>
                          <div className="description">
                            <p>{box.description}</p>
                          </div>
                          <div className="date-and-views">
                            <span className="date">{box.created_at}</span>
                            <span className="view-count">
                              <IoEyeOutline className="eye" />
                              {box.view}
                            </span>
                          </div>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <h1 className="swiper-blog-title-main">{translatesWord['top_blogs_title']}</h1>
                <Swiper 
                className="mySwiper-blogpage" slidesPerView={1.5} spaceBetween={15}>
                  {blogs?.map((box: Boxtype, j: number) => (
                    <div key={j} className="sidebar-item">
                      <div className="item-box">
                        <SwiperSlide
                          onClick={() => {
                            getSingleBlogId(box.id);
                            navigate(`/blog_single/${j}`);
                          }}
                          className="item"
                          key={j}>
                          <div className="right">
                            <div className="img-wrap">
                              <img src={box.image} alt="" />
                            </div>
                          </div>
                          <div className="left" style={{marginTop:'15px', height: "145px"}}>
                            <h1 style={{fontSize: "14px", lineClamp: '2', WebkitLineClamp: "2", lineHeight: "normal"}}>{box.title}</h1>
                            <p style={{ fontSize: "14px", lineHeight: "normal" }}>{box.description}</p>
                            <article>{box.created_at}</article>
                          </div>
                        </SwiperSlide>
                      </div>
                    </div>
                  ))}
                </Swiper>
              </div>
            </div>
          ) : (
            <div className="top-content-blog-page">
              <div className="titleblog">
                <h1>{translatesWord["blog"]}</h1>
              </div>
              <div className="content">
                <div className="left-in-content">
                  {blogs?.map((box: Boxtype, i: number) => (
                    <React.Fragment key={i}>
                      {i === 0 && (
                        <React.Fragment key={i}>
                          <div className="image-wrapper">
                            <img
                              src={box.image}
                              alt=""
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                getSingleBlogId(box.id);
                                navigate(`/blog_single/${i}`);
                              }}
                            />
                          </div>
                          <div className="title-news">
                            <h1>{box.title}</h1>
                          </div>
                          <div className="description">
                            <p>{box.description}</p>
                          </div>
                          <div className="date-and-views">
                            <span className="date">{box.created_at}</span>
                            <span className="view-count">
                              <IoEyeOutline className="eye" />
                              {box.view}
                            </span>
                          </div>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <aside className="sidebar">
                  <h1>{translatesWord['top_blogs_title']}</h1>
                  {blogs?.map((box: Boxtype, i: number) => (
                    <div key={i} className="sidebar-item">
                      <div 
                      onClick={() => {
                        getSingleBlogId(box.id);
                        navigate(`/blog_single/${i}`);
                      }}
                      className="item" key={i}>
                        <div className="left">
                          <span>{box.title}</span>
                          <p>{box.description}</p>
                          <article>{box.created_at}</article>
                        </div>

                        <div className="right">
                          <div className="img-wrap">
                            <img src={box.image} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </aside>
              </div>
            </div>
          )}
        </React.Fragment>

        <BlogCarousel />
        <LatestNews />
        {/* <WinsOfTheMounth /> */}
        {!changeBlogpage && <Howtorideflag />}
        {!changeBlogpage && <HowToRide />}
        <DownloadApp />
      </div>
    </div>
  );
};

export default BlogPage;

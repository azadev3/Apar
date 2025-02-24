import React from "react";
import "../../styles/pages/blogpage.scss";
import { IoEyeOutline } from "react-icons/io5";
import LatestNews from "./blogpageuitils/LatestNews";
import Howtorideflag from "./whyridepageuitils/Howtorideflag";
import HowToRide from "../homepage/uitilshomepage/HowToRide";
import DownloadApp from "../homepage/uitilshomepage/DownloadApp";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import { useLang } from "../../context/SelectedLanguage";
import { api, option } from "../../Api";
import { useTranslateApi } from "../../context/GetTranslateContext";
import { useQuery } from "@tanstack/react-query";
import BlogCarousel from "../BlogCarousel";
import Loader from "../../Loader";
import { paths } from "../../App";

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
  slug: {
    az: string;
    en: string;
    ru: string;
  }
};

export type SidebarType = {
  id: number;
  title?: string;
  box: Boxtype[];
};

type TopBlogsType = {
  id: number;
  title: string;
  description: string;
  view: number,
  order: number,
  image: string;
  created_at: string;
  images: Images[];
  slug: {
    az: string;
    en: string;
    ru: string;
  }
}

export const routeBlogTitle = {
  az: 'bloq',
  en: 'blog',
  ru: 'blogrus'
}


const BlogPage = () => {
  const { lang } = useParams<{ lang: 'az' | 'en' | 'ru'; }>();
  const { translatesWord } = useTranslateApi();
  const navigate = useNavigate();
  const { selectedLanguage } = useLang();

  React.useEffect(() => {
    if (selectedLanguage && selectedLanguage !== lang) {
      const newPath = paths.blog[selectedLanguage as keyof typeof paths.blog];
      if (newPath) {
        navigate(newPath, { replace: true });
      }
    }
  }, [selectedLanguage, navigate, lang]);

  const [blogs, setBlogs] = React.useState<Boxtype[]>([]);
  const { data: blogsDatass, isLoading } = useQuery({
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

  const [topBlogs, setTopBlogs] = React.useState<TopBlogsType[]>([]);

  const getTopBlogs = async () => {
    try {
      const res = await axios.get("https://coming.166tech.az/api/best_blogs", {
        headers: {
          "Accept-Language": selectedLanguage,
        },
      });

      if (res.data) {
        setTopBlogs(res.data);
        console.log(res.data);
      } else {
        console.log(res.status)
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTopBlogs();
  }, [selectedLanguage]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="blog-page">
      <div className="blog-page-wrapper">
        <React.Fragment>
          {changeBlogpage ? (
            <div className="top-content-blog-page-mobile">
              <div className="titleblog">
                <h4>{translatesWord["blog"]}</h4>
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
                                // getSingleBlogId(box.id);
                                navigate(`/${selectedLanguage}/${box?.slug[selectedLanguage as keyof typeof box.slug]}`);
                              }}
                            />
                          </div>
                          <div className="title-news">
                            <h4>{box.title}</h4>
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

                <h6 className="swiper-blog-title-main">{translatesWord["top_blogs_title"]}</h6>
                <Swiper className="mySwiper-blogpage" slidesPerView={1.5} spaceBetween={15}>
                  {blogs?.map((box: Boxtype, j: number) => (
                    <div key={j} className="sidebar-item">
                      <div className="item-box">
                        <SwiperSlide
                          onClick={() => {
                            navigate(`/${selectedLanguage}/${box?.slug[selectedLanguage as keyof typeof box.slug]}`);
                          }}
                          className="item"
                          key={j}>
                          <div className="right">
                            <div className="img-wrap">
                              <img src={box.image} alt="" />
                            </div>
                          </div>
                          <div className="left" style={{ marginTop: "15px", height: "145px" }}>
                            <h1
                              style={{ fontSize: "14px", lineClamp: "2", WebkitLineClamp: "2", lineHeight: "normal" }}>
                              {box.title}
                            </h1>
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
                <h4>{translatesWord["blog"]}</h4>
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
                                // getSingleBlogId(box.id);
                                navigate(`/${selectedLanguage}/${box?.slug[selectedLanguage as keyof typeof box.slug]}`);
                              }}
                            />
                          </div>
                          <div className="title-news">
                            <h4>{box.title}</h4>
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
                  <h4>{translatesWord["top_blogs_title"]}</h4>
                  {topBlogs && topBlogs?.length > 0 ? topBlogs?.map((box: TopBlogsType, i: number) => (
                    <Link
                    style={{ textDecoration: 'none' }}
                    to={`/${selectedLanguage}/${box?.slug[selectedLanguage as keyof typeof box.slug]}`}
                    key={i} className="sidebar-item">
                      <div
                        className="item"
                        key={i}>
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
                    </Link>
                  )) : ""}
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

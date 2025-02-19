import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useLang } from "../context/SelectedLanguage";
import { api, option } from "../Api";
import { useTranslateApi } from "../context/GetTranslateContext";
import { BlogType } from "./homepage/uitilshomepage/Blog";
import { paths } from "../App";
import { EnumLangType } from "./pages/WhyRidePage";

const BlogCarousel = () => {
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

  const [blogs, setBlogs] = React.useState<BlogType[]>([]);

  const { data: blogsData } = useQuery({
    queryKey: ["blogsData", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.blog, option(selectedLanguage));
      return response.data;
    },
    staleTime: 550000,
  });

  React.useEffect(() => {
    if (blogsData) {
      setBlogs(blogsData);
    }
  }, [blogsData]);

  // const getSingleBlogId = async (blogid: number) => {
  //   const response = await axios.get(`https://coming.166tech.az/api/blog_single/${blogid}`);
  //   try {
  //     if (response.data) {
  //     } else {
  //       console.log(response.status);
  //     }
  //   } catch (error) {
  //     console.log(error, "erorr");
  //   }
  // };

  const navigate = useNavigate();

  return (
    <div className="blog-carousel-section">
      <div className="title-blog-carousel">
        <h3 className="blog-carousel-title">{translatesWord["blog"]}</h3>
      </div>

      <div className="swiper-area-blog-carousel">
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
          {blogs &&
            blogs?.length > 0 &&
            blogs?.map((item: BlogType, i: number) => (
              <SwiperSlide
                key={i}
                onClick={() => {
                  navigate(`/${selectedLanguage}/${item?.slug[selectedLanguage as keyof typeof item.slug]}`);
                }}>
                <div className="image-wrapper">
                  <img src={item.image} alt="" style={{ filter: getMoreBtn ? "grayscale(0)" : "" }} />
                </div>

                <div className="text">
                  <h3 className="text-title">{item.title}</h3>
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

export default BlogCarousel;

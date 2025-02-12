import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogMobile from "./BlogMobile";
import { useTranslateApi } from "../../../context/GetTranslateContext";
import { useLang } from "../../../context/SelectedLanguage";
import { api, option } from "../../../Api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export type BlogType = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  image: string;
};

const Blog = () => {
  //if 768 small screens set new WhyRide section
  const [changeBlog, setChangeBlog] = React.useState<boolean>(false);
  const { translatesWord } = useTranslateApi();

  React.useEffect(() => {
    const controlSize = () => {
      if (window.innerWidth <= 968) {
        setChangeBlog(true);
      } else {
        setChangeBlog(false);
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
    queryKey: ['blogsData', selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.blog, option(selectedLanguage));
      return response.data;
    },
    staleTime: 550000,
  })

  React.useEffect(() => {
    if(blogsData) {
      setBlogs(blogsData);
    }
  }, [blogsData]);



  const navigate = useNavigate();

  return (
    <React.Fragment>
      {changeBlog ? (
        <BlogMobile />
      ) : (
        <div className="blog" style={{backgroundColor: window.location.pathname === '/e-bcycle' || window.location.pathname === '/bcycle' ? 'transparent' :''}}>
          <div className="title">
            <h5>{translatesWord['blog']}</h5>
          </div>

          <div className="blog-container">
            {blogs?.slice(0, 3)?.map((item: BlogType, i: number) => (
              <div onClick={() => navigate('/blog')} className="blog-item" key={i}>
                <div className="image-wrapper">
                  <img src={item.image} alt="" />
                </div>
                <div className="descriptions">
                <div className="titl" title={item?.title}>
                  <h2>{item.title}</h2>
                </div>
                <div className="paragraph">
                  <p>{item.description}</p>
                </div>
                <div className="date">
                  <span>{item.created_at}</span>
                </div>
                </div>
              </div>
            ))}
          </div>

          <div className="button">
            <Link to="/blog" className={`more-btn ${selectedLanguage === 'az' ? 'more-btn-az' : ''}`}>
              <span style={{textTransform: 'capitalize'}}>{translatesWord['more_button']}</span>
              <img src="../rrr.svg" alt="" />
            </Link>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Blog;

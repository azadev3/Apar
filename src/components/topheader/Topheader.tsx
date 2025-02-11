import Slider from "react-slick";
import "../../styles/topheader/topheader.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslateApi } from "../../context/GetTranslateContext";

export default function SimpleSlider() {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 30000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  type TopheaderItemType = {
    id: number;
    title: string;
  };

  const { translatesWord } = useTranslateApi();

  const TopHeaderItem: TopheaderItemType[] = [
    { id: 1, title: `${translatesWord["discoun_line"]}` },
    { id: 2, title: `${translatesWord["discoun_line"]}` },
    { id: 3, title: `${translatesWord["discoun_line"]}` },
  ];

  if (!translatesWord || !translatesWord["discoun_line"]) {
    return <div className="topheader">
      <Slider {...settings} className="slick-carousel">
        {TopHeaderItem.map((_: TopheaderItemType, i: number) => (
          <div className="div-content" key={i}>
            ...
          </div>
        ))}
      </Slider>
    </div>;
  }

  return (
    <div className="topheader">
      <Slider {...settings} className="slick-carousel">
        {TopHeaderItem.map((item: TopheaderItemType, i: number) => (
          <div className="div-content" key={i}>
            {item?.title === undefined ? '...' : item?.title}
          </div>
        ))}
      </Slider>
    </div>
  );
}

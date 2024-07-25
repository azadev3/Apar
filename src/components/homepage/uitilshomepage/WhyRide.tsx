import React from "react";
import WhyRideMobile from "./WhyRideMobile";
import { useLang } from "../../../context/SelectedLanguage";
import { api, option } from "../../../Api";
import axios from "axios";
import { useTranslateApi } from "../../../context/GetTranslateContext";
import { useQuery } from "@tanstack/react-query";

export type WhyRideBoxType = {
  id: number;
  title: string;
  text: string;
  image: string;
};

const WhyRide = () => {

  const { translatesWord } = useTranslateApi();
  const { selectedLanguage } = useLang();
  const [whyridedata, setWhyridedata] = React.useState<WhyRideBoxType[]>([]);
  
  const { data: whyride } = useQuery({
    queryKey: ["whyride", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(api.why_ride, option(selectedLanguage));
      return response.data;
    },
    staleTime: 500000,
  });

  React.useEffect(() => {
    if (whyride) {
      setWhyridedata(whyride);
    }
  }, [whyride]);


  //if 768 small screens set new WhyRide section
  const [changeWhyRide, setChangeWhyRide] = React.useState<boolean>(false);

  React.useEffect(() => {
    const controlSize = () => {
      if (window.innerWidth <= 768) {
        setChangeWhyRide(true);
      } else {
        setChangeWhyRide(false);
      }
    };

    controlSize();

    window.addEventListener("resize", controlSize);
    return () => {
      window.removeEventListener("resize", controlSize);
    };
  }, []);

  return (
    <React.Fragment>
      {changeWhyRide ? (
        <WhyRideMobile />
      ) : (
        <div className="why-ride-section" id="whyride">
          <div className="title">
            <h1 style={{textTransform: 'uppercase'}}>{translatesWord['why_ride']}</h1>
          </div>

          <div className="why-ride-box">
            {whyridedata.map((box: WhyRideBoxType, i: number) => (
              <div className="box-item" key={i}>
                <h1 style={{wordSpacing: i === 3 ? '50px' : ''}}>{box.title}</h1>
                <div className="image-wrapper">
                  <img src={box.image} alt={`${box.id}`} title={box?.title} />
                </div>
                <p>{box.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default WhyRide;

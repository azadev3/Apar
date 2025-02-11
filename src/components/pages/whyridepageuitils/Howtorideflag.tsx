import React from "react";
import { useTranslateApi } from "../../../context/GetTranslateContext";

const Howtorideflag = () => {
  const { translatesWord } = useTranslateApi();

  const howToRideData = [
    { id: 1, text: `${translatesWord["howtoride_carousel_custom_text"]}` },
    { id: 2, text: `${translatesWord["howtoride_carousel_custom_text"]}` },
    { id: 3, text: `${translatesWord["howtoride_carousel_custom_text"]}` },
    { id: 4, text: `${translatesWord["howtoride_carousel_custom_text"]}` },
    { id: 5, text: `${translatesWord["howtoride_carousel_custom_text"]}` },
    { id: 6, text: `${translatesWord["howtoride_carousel_custom_text"]}` },
    { id: 7, text: `${translatesWord["howtoride_carousel_custom_text"]}` },
    { id: 8, text: `${translatesWord["howtoride_carousel_custom_text"]}` },
    { id: 9, text: `${translatesWord["howtoride_carousel_custom_text"]}` },
    { id: 10, text: `${translatesWord["howtoride_carousel_custom_text"]}` },
    { id: 11, text: `${translatesWord["howtoride_carousel_custom_text"]}` },
    { id: 12, text: `${translatesWord["howtoride_carousel_custom_text"]}` },
  ];

  const [innering, setInnering] = React.useState<boolean>(false);
  React.useEffect(() => {
    const Controlling = () => {
      if (window.innerWidth > 500) {
        setInnering(true);
      } else {
        setInnering(false);
      }
    };

    Controlling();

    window.addEventListener("resize", Controlling);
    return () => {
      window.removeEventListener("resize", Controlling);
    };
  }, []);

  return (
    <div className="how-to-ride-flag-mobile">
      <div className="partners" style={{ gap: innering ? "30px" : "" }}>
        {howToRideData.map((item) => (
          <React.Fragment key={item.id}>
            <img src="../starmob.svg" alt="star" />
            <h4>{item.text}</h4>
          </React.Fragment>
        ))}
        {innering && (
          <>
            {howToRideData.map((item) => (
              <React.Fragment key={item.id}>
                <img src="../starmob.svg" alt="star" />
                <h4>{item.text}</h4>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Howtorideflag;

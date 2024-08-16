import { useTranslateApi } from "../../../context/GetTranslateContext";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api } from "../../../Api";

type MapType = {
  id: number;
  map: string;
};

const Map = () => {
  const { translatesWord } = useTranslateApi();

  const [map, setMap] = React.useState<MapType[]>([]);

  const { data: mapData } = useQuery({
    queryKey: ["mapData"],
    queryFn: async () => {
      const response = await axios.get(api.Map);
      return response.data;
    },
    staleTime: 600000,
  });

  React.useEffect(() => {
    if (mapData) {
      setMap(mapData);
    }
  }, [mapData]);

  return (
    <div className="map-container">
      <div className="title">
        <h1 className="wherefindustitle" style={{ textTransform: "uppercase" }}>
          {translatesWord["where_you_find_us"]}
        </h1>
      </div>

      <div className="description">
        <p>{translatesWord["our_partners_paragraph"]}</p>
      </div>

      <div className="map-container-wrappered">
        <div className="map-wrapper" style={{ borderRadius: "16px" }}>
            <img className="locone" src="/loc.svg" alt="location-icon" title="Location" />
            <img className="loctwo" src="/loc.svg" alt="location-icon" title="Location" />
            <img className="locthree" src="/loc.svg" alt="location-icon" title="Location" />
            <img className="locfour" src="/loc.svg" alt="location-icon" title="Location" />
            <img className="locfive" src="/loc.svg" alt="location-icon" title="Location" />
            <img className="locsix" src="/loc.svg" alt="location-icon" title="Location" />
            <img className="locseven" src="/loc.svg" alt="location-icon" title="Location" />
            <img className="loceight" src="/loc.svg" alt="location-icon" title="Location" />
            <img className="locnine" src="/loc.svg" alt="location-icon" title="Location" />
            <img className="locten" src="/loc.svg" alt="location-icon" title="Location" />
            <img className="loceleven" src="/loc.svg" alt="location-icon" title="Location" />
          <video src="/mapvideo.mp4" title="Map" muted={true} autoPlay={true} loop={true} controls={false} />
        </div>
      </div>
    </div>
  );
};

export default Map;

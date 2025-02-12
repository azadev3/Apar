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

  const [_, setMap] = React.useState<MapType[]>([]);

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
        <h4 className="wherefindustitle" style={{ textTransform: "uppercase" }}>
          {translatesWord["where_you_find_us"]}
        </h4>
      </div>

      <div className="description">
        <p>{translatesWord["our_partners_paragraph"]}</p>
      </div>

      <div className="map-container-wrappered">
        <div className="map-wrapper" style={{ borderRadius: "16px" }}>
          <img src="../map.gif" alt="mapgif" />
        </div>
      </div>
    </div>
  );
};

export default Map;

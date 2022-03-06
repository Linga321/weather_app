import React, { useEffect, useState } from "react";
import { API_URL_LOCATION, API_URL_KEY } from "../utils/api";
import { API_KEY } from "../utils/info";

const useAction = () => {
  const [location, setLocation] = useState(null); // send location data from HomeView
  const [locationKey, setLocationKey] = useState(null); // get locationkey from reqDataByCityName
  const [reqDataByCityName, setReqDataByCityName] = useState([]); // get reqDataByCityName using fetch by city name
  const [reqDataByKey, setReqDataByKey] = useState([]); // get reqDataByKey using fetch by city key
  const [state, setState] = useState(null); // send location data from HomeView

  useEffect(() => {
    if (location != null) {
      fetchDataByLocation();
      setLocation(null);
    }
  }, [location]);

  useEffect(() => {
    if (locationKey != null) {
      fetchDataByLocationKey();
      setLocationKey(null);
    }
  }, [locationKey]);

  const fetchDataByLocation = async () => {
    try {
      const URL = API_URL_KEY + "apikey=" + API_KEY + "&q=" + location;
      const res = await fetch(URL);
      if (res.status === 200) {
        const data = await res.json();
        if (data[0] != null) {
          console.log("name");
          setReqDataByCityName(data[0]);
          setLocationKey(data[0].Key);
          console.log(reqDataByCityName.LocalizedName);
        } else {
          setState(false);
        }
      }
      console.log(URL);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDataByLocationKey = async () => {
    try {
      const URL = API_URL_LOCATION + locationKey + "?apikey=" + API_KEY;
      const res = await fetch(URL);
      if (res.status === 200) {
        const data = await res.json();
        if (data != null) {
          setReqDataByKey(data);
          console.log(data.Headline.Text);
          setState(true);
        } else {
          setState(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return [setLocation, reqDataByCityName, reqDataByKey, state];
};

export default useAction;

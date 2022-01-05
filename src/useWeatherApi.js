import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// 取得即時天氣資料
const fetchCurrentWeather = (locationName) => {
  // 加上 return 直接把回傳的 Promise 回傳出去
  return axios
    .get(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-84E1F610-48DF-4A4D-9279-B210B3B5D78E&locationName=${locationName}`
    )
    .then((response) => {
      // 將要用到的資料取出來
      console.log("===風速（WDSD）、氣溫（TEMP）和濕度（HUMD）===");
      console.log(response);
      const locationData = response.data.records.location[0];
      console.log(locationData);

      // 將風速（WDSD）、氣溫（TEMP）和濕度（HUMD）的資料取出
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (["WDSD", "TEMP", "HUMD"].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue;
          }
          return neededElements;
        },
        {}
      );
      console.log(weatherElements);

      // 把取得的資料內容回傳出去，而不是在這裡 setWeatherElement
      return {
        observationTime: locationData.time.obsTime,
        locationName: locationData.locationName,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
        humid: weatherElements.HUMD,
      };
    });
};

// 取得天氣預報資料
const fetchWeatherForecast = (cityName) => {
  return axios
    .get(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-84E1F610-48DF-4A4D-9279-B210B3B5D78E&locationName=${cityName}`
    )
    .then((response) => {
      console.log("===天氣現象（Wx）、降雨機率（PoP）和舒適度（CI）===");
      console.log(response);
      const locationData = response.data.records.location[0];
      // 將天氣現象（Wx）、降雨機率（PoP）和舒適度（CI）的資料取出
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (["Wx", "PoP", "CI"].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        },
        {}
      );
      return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName,
      };
    });
};

// 取得日出日落時間資料,並獲得當前為白天/晚上
const fetchSunriseAndSunsetData = (sunriseCityName) => {
  return axios
    .get(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=CWB-84E1F610-48DF-4A4D-9279-B210B3B5D78E&locationName=${sunriseCityName}&timeFrom=2022-01-01&timeTo=2022-02-28
`
    )
    .then((response) => {
      console.log(sunriseCityName);
      console.log("===日出日落時間===");
      console.log(response);
      const locationData = response.data.records.locations.location[0].time;

      // 取得白天 / 晚上;
      const getMoment = () => {
        const now = new Date();
        // 將當前時間以 "2021-11-01" 的時間格式呈現
        const nowDate = Intl.DateTimeFormat("zh-TW", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
          .format(now)
          .replace(/\//g, "-");

        // 從該地區中找到對應的日期
        const currentData =
          locationData &&
          locationData.find((time) => time.dataTime === nowDate);

        // 將日出日落以及當前時間轉成時間戳記（TimeStamp）
        const sunriseTimestamp = new Date(
          `${currentData.dataTime} ${currentData.parameter[1].parameterValue}`
        ).getTime();
        const sunsetTimestamp = new Date(
          `${currentData.dataTime} ${currentData.parameter[5].parameterValue}`
        ).getTime();
        const nowTimeStamp = now.getTime();

        // 當前時間介於日出和日落中間，則表示為白天，否則為晚上
        return sunriseTimestamp <= nowTimeStamp &&
          nowTimeStamp <= sunsetTimestamp
          ? "day"
          : "night";
      };
      return { moment: getMoment() };
    });
};

const useWeatherApi = (currentLocationInfo) => {
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: "",
    temperature: 0,
    windSpeed: 0,
    description: "",
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: "",
    moment: "",
    isLoading: true,
  });
  const { cityName, locationName, sunriseCityName } = currentLocationInfo;

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast, sunriseAndSunsetData] =
        // 使用 Promise.all 搭配 await 等待所有 API 都取得回應後才繼續
        await Promise.all([
          fetchCurrentWeather(locationName),
          fetchWeatherForecast(cityName),
          fetchSunriseAndSunsetData(sunriseCityName),
        ]);

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        ...sunriseAndSunsetData,
        isLoading: false,
      });
    };

    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    fetchingData();
  }, [locationName, cityName, sunriseCityName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [weatherElement, fetchData];
};

export default useWeatherApi;

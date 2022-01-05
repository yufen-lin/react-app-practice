import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import WeatherCard from "./WeatherCard";
import useWeatherApi from "./useWeatherApi";
import { findLocation } from "./utils";

// 定義主題樣式
const theme = {
  light: {
    foregroundColor: "#fff",
    titleColor: "#2B2B2B",
    temperatureColor: "#2B2B2B",
    textColor: "#2B2B2B",
  },
  dark: {
    foregroundColor: "#2B2B2B",
    titleColor: "#fff",
    temperatureColor: "#fff",
    textColor: "#AAAAAA",
  },
};

const Weather = () => {
  // 定義當前要拉取天氣資訊的地區
  const [currentCity, setCurrentCity] = useState("高雄市");
  // 根據 currentCity 來找出對應到不同 API 時顯示的地區名稱
  const currentLocationInfo = findLocation(currentCity) || {};

  const [weatherElement, fetchData] = useWeatherApi(currentLocationInfo);
  const [currentTheme, setCurrentTheme] = useState("light");

  // 根據 moment 決定要使用亮色或暗色主題
  useEffect(() => {
    setCurrentTheme(weatherElement.moment === "day" ? "light" : "dark");
  }, [weatherElement.moment]);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <WeatherCard
        weatherElement={weatherElement}
        fetchData={fetchData}
        cityName={currentLocationInfo.cityName}
        setCurrentCity={setCurrentCity}
      />
    </ThemeProvider>
  );
};

export default Weather;

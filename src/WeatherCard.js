import React from "react";
import { Select } from "antd";
import {
  WeatherCardWrapper,
  Wrapper,
  Description,
  CurrentWeather,
  Temperature,
  Celsius,
  AirFlow,
  Rain,
  Refresh,
} from "./styledComponent";
import WeatherIcon from "./WeatherIcon";
import { availableLocations } from "./utils";
import "antd/dist/antd.css";

import { ReactComponent as WindIcon } from "./images/icon_wind.svg";
import { ReactComponent as RainIcon } from "./images/icon_rain.svg";
import { ReactComponent as RefreshIcon } from "./images/icon_refresh.svg";
import { ReactComponent as LoadingIcon } from "./images/loading.svg";

// 讓使用者選擇的地區清單
const locations = availableLocations.map((location) => location.cityName);

const WeatherCard = ({
  weatherElement,
  fetchData,
  // cityName,
  setCurrentCity,
}) => {
  const {
    observationTime,
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    moment,
    isLoading,
  } = weatherElement;

  const handleChange = (value) => {
    // 把使用者選到的地點更新到 React 內的資料狀態
    setCurrentCity(value);
  };

  return (
    <WeatherCardWrapper>
      {/* <WeatherCardWrapper cityName={currentLocation.cityName}> */}
      {/* <StyledInputList list="location-list" id="location" name="location" /> */}
      {/* <StyledSelect name="location" onChange={handleChange}>
        {locations.map((location) => (
          <option value={location}>{location}</option>
        ))}
      </StyledSelect> */}
      <Select
        name="location"
        onChange={handleChange}
        defaultValue="高雄市"
        bordered={false}
      >
        {locations.map((location) => (
          <option value={location}>{location}</option>
        ))}
      </Select>
      <Wrapper>
        <CurrentWeather>
          <Description>
            {description} {comfortability}
          </Description>
          <Temperature>
            {Math.round(temperature)} <Celsius>°C</Celsius>
          </Temperature>
          <AirFlow>
            <WindIcon />
            {windSpeed} m/h
          </AirFlow>
          <Rain>
            <RainIcon />
            {Math.round(rainPossibility)} %
          </Rain>
        </CurrentWeather>
        <WeatherIcon
          currentWeatherCode={weatherCode}
          moment={moment || "day"}
        />
      </Wrapper>
      <Refresh isLoading={isLoading}>
        最後觀測時間：
        {new Intl.DateTimeFormat("zh-TW", {
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(observationTime))}{" "}
        {isLoading ? <LoadingIcon /> : <RefreshIcon onClick={fetchData} />}
      </Refresh>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;

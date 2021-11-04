import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import WeatherIcon from "./WeatherIcon.js";
import { ThemeProvider } from "styled-components";

import { availableLocations } from "./utils";
import { findLocation } from "./utils";

import { ReactComponent as RainIcon } from "./images/icon_rain.svg";
import { ReactComponent as WindIcon } from "./images/icon_wind.svg";
import { ReactComponent as RefreshIcon } from "./images/icon_refresh.svg";
import { ReactComponent as LoadingIcon } from "./images/loading.svg";

// const locations = [
//   "嘉義縣",
//   "新北市",
//   "嘉義市",
//   "新竹縣",
//   "新竹市",
//   "臺北市",
//   "臺南市",
//   "宜蘭縣",
//   "苗栗縣",
//   "雲林縣",
//   "花蓮縣",
//   "臺中市",
//   "臺東縣",
//   "桃園市",
//   "南投縣",
//   "高雄市",
//   "金門縣",
//   "屏東縣",
//   "基隆市",
//   "澎湖縣",
//   "彰化縣",
//   "連江縣"
// ];

const locations = availableLocations.map((location) => location.cityName);

const theme = {
  light: {
    foregroundColor: "#fff",
    titleColor: "#2B2B2B",
    temperatureColor: "#2B2B2B",
    textColor: "#828282",
  },
  dark: {
    foregroundColor: "#2B2B2B",
    titleColor: "#fff",
    temperatureColor: "#fff",
    textColor: "#AAAAAA",
  },
};

const WeatherCard = styled.div`
  margin-bottom: 0.5rem;
  max-width: 100%;
  padding: 2rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.foregroundColor};
  box-shadow: 0 3px 6px #00000029;
  display: flex;
  flex-direction: column;

  @media (min-width: 1200px) {
    padding: 3.75rem;
  }
`;

const StyledSelect = styled.select`
  display: block;
  box-sizing: border-box;
  background: transparent;
  border: 0;
  outline: none;
  font-size: 16px;
  padding: 7px 10px;
  margin-bottom: 40px;
  font-size: 36px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 1rem;
  order: 0;

  option {
    font-size: 24px;
    background-color: #fec753;
  }
  @media (min-width: 992px) {
    font-size: 3rem;
  }
`;

const Location = styled.div`
  font-size: 36px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 1rem;
  order: 0;
  @media (min-width: 992px) {
    font-size: 3rem;
  }
`;

const Description = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 2rem;
  @media (min-width: 992px) {
    font-size: 2rem;
  }
`;

const CurrentWeather = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  img {
    width: 10rem;
    height: auto;
  }

  @media (min-width: 1200px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    img {
      width: 20rem;
    }
  }
`;

const Temperature = styled.div`
  font-size: 8rem;
  color: ${({ theme }) => theme.temperatureColor};
  font-weight: 300;
  display: flex;
  @media (min-width: 992px) {
    font-size: 8rem;
  }
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 3rem;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;

  svg {
    width: 2rem;
    height: auto;
    margin-right: 2rem;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;

  svg {
    width: 2rem;
    height: auto;
    margin-right: 2rem;
  }
`;

const ObservationTime = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: flex-end;
  color: #aaaaaa;

  svg {
    width: 18px;
    height: auto;
    margin-left: 1rem;
    cursor: pointer;
  }

  @media (min-width: 1200px) {
    font-size: 18px;

    svg {
      width: 18px;
    }
  }
`;

const Weather = () => {
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: "",
    humid: 0,
    temperature: 0,
    windSpeed: 0,
    description: "",
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: "",
    moment: "",
    isLoading: true,
  });

  const [currentTheme, setCurrentTheme] = useState("light");
  const [locationName, setLocationName] = useState("高雄市");
  const [currentCity, setCurrentCity] = useState("臺北市");
  const currentLocation = findLocation(currentCity) || {};

  const handleChange = (e) => {
    console.log(e.target.value);

    // STEP 5：把使用者輸入的內容更新到 React 內的資料狀態
    setLocationName(e.target.value);
  };

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast, sunriseAndSunsetData] =
        await Promise.all([
          fetchCurrentWeather(),
          fetchWeatherForecast(),
          fetchSunriseAndSunsetData(),
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setCurrentTheme(weatherElement.moment === "day" ? "light" : "dark");
  }, [weatherElement.moment]);

  const fetchCurrentWeather = () => {
    return axios
      .get(
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-84E1F610-48DF-4A4D-9279-B210B3B5D78E&locationName=高雄"
      )
      .then((response) => {
        const locationData = response.data.records.location[0];

        const weatherElements = locationData.weatherElement.reduce(
          (neededElements, item) => {
            if (["WDSD", "TEMP", "HUMD"].includes(item.elementName)) {
              neededElements[item.elementName] = item.elementValue;
            }
            return neededElements;
          },
          {}
        );

        return {
          observationTime: locationData.time.obsTime,
          locationName: locationData.locationName,
          temperature: weatherElements.TEMP,
          windSpeed: weatherElements.WDSD,
          humid: weatherElements.HUMD,
        };
      });
  };

  const fetchWeatherForecast = () => {
    return axios
      .get(
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-84E1F610-48DF-4A4D-9279-B210B3B5D78E&locationName=高雄市"
      )
      .then((response) => {
        const locationData = response.data.records.location[0];
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

  const fetchSunriseAndSunsetData = () => {
    return axios
      .get(
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=CWB-84E1F610-48DF-4A4D-9279-B210B3B5D78E&timeFrom=2021-11-01&timeTo=2021-12-31"
      )
      .then((response) => {
        const sunriseAndSunsetData =
          response.data.records.locations.location[0].time;

        console.log(response.data.records.locations);

        const getMoment = () => {
          const now = new Date();
          // STEP 5：將當前時間以 "2019-10-08" 的時間格式呈現
          const nowDate = Intl.DateTimeFormat("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
            .format(now)
            .replace(/\//g, "-");

          // 從該地區中找到對應的日期
          const locationDate =
            sunriseAndSunsetData &&
            sunriseAndSunsetData.find((time) => time.dataTime === nowDate);

          const sunriseTimestamp = new Date(
            `${locationDate.dataTime} ${locationDate.parameter[1].parameterValue}`
          ).getTime();
          const sunsetTimestamp = new Date(
            `${locationDate.dataTime} ${locationDate.parameter[5].parameterValue}`
          ).getTime();
          const nowTimeStamp = now.getTime();

          return sunriseTimestamp <= nowTimeStamp &&
            nowTimeStamp <= sunsetTimestamp
            ? "day"
            : "night";
        };

        return { moment: getMoment() };
      });
  };

  return (
    <div>
      <ThemeProvider theme={theme[currentTheme]}>
        <WeatherCard>
          {/* <StyledInputList list="location-list" id="location" name="location" /> */}
          <StyledSelect onChange={handleChange}>
            {locations.map((location) => (
              <option value={location}>{location}</option>
            ))}
          </StyledSelect>
          {/* <Location>{weatherElement.locationName}</Location> */}
          <Description>
            {weatherElement.description} {weatherElement.comfortability}
          </Description>
          <CurrentWeather>
            <Temperature>
              {Math.round(weatherElement.temperature)} <Celsius>°C</Celsius>
            </Temperature>
            <WeatherIcon
              currentWeatherCode={weatherElement.weatherCode}
              moment={weatherElement.moment || "day"}
            />
          </CurrentWeather>
          <AirFlow>
            <WindIcon />
            {weatherElement.windSpeed} m/h
          </AirFlow>
          <Rain>
            <RainIcon />
            {Math.round(weatherElement.rainPossibility)} %
          </Rain>
          <ObservationTime>
            最後觀測時間：
            {new Intl.DateTimeFormat("zh-TW", {
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(weatherElement.observationTime))}{" "}
            {weatherElement.isLoading ? (
              <LoadingIcon />
            ) : (
              <RefreshIcon onClick={fetchData} />
            )}
            {/* <RefreshIcon onClick={fetchData} /> */}
          </ObservationTime>
        </WeatherCard>
      </ThemeProvider>
    </div>
  );
};

export default Weather;

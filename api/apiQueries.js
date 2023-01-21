const axios = require("axios");
const url = require("../helper/index");
const currentModel = require("../models/Model");

const {
  tableCreation,
  insertDataIntoTable,
  getDataFromTable,
} = require("../database/dbQueries");
const getDataFromWeatherApi = async (request, response) => {
  try {
    let weatherApiData;
    await tableCreation();
    const { country, forecastType } = request.query;
    const rows = await getDataFromTable(country, forecastType);
    weatherApiData = rows[0];
    if (rows.length === 0) {
      const { data } = await axios.get(url(country, "forecast"));
      const { currentWeatherApiData, forecastApiData, locationData } =
        currentModel(data, forecastType);
      const currModel = {
        ...currentWeatherApiData,
        ...forecastApiData,
        ...locationData,
      };

      const res = await insertDataIntoTable(currModel);
      if (forecastType === "current") {
        weatherApiData = { ...locationData, ...currentModel };
      }
      if (forecastType === "forecast") {
        weatherApiData = { ...locationData, ...forecastApiData };
      }
    }
    response.status(200).json(weatherApiData);
  } catch (error) {
    response.status(400).json({ err: "something went wrong" });
  }
};

module.exports = { getDataFromWeatherApi };

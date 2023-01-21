const url = (country, forecastType) => {
  return `https://api.weatherapi.com/v1/${forecastType}.json?key=3612b69eac394de2a0e143105231901&q=${country}&aqi=no`;
};

module.exports = url;

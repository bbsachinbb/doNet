const currentModel = (data) => {
  const currentWeatherApiData = {};
  const forecastApiData = {};
  const locationData = {};

  const { sunrise, sunset, moonrise, moonset, moon_phase, moon_illumination } =
    data.forecast.forecastday[0].astro;

  const { name, region, country, lat, lon, tz_id, localtime_epoch, localtime } =
    data.location;

  const {
    temp_c,
    temp_f,
    is_day,
    wind_mph,
    wind_kph,
    wind_degree,
    wind_dir,
    pressure_mb,
    pressure_in,
    precip_mm,
    precip_in,
    humidity,
    cloud,
    feelslike_c,
    feelslike_f,
    vis_km,
    vis_miles,
    uv,
    gust_mph,
    gust_kph,
  } = data.current;

  //location
  locationData.town = name;
  locationData.state = region;
  locationData.nation = country;
  locationData.latitude = lat;
  locationData.longitude = lon;

  //current data
  currentWeatherApiData.tz_id = tz_id;
  currentWeatherApiData.temp_c = temp_c;
  currentWeatherApiData.temp_f = temp_f;
  currentWeatherApiData.is_day = is_day;
  currentWeatherApiData.wind_mph = wind_mph;
  currentWeatherApiData.wind_kph = wind_kph;
  currentWeatherApiData.wind_degree = wind_degree;
  currentWeatherApiData.wind_dir = wind_dir;
  currentWeatherApiData.pressure_mb = pressure_mb;
  currentWeatherApiData.pressure_in = pressure_in;
  currentWeatherApiData.precip_mm = precip_mm;
  currentWeatherApiData.precip_in = precip_in;
  currentWeatherApiData.humidity = humidity;
  currentWeatherApiData.cloud = cloud;
  currentWeatherApiData.feelslike_c = feelslike_c;
  currentWeatherApiData.feelslike_f = feelslike_f;
  currentWeatherApiData.vis_km = vis_km;
  currentWeatherApiData.vis_miles = vis_miles;
  currentWeatherApiData.uv = uv;
  currentWeatherApiData.gust_mph = gust_mph;
  currentWeatherApiData.gust_kph = gust_kph;

  //forecast

  forecastApiData.Dawn = sunrise;
  forecastApiData.Dusk = sunset;
  forecastApiData.moonLit = moonrise;
  forecastApiData.moonSleep = moonset;
  forecastApiData.Orientation = moon_phase;
  forecastApiData.Iillumination = moon_illumination;

  return { currentWeatherApiData, forecastApiData, locationData };
};

module.exports = currentModel;

const pool = require("../database/index");
const tableCreation = () => {
  const query = `create table IF NOT EXISTS weatherData (
    id serial,
    town VARCHAR(50),
    state VARCHAR(50),
    nation VARCHAR(50),
    latitude NUMERIC(6,2),
    longitude NUMERIC(6,2),
    tz_id VARCHAR(50), 
    temp_c NUMERIC(6,2),
    temp_f NUMERIC(6,2),
    is_day NUMERIC(6,2),
    wind_mph NUMERIC(6,2),
    wind_kph NUMERIC(6,2),
    wind_degree NUMERIC(6,2),
    wind_dir VARCHAR(50),
    pressure_mb NUMERIC(6,2),
    pressure_in NUMERIC(6,2),
    precip_mm NUMERIC(6,2),
    precip_in NUMERIC(6,2),
    humidity NUMERIC(6,2),
    cloud NUMERIC(6,2),
    feelslike_c NUMERIC(6,2),
    feelslike_f NUMERIC(6,2),
    vis_km NUMERIC(6,2),
    vis_miles NUMERIC(6,2),
    uv NUMERIC(6,2),
    gust_mph NUMERIC(6,2),
    gust_kph NUMERIC(6,2),
    Dawn  VARCHAR(50),
    Dusk VARCHAR(50),
    moonLit VARCHAR(50),
    moonSleep VARCHAR(50),
    Orientation VARCHAR(50),
    Iillumination VARCHAR(50),
    PRIMARY KEY(id,nation))`;

  return new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve("created");
      }
    });
  });
};

function createValuesIds(vals) {
  let ids = "";
  for (let i = 0; i < vals.length; i++) {
    ids += i === 0 ? "$1" : `, $${i + 1}`;
  }
  return ids;
}

const insertDataIntoTable = (data) => {
  console.log(data);
  const keys = Object.keys(data);
  let columns = `( ${keys.toString()} )`;
  const values = Object.values(data);
  const ids = `( ${createValuesIds(keys)} )`;

  let insert = `INSERT INTO weatherData`;
  const query = `${insert} ${columns} VALUES ${ids} RETURNING *`;

  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve("Inserted");
      }
    });
  });
};

const getDataFromTable = (country, forecastType) => {
  return new Promise((resolve, reject) => {
    let forcastQuery = "";

    if (forecastType === "forecast") {
      forcastQuery =
        "town,state,nation,latitude,longitude,Dawn,Dusk,moonLit,moonSleep,Orientation,Iillumination";
    }

    if (forecastType === "current") {
      forcastQuery =
        "town,state,nation,latitude,longitude,wind_mph,wind_kph,wind_degree,wind_dir,pressure_mb,pressure_in,precip_mm,precip_in,humidity,cloud,feelslike_c,feelslike_f,vis_km,vis_miles,gust_mph,gust_kph,uv";
    }

    const query = `select ${forcastQuery} from  weatherData where LOWER(nation) = '${country.toLowerCase()}' or LOWER(state) = '${country.toLowerCase()}' or LOWER(town) = '${country.toLowerCase()}'`;

    pool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log(result.rows);
        resolve(result.rows);
      }
    });
  });
};

module.exports = { tableCreation, insertDataIntoTable, getDataFromTable };

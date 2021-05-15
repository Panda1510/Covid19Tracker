import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import { useState, useEffect } from "react";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from './components/Table';
import { sortData } from './util';
import LineGraph from './components/LineGraph';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  // state = how to write a variable in react

  useEffect(() => {
    //runs once the components loads, and not again after,
    //async -> send a request, wait for it, do something with the fetched data

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);

          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData(); // we have to call this function for sure
  }, []);

  // for getting the worldwide info, without making any change in country,
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log(countryCode);

    //WORLDWIDE-INFO: https://disease.sh/v3/covid-19/all
    //COUNTR-INFO: https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]

    const URL =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  console.log(countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          <h1>Covid-19 Tracker</h1>

          {/* Title + Select input dropdown */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              {/* loop through all the countries and show a drop down list of the options */}

              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* For holding the info boxes */}
        <div className="app__stats">
          {/* InfoBoxes: Active Cases */}
          <InfoBox
            title="Corona-virus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />

          {/* InfoBoxes: Recoveries */}
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          {/* InfoBoxes: Deaths */}
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* Map */}
        <Map />
      </div>

      <Card className="app__right">
        
        {/* Table of different countries */}
        <CardContent>
          <h3>Live cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
        </CardContent>


        {/* Graph */}
        <LineGraph />

      </Card>
    </div>
  );
}

export default App;

import React from "react";
import styles from "./Card.module.css";

import { Card, CardMedia, Typography, CardContent } from "@material-ui/core";

import { useState, useEffect } from "react";
import axios from "axios";

const CardComponent = () => {
  const [spaceData, setSpaceData] = useState([]);
  const years = [];
  const [filterbyYear, setfilterbyYear] = useState(2014);
  const [launchfilter, setLaunchfilter] = useState(true);
  const [landfilter, setLandfilter] = useState(true);
  let btnChange = false;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const result = await axios.get(
      `https://api.spaceXdata.com/v3/launches?limit=100`
    );
    setSpaceData(result.data);
    setLoading(false);
  };
  let yearfilter = function () {
    let year;
    for (year = 2006; year < 2021; year++) {
      years.push(year);
    }
    console.log(years);
  };
  yearfilter();

  const loadDatabyLaunch = async (abc) => {
    const result = await axios.get(
      `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${abc}`
    );
    setSpaceData(result.data);
  };
  const loadDatabyLand = async (abc) => {
    const result = await axios.get(
      `https://api.spaceXdata.com/v3/launches?limit=100&land_success=${abc}`
    );
    setSpaceData(result.data);
  };
  const loadDatabyYear = async (abc) => {
    const result = await axios.get(
      `https://api.spaceXdata.com/v3/launches?limit=100&launch_year=${abc}`
    );
    setSpaceData(result.data);
  };
  // const loadData2 = async () => {
  //   const result = await axios.get(
  //     `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launchfilter}&land_success=${landfilter}&launch_year=${filterbyYear}`
  //   );
  //   setSpaceData(result.data);
  // };

  const yearbyFilters = (e) => {
    let abc = e.target.value;
    loadDatabyYear(abc);
  };
  const launchbyFilters = (e) => {
    let abc = e.target.value;
    loadDatabyLaunch(abc);
  };
  const landbyFilters = (e) => {
    let abc = e.target.value;
    loadDatabyLand(abc);
  };

  return (
    <div style={{ display: "inline-block" }}>
      {loading && <h4> Loading.... </h4>}
      <Card className={styles.leftcard}>
        <b style={{ float: "left" }}>Filters</b>
        <br />
        <br />
        Launch Year
        <hr />
        {years.map((item) => (
          <div style={{ display: "inline" }}>
            <button
              value={item}
              className={btnChange ? styles.active : styles.btn}
              onClick={yearbyFilters}
            >
              {item}
            </button>
            &nbsp;&nbsp;
          </div>
        ))}
        <hr />
        Successful Launch <br />
        <br />
        <button
          value="true"
          className={styles.btn}
          onClick={launchbyFilters}
          // onClick={(e) => setLaunchfilter(e.target.value)}
        >
          True
        </button>
        &nbsp;&nbsp;
        <button
          value="false"
          className={styles.btn}
          onClick={launchbyFilters}

          // onClick={(e) => setLaunchfilter(e.target.value)}
        >
          False
        </button>
        &nbsp;&nbsp;
        <hr />
        Successful Landing <br />
        <br />
        <button
          value="true"
          className={styles.btn}
          onClick={landbyFilters}
          // onClick={(e) => setLandfilter(e.target.value)}
        >
          True
        </button>
        &nbsp;&nbsp;
        <button
          value="false"
          className={styles.btn}
          onClick={landbyFilters}
          // onClick={(e) => setLandfilter(e.target.value)}
        >
          False
        </button>
        &nbsp;&nbsp;
      </Card>
      <br />
      {spaceData.map((item, index) => (
        <Card className={styles.container} style={{ display: "inline-block" }}>
          <CardMedia>
            <img src="/spaceX.jpg" alt="spaceX" />
          </CardMedia>
          <CardContent>
            <Typography
              style={{ color: "blue" }}
            >{`${item.mission_name}`}</Typography>
            <Typography>Mission Id:{`${item.mission_id}`}</Typography>
            <Typography>Launch Year:{`${item.launch_year}`}</Typography>
            <Typography>Launch Success:{`${item.launch_success}`}</Typography>
            <Typography>Land Success:{`${item.launch_success}`}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardComponent;

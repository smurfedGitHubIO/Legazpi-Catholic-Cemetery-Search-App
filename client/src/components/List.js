import React from "react";
import { divStyle, h3Style, headStyle } from "./ListCSS";

const List = ({ outputSearch }) => {
  const ISOStringToProperDate = (dateString) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let year = dateString.slice(0, 4);
    let month = months[parseInt(dateString.slice(5, 7)) - 1];
    let day = parseInt(dateString.slice(8, 10)) + 1;
    return month + " " + day + ", " + year;
  };
  const properOutput = () => {
    if (outputSearch.length === 0) {
      return "No data available.";
    } else {
      let curList = outputSearch.filter((element, index) => {
        return index <= 9;
      });
      return (
        <div>
          <div style={headStyle}>
            <h3 style={h3Style}>Name</h3>
            <h3 style={h3Style}>Date of Birth</h3>
            <h3 style={h3Style}>Date of Death</h3>
          </div>
          {curList.map((element, index) => (
            <div key={index} style={divStyle}>
              <p style={h3Style}>{element["Name "]}</p>
              <p style={h3Style}>
                {ISOStringToProperDate(element["Date of Birth"])}
              </p>
              <p style={h3Style}>
                {ISOStringToProperDate(element["Date of Death"])}
              </p>
            </div>
          ))}
        </div>
      );
    }
  };

  return <nav id="ListNav">{properOutput()}</nav>;
};

export default List;

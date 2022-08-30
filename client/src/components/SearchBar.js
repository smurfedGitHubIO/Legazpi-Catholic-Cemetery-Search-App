import React, { useState } from "react";
import List from "./List";
import axios from "axios";
import headStyle from './SearchBarCSS';

const SearchBar = () => {
  const [outputSearch, setOutputSearch] = useState([]);
  const inputWidth = "300px";
  const [checkedValue, setCheckedValue] = useState([true, false, false]);

  const valueGetter = async (property, value) => {
    await axios
      .post("http://localhost:3002/search", {
        value: value.toLowerCase(),
        property: property,
      })
      .then((data1) => {
        setOutputSearch(data1.data);
      });
  };

  const disableChecker = (checkboxState, newState) => {
    if (checkboxState) {
      setCheckedValue([false, false, false]);
    } else {
      setCheckedValue(newState);
    }
  };

  return (
    <div>
      <h1 style={headStyle}>Legazpi Catholic Cemetery Search App</h1>
      <input
        onChange={(e) => {
          if (checkedValue[0] && e.target.value !== "") {
            valueGetter("name", e.target.value);
          } else if (checkedValue[1] && e.target.value !== "") {
            valueGetter("birthDate", e.target.value);
          } else if (checkedValue[2] && e.target.value !== "") {
            valueGetter("deathDate", e.target.value);
          } else {
            if (e.target.value !== "") {
              valueGetter("name", e.target.value);
            } else {
              setOutputSearch([]);
            }
          }
        }}
        type="text"
        id="inp"
        style={{ width: inputWidth }}
      />
      <br />
      <input
        onChange={(e) => disableChecker(checkedValue[0], [true, false, false])}
        id="nameSearch"
        type="checkbox"
        value="Name"
        checked={checkedValue[0]}
      />
      <label>Name</label>
      <input
        onChange={(e) => disableChecker(checkedValue[1], [false, true, false])}
        id="birthSearch"
        type="checkbox"
        value="Date of Birth"
        checked={checkedValue[1]}
      />
      <label>Date of Birth</label>
      <input
        onChange={(e) => disableChecker(checkedValue[2], [false, false, true])}
        id="deathSearch"
        type="checkbox"
        value="Date of Death"
        checked={checkedValue[2]}
      />
      <label>Date of Death</label>
      <br />
      <br />
      <List outputSearch={outputSearch} />
    </div>
  );
};

export default SearchBar;

import React, { useState } from 'react';
import List from './List';
import axios from 'axios';

const SearchBar = () => {

    const [outputSearch, setOutputSearch] = useState([]);
    const [inputType, setInputType] = useState("text");
    const [inputWidth, setInputWidth] = useState("300px");
    const [checkedValue, setCheckedValue] = useState([false, false, false]);

    const valueGetter = async (property, value) => {
        await axios.post("http://localhost:3002/search", { value : value.toLowerCase() , property : property})
        .then( (data1) => {
            setOutputSearch(data1.data);
        });
    };

    const disableChecker = (checkboxID, newState) => {
        if (!document.getElementById(checkboxID).checked) {
            setCheckedValue([false, false, false]);
        } else {
            setCheckedValue(newState);
        }
    }

    const onClickInputTypeChange = (newType) => {
        setInputType(newType);
        setInputWidth("300px");
    }

    return (
        <div>
            <h1 style={headStyle}>
                Legazpi Catholic Cemetery Search App
            </h1>
            <input onChange={ e => {
                if (document.querySelector("#nameSearch").checked && e.target.value !== "") {
                    valueGetter("name", e.target.value);
                } else if (document.querySelector("#birthSearch").checked && e.target.value !== "") {
                    valueGetter("birthDate", e.target.value);
                } else if (document.querySelector("#deathSearch").checked && e.target.value !== "") {
                    valueGetter("deathDate", e.target.value);
                } else {
                    if (e.target.value !== "") {
                        valueGetter("name", e.target.value);
                    } else {
                        setOutputSearch([]);
                    }
                }
                
            } } type={inputType} id="inp" style = { { width: inputWidth } }/>
            <br />
            <input onClick={
                e => {
                    disableChecker("nameSearch", [true, false, false]);
                    onClickInputTypeChange("text");
                }
            } id="nameSearch" type="checkbox" value="Name" checked={checkedValue[0]} />
            <label>Name</label>
            <input onClick={
                e => {
                    disableChecker("birthSearch", [false, true, false]);
                    onClickInputTypeChange("date");
                }
            } id="birthSearch" type="checkbox" value="Date of Birth" checked={checkedValue[1]} />
            <label>Date of Birth</label>
            <input onClick={
                e => {
                    disableChecker("deathSearch", [false, false, true]);
                    onClickInputTypeChange("date");
                }
            } id="deathSearch" type="checkbox" value="Date of Death" checked={checkedValue[2]} />
            <label>Date of Death</label>
            <br />
            <br />
            <List outputSearch={outputSearch} />
        </div>
    );
};

/* CSS Styles */

const headStyle = {
    fontSize: "6vh",
    padding: 0,
    margin: "8vh 2vh 4vh 2vh",
    color: "#222"
};

/* End of CSS Styles */

export default SearchBar;
import React, { useState } from 'react';
import List from './List';
import axios from 'axios';

const SearchBar = () => {

    const [outputSearch, setOutputSearch] = useState([]);

    /* functions list */

    const valueGetter = async (property, value) => {
        console.log(property);
        await axios.post("http://localhost:3002/search", { value : value , property : property})
        .then((data1) => {
            console.log(data1);
            setOutputSearch(data1.data);
        });
    };

    const disableChecker = (firstID, secondID, thirdID) => {
        if(document.getElementById(firstID).checked){
            document.getElementById(secondID).style.pointerEvents = "none";
            document.getElementById(thirdID).style.pointerEvents = "none";
        } else {
            document.getElementById(secondID).style.pointerEvents = "auto";
            document.getElementById(thirdID).style.pointerEvents = "auto";
        }
    }

    const onClickInputTypeChange = (prop) => {
        if((!document.querySelector("#nameSearch").checked && !document.querySelector("#birthSearch").checked && !document.querySelector("#deathSearch").checked) || prop === "name") {
            document.getElementById("inp").type = "text";
        } else {
            document.getElementById("inp").type = "date";
        }
        document.getElementById("inp").style.width = "300px";
    }

    /* end of functions list */

    return (
        <div>
            <h1 style = { headStyle }>Legazpi Catholic Cemetery Search App</h1>
            <input onChange={ e => {
                if (document.querySelector("#nameSearch").checked && e.target.value !== "") {
                    valueGetter("name", e.target.value);
                } else if(document.querySelector("#birthSearch").checked && e.target.value !== "") {
                    valueGetter("birthDate", e.target.value);
                } else if(document.querySelector("#deathSearch").checked && e.target.value !== ""){
                    valueGetter("deathDate", e.target.value);
                } else {
                    setOutputSearch([]);
                }
                
            } } type="text" id="inp" size="50"/>
            <br />
            <input onClick={
                e => {
                    disableChecker("nameSearch", "birthSearch", "deathSearch");
                    onClickInputTypeChange("name");
                }
            } id="nameSearch" type="checkbox" value="Name" />
            <label>Name</label>
            <input onClick={
                e => {
                    disableChecker("birthSearch", "nameSearch", "deathSearch");
                    onClickInputTypeChange("date");
                }
            } id="birthSearch" type="checkbox" value="Date of Birth" />
            <label>Date of Birth</label>
            <input onClick={
                e => {
                    disableChecker("deathSearch", "nameSearch", "birthSearch");
                    onClickInputTypeChange("date");
                }
            } id="deathSearch" type="checkbox" value="Date of Death" />
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
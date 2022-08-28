import React from 'react';

const List = ({ outputSearch }) => {

    const ISOStringToProperDate = (dateString) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let year = dateString.slice(0, 4);
        let month = months[parseInt(dateString.slice(5, 7))-1];
        let day = parseInt(dateString.slice(8, 10))+1;
        return month + " " + day + ", " + year;
    };

    const properOutput = () => {
        if (outputSearch.length === 0) {
            return "No data available.";
        } else {
            let curList = outputSearch.filter((element, index) => {
                return index <= 9;
            });
            return curList.map( (element, index) => ((
                <div id={index} style={ divStyle }>
                    <h3 style={ pStyle }>Name: {element["Name "]}</h3>
                    <p style={ pStyle }>Date of Birth: {ISOStringToProperDate(element["Date of Birth"])}</p>
                    <p style={ pStyle }>Date of Death: {ISOStringToProperDate(element["Date of Death"])}</p>
                </div>
            )));
        }
    }

    return (
        <nav id="ListNav">
            {
                properOutput()
            }
        </nav>
    );
};

/* CSS Styles */

const divStyle = {
    padding: "1.2vh",
    margin: "3vh 45vh 3vh 45vh",
    border: "3px solid #444"
};

const pStyle = {
    margin: 0,
    fontSize: "2.2vh"
}

/* End of CSS Styles */

export default List;
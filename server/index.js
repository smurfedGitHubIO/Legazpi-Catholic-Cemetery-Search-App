const express = require("express");
const app = express();
const cors = require("cors");

const XLSX = require("xlsx");
const workbook = XLSX.readFile("CAMPO-DIRECTORY.xlsx", {
  type: "binary",
  cellDates: true,
  dateNF: "mm/dd/yyyy;@",
});
const sheet_name_list = workbook.SheetNames;

const PORT = 3002;

app.use(express.json());
app.use(cors());

/* functions list */

const hasSearch = (a, b) => {
  let checker = false;
  for (let i = 0; i < a.length - b.length + 1; i++) {
    if (a.slice(i, i + b.length).toLowerCase() === b) {
      checker = true;
      break;
    }
  }
  return checker;
};

const ISOStringToProperDate = (dateString) => {
  let months = {
    "Jan": "january",
    "Feb": "february",
    "Mar": "march",
    "Apr": "april",
    "May": "may",
    "Jun": "june",
    "Jul": "july",
    "Aug": "august",
    "Sep": "september",
    "Oct": "october",
    "Nov": "november",
    "Dec": "december",
  };
  dateString = String(dateString);
  let year = dateString.slice(11, 15);
  let month = months[dateString.slice(4, 7)];
  let day = parseInt(dateString.slice(8, 10));
  return month + " " + day + ", " + year;
};

/* end of functions list */

app.post("/search", (req, res) => {
  let toSearch = req.body.value;
  const property = req.body.property;
  let sheet_list = XLSX.utils.sheet_to_json(
    workbook.Sheets[sheet_name_list[0]]
  );
  if (property == "name") {
    let ans = sheet_list.filter((val) => {
      if (val.hasOwnProperty("Name ") == false) {
        return false;
      }
      return hasSearch(val["Name "], toSearch);
    });
    res.send(ans);
  } else if (property == "birthDate") {
    let ans = sheet_list.filter((val) => {
      if (val.hasOwnProperty("Date of Birth") == false) {
        return false;
      }
      let convertedDate = ISOStringToProperDate(val["Date of Birth"]);
      return hasSearch(convertedDate, toSearch);
    });
    res.send(ans);
  } else {
    let ans = sheet_list.filter((val) => {
      if (val.hasOwnProperty("Date of Death") == false) {
        return false;
      }
      let convertedDate = ISOStringToProperDate(val["Date of Death"]);
      return hasSearch(convertedDate, toSearch);
    });
    res.send(ans);
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running at PORT ${PORT}`);
  }
});

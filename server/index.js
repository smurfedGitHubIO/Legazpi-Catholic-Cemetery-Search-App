const express = require('express');
const app = express();
const cors = require('cors');

const XLSX = require('xlsx');
const workbook = XLSX.readFile('CAMPO-DIRECTORY.xlsx', {type: "binary", cellDates: true, dateNF: 'mm/dd/yyyy;@'});
const sheet_name_list = workbook.SheetNames;

const PORT = 3002;

app.use(express.json());
app.use(cors());

/* functions list */

const hasSearch = (a, b) => {
    let checker = false;
    for(let i=0; i<a.length-b.length+1; i++){
        if(a.slice(i, i+b.length) == b){
            checker = true;
            break;
        }
    }
    return checker;
};

/* end of functions list */

app.post('/search', (req, res) => {
    let toSearch = "";
    const property = req.body.property;
    if(property != "name") {
        toSearch = new Date(req.body.value.slice(0,4), parseInt(req.body.value.slice(5,7))-1, parseInt(req.body.value.slice(8,10)));
    } else {
        toSearch = req.body.value;
    }
    var sheet_list = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    if(property == "name") {
        var ans = sheet_list.filter(val => {
            if(val.hasOwnProperty("Name ") == false){
                return false;
            }
            return hasSearch(val["Name "], toSearch);
        });
        res.send(ans);
    } else if(property == "birthDate") {
        var ans = sheet_list.filter(val => {
            if(val.hasOwnProperty("Date of Birth") == false){
                return false;
            }
            return val["Date of Birth"].getTime()-toSearch.getTime() == 0;
        });
        res.send(ans);
    } else {
        var ans = sheet_list.filter(val => {
            if(val.hasOwnProperty("Date of Death") == false){
                return false;
            }
            return val["Date of Death"].getTime()-toSearch.getTime() == 0;
        });
        res.send(ans);
    }
});

app.listen(PORT, err => {
    if(err) {
        console.log(err);
    } else {
        console.log(`Server running at PORT ${PORT}`);
    }
});
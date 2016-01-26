//zellars
'use strict';
module.exports = {modifiedMonth:modifiedMonth, modifiedYear:modifiedYear, getDay:getDay}

function getDay (year, month, day){

  const q = day;
  const m = modifiedMonth(month);
  const y = modifiedYear(year, month);
  //let numeral = (q + parseInt(((m + 1) * 26) / 10) + y + parseInt(y / 4) + 6 * parseInt(y / 100) + parseInt(y / 400) - 1) % 7;
  console.log("m", m);
  console.log("y", y);
  const h = ((q + (Math.floor(((m + 1) * 26) / 10)) + y + Math.floor(y / 4) + (6 * Math.floor(y / 100)) + (Math.floor(y / 400))) % 7);
  //if(h>6){
  //return 0;
  //}
return h;
}

function modifiedMonth(month) {
  if(month < 3){
    month = month + 12;
  }
   return month;
}

function modifiedYear(year, month) {
  if(month < 3){
    year = year - 1;
   }
    return year;
}



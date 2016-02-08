#!/usr/bin/env node

'use strict';
module.exports = {leapYearFunc:leapYearFunc}
const _ = require('../node_modules/lodash')
const zellers = require('./zellers')
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const firstDayofMonth = zellers.getDay(todayYear, todayMonth + 1, 1);
const [ , , ...args] = process.argv;
//console.log("args", args); [[[for plugging parameters in from the command line]]]

let daysOfTheWeek = "Su Mo Tu We Th Fr Sa";
let monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


//Centering the month at the top
let centeredMonth = monthsOfTheYear[todayMonth] + " " + todayYear;
let monthSpaces = Math.floor((20 - centeredMonth.length)/2);
let monthSpacesString = "";
  for (var j=0; j<monthSpaces; j++){
    monthSpacesString = " " + monthSpacesString;
  }
  console.log(monthSpacesString + centeredMonth);
  console.log(daysOfTheWeek);

let leapYear = leapYearFunc(year);
// Leap year /////
function leapYearFunc(year){
  let leapYear = false;
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0) === true){
      leapYear = true;
    }
    return leapYear;
}

leapYearFunc(todayYear);
//////////////////

// The other lines of the calendar. Looking at the day numnber (Sun = 0, Mon = 1.... Sat = 6), starting at the predicted first Sunday of the month AFTER the first line ( 7 minus the day number) and cycle until the end of the line (+6).

let numberDaysFirstWeek = _.range(1, 7-firstDayofMonth + 1);
let numberDaysSecondWeek = _.range(7-firstDayofMonth + 1, 7-firstDayofMonth + 8);
let numberDaysThirdWeek = _.range(7-firstDayofMonth + 8, 7-firstDayofMonth + 15);
let numberDaysFourthWeek = _.range(7-firstDayofMonth + 15,  7-firstDayofMonth + 22);
let numberDaysFifthWeek = _.range(7-firstDayofMonth + 22,   7-firstDayofMonth + 22);
let numberDaysSixthWeek = _.range(7-firstDayofMonth + 23,   7-firstDayofMonth + 24);

//let leapYear = true;


//strip extra days based on month 30/31 days at the month's end.
if(todayMonth === 3 || todayMonth === 5 || todayMonth === 8 || todayMonth === 10){
  numberDaysFifthWeek = monthEnd(numberDaysFifthWeek, 31, 22, 29);
  numberDaysSixthWeek = monthEnd(numberDaysSixthWeek, 31, 29, 30);
} else if (todayMonth === 1){
  numberDaysFifthWeek = monthEnd(numberDaysFifthWeek, 29, 22, 29);
  numberDaysSixthWeek = [];
    if (todayMonth === 1 && leapYear){
      numberDaysFifthWeek = monthEnd(numberDaysFifthWeek, 30, 22, 30);
      numberDaysSixthWeek = [];
    }
} else {
  numberDaysFifthWeek = monthEnd(numberDaysFifthWeek, 32, 22, 29);
  numberDaysSixthWeek = monthEnd(numberDaysSixthWeek, 32, 29, 30);
}
//function handling the end of the month
function monthEnd(dayArray, endOfMonth, startDay, endDay){
   dayArray = _.range(7-firstDayofMonth + startDay,  7-firstDayofMonth + endDay);
    let endOfDays = dayArray.indexOf(endOfMonth);
    if (endOfDays > -1){
      dayArray = dayArray.slice(0, endOfDays);
    }
    return dayArray;
}


 //First line of the calendar
let stringSpace = ""

// Space before the first date
for(let i=0; i<=firstDayofMonth; i++){
   if (i === 0){
   stringSpace = ""+stringSpace;
  } else {
   stringSpace = "   "+stringSpace;
  }
}

function extraSpace(weekArray){
   for (let i=0; i<weekArray.length; i++){
    if (weekArray[i] < 10){
      weekArray[i] = " " + weekArray[i];
    }
  }
}
extraSpace(numberDaysFirstWeek);
extraSpace(numberDaysSecondWeek);
extraSpace(numberDaysThirdWeek);
console.log(stringSpace + numberDaysFirstWeek.join(" "));
console.log(numberDaysSecondWeek.join(" "));
console.log(numberDaysThirdWeek.join(" "));
console.log(numberDaysFourthWeek.join(" "));
console.log(numberDaysFifthWeek.join(" "));
console.log(numberDaysSixthWeek.join(" "));




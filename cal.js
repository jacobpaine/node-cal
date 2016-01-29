#!/usr/bin/env node --harmony_destructuring

'use strict';
const _ = require('./node_modules/lodash')
const makeOutput = require('./lib/makeOutput')
const zellers = require('./lib/zellers')
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const firstDayofMonth = zellers.getDay(todayYear, todayMonth + 1, 1);
const [ , , ...args] = process.argv;
//console.log("args", args); [[[for plugging parameters in from the CLI]]]

let daysOfTheWeek = "Su Mo Tu We Th Fr Sa";
let monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


//Centering the month at the top
let centeredMonth = monthsOfTheYear[todayMonth] + " " + todayYear;
let monthSpaces = (20 - centeredMonth.length)/2
let monthSpacesString = "";
  for (var j=0; j<monthSpaces; j++){
    monthSpacesString = " " + monthSpacesString;
  }
  console.log(monthSpacesString + centeredMonth);
  console.log(daysOfTheWeek);




// The other lines of the calendar. Looking at the day numnber (Sun = 0, Mon = 1.... Sat = 6), starting at the predicted first Sunday of the month AFTER the first line ( 7 minus the day number) and cycle until the end of the line (+6).

let numberDaysFirstWeek = _.range(1, 7-firstDayofMonth + 1);
let numberDaysSecondWeek = _.range(7-firstDayofMonth + 1, 7-firstDayofMonth + 8);
let numberDaysThirdWeek = _.range(7-firstDayofMonth + 8, 7-firstDayofMonth + 15);
let numberDaysFourthWeek = _.range(7-firstDayofMonth + 15,  7-firstDayofMonth + 22);
let numberDaysFifthWeek;
let numberDaysSixthWeek;

if(todayMonth !== 1){
//strip extra days based on month 30/31 days at the month's end.
  if(todayMonth === 3 || todayMonth === 5 || todayMonth === 8 || todayMonth === 10){
    numberDaysFifthWeek = monthEnd(numberDaysFifthWeek, 31, 22, 29);
    numberDaysSixthWeek = monthEnd(numberDaysSixthWeek, 31, 29, 30);
  } else {
    numberDaysFifthWeek = monthEnd(numberDaysFifthWeek, 32, 22, 29);
    numberDaysSixthWeek = monthEnd(numberDaysSixthWeek, 32, 29, 30);
  }
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


// First line of the calendar
let stringSpace = ""
// Seven minus the day number gives the amount that we want to add spaces.
for(let i=1; i<= 7 - firstDayofMonth; i++){
  //IF the month starts on a Sunday, give one space
  if (firstDayofMonth === 0 && i === 1){
   stringSpace += " ";
  } else {
    // Every other date gets two spaces.
   stringSpace += "  ";
  }
}

// Space before the first date
for(let i=0; i<firstDayofMonth; i++){
   if (i === 0){
   stringSpace = ""+stringSpace;
  } else {
   stringSpace = "   "+stringSpace;
  }
}

// Spacing for numbers less 10
let numSpace = " ";
  console.log("numberDaysSecondWeek", numberDaysSecondWeek)
for (let i=0; i<numberDaysSecondWeek.length; i++){
  numberDaysSecondWeek = numberDaysSecondWeek[i];
console.log("numberDaysSecondWeek.length", numberDaysSecondWeek[i]);
}
  console.log("numberDaysSecondWeek", numberDaysSecondWeek)

console.log(stringSpace + numberDaysFirstWeek.join(" "));
console.log(_.join(numberDaysSecondWeek));
console.log(numberDaysThirdWeek.join(" "));
console.log(numberDaysFourthWeek.join(" "));
console.log(numberDaysFifthWeek.join(" "));
console.log(numberDaysSixthWeek.join(" "));


// Reserved space for leap year if...else...
//


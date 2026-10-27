
//Q1

// let prompt = require("prompt-sync")();
// let n = parseInt(prompt("Enter number of elements: "));
// let arr = prompt("Enter array elements separated by space: ").split(" ");
// let k = parseInt(prompt("Enter rotation count: "));
// k = k % n;
// let r = arr.slice(-k).concat(arr.slice(0, n - k));
// console.log("Rotated Array:", r.join(" "));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Q2

let prompt = require("prompt-sync")();
let str = prompt("Enter a string: ");
let rev = str.split('').reverse().join('');
if (str === rev) {
  console.log("The given string is " + str);
  console.log("true");
} else {
  console.log("The given string is " + str);
  console.log("false");
}

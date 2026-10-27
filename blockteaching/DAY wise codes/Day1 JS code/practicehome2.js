
//Q1
// let prompt=require("prompt-sync")();
// const type = prompt("Enter account type ");
// const name = prompt("Enter account holder name:");
// const balance = parseInt(prompt("Enter account balance:"));
// const bankTemplate = {
//   type: "",
//   name: "",
//   balance: 0,
//   displayDetails: function() {
//     console.log(`${this.type} Account Holder: ${this.name}`);
//   },
//   showBalance: function() {
//     console.log(`Balance: $${this.balance}`);
//   }
// };
// const account = Object.create(bankTemplate);
// account.type = type;
// account.name = name;
// account.balance = balance;
// account.displayDetails();
// account.showBalance();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Q2

// let prompt=require("prompt-sync")();
// const name = prompt("Enter your name:");
// const message = prompt("Enter your message:");
// const userProfile = {
//   name: name,
//   greet: function(msg) {
//     console.log(`Hello ${this.name}! ${msg}`);
//   }
// };
// const greetUser = userProfile.greet.bind(userProfile);
// greetUser(message);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Q3

// let prompt = require("prompt-sync")();
// let speed = prompt("Enter speed (km/h):");
// const converter = {
//   convert: function(factor) {
//     return this.speed * factor;
//   }
// };
// const speedObj = { speed: Number(speed) };
// const result = converter.convert.apply(speedObj, [10 / 36]);

// console.log(`Speed in m/s: ${result}`);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Q4

// let prompt = require("prompt-sync")();
// const userName = prompt("Enter your name: ");
// const destination = prompt("Enter your destination: ");
// const travelDate = prompt("Enter your travel date: ");
// const profile = { name: userName };
// function generateMessage(dest, date) {
//   console.log(`Dear ${this.name}, your ticket to ${dest} on ${date} is confirmed!`);
// }
// const personalizedMessage = generateMessage.bind(profile);
// personalizedMessage(destination, travelDate);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Q5

// let prompt = require("prompt-sync")();
// const personContext = { title: "Mr." };
// function formatFullName(fName, lName) {
//   return `${this.title} ${fName} ${lName}`;
// }
// const firstName = prompt("Enter first name: ");
// const lastName = prompt("Enter last name: ");
// const fullName = formatFullName.apply(personContext, [firstName, lastName]);
// console.log(fullName);

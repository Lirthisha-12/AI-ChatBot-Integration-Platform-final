
//Q1

// let prompt = require("prompt-sync")();

// const bookingTemplate = {
//   customerName: "",
//   movieName: "",
//   theaterName: "",
//   ticketCount: 0,
//   ticketPrice: 0,
//   totalValue: function () {
//     return this.ticketCount * this.ticketPrice;
//   }
// };

// const n = parseInt(prompt("Enter number of customers: "));
// let highestBooking = null;

// for (let i = 0; i < n; i++) {
//   console.log(`\nCustomer ${i + 1} details:`);

//   const name = prompt("Enter customer name: ");
//   const movie = prompt("Enter movie name: ");
//   const theater = prompt("Enter theater name: ");
//   const count = parseInt(prompt("Enter ticket count: "));
//   const price = parseInt(prompt("Enter ticket price: "));

//   const booking = Object.create(bookingTemplate);
//   booking.customerName = name;
//   booking.movieName = movie;
//   booking.theaterName = theater; // matches template
//   booking.ticketCount = count;
//   booking.ticketPrice = price;

//   if (!highestBooking || booking.totalValue() > highestBooking.totalValue()) {
//     highestBooking = booking;
//   }
// }

// console.log(
//   `\n${highestBooking.customerName} has the highest booking value: ₹${highestBooking.totalValue()}`
// );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Q2

let prompt = require("prompt-sync")();
let n = parseInt(prompt("Enter number of employees: "));
let employees = [];
for (let i = 0; i < n; i++) {
  console.log(`\nEmployee ${i + 1} details:`);
  let name = prompt("Enter employee name: ");
  let salary = parseInt(prompt("Enter current salary: "));
  let hike = parseInt(prompt("Enter hike percentage: "));
  employees.push({ name, salary, hike });
}
function calculateHike(salary, hike) {
  return salary + (salary * hike) / 100;
}
let maxEmp = employees[0];
let maxSalary = calculateHike.apply(null, [maxEmp.salary, maxEmp.hike]);
for (let i = 1; i < employees.length; i++) {
  let emp = employees[i];
  let finalSalary = calculateHike.apply(null, [emp.salary, emp.hike]);
  if (finalSalary > maxSalary) {
    maxSalary = finalSalary;
    maxEmp = emp;
  }
}
console.log(`\n${maxEmp.name} has the highest post-hike salary: ${maxSalary}`);

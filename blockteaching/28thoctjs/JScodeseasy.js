//Q1 celcius to fahrenheit

const prompt=require("prompt-sync")();
// class Temperature{
//     celcius;
//     constructor(celcius){
//         this.celcius=celcius;
//     }
//     getFahrenheit(){
//         let fahr=this.celcius*(9/5)+32;
//         console.log(`Fahrenheit=${fahr}`)
//         return fahr;
//     }
// }
// const celcius=parseInt(prompt("Enter Celcius:"));
// const obj=new Temperature(celcius);
// obj.getFahrenheit();

//Q2 map,filter and reduce functions

// let no=parseInt(prompt("Enter no of elements in array"));
// let arr=[];
// for (let i=0;i<no;i++){
//     let num=parseInt(prompt("Enter elements:"));
//     arr.push(num);
// }
// let filtered=arr.filter(elem=>elem>10);
// console.log(filtered);
// let mapped=filtered.map((value,index)=>value*2);
// console.log(mapped);
// let sum=mapped.reduce((start,current)=>start+current,0);
// console.log(sum);

//Q3 template

// const Student = {
//   displayDetails() {
//     console.log(`Name: ${this.name}, Course: ${this.course}, Grade: ${this.grade}`);
//   }
// };
// const stud1 = Object.create(Student);
// stud1.name = "Ruby";
// stud1.course = "Js";
// stud1.grade = "A";
// const stud2 = Object.create(Student);
// stud2.name = "Rohan";
// stud2.course = "React";
// stud2.grade = "B+";
// stud1.displayDetails();
// stud2.displayDetails();

//Q4 

// const input = prompt("");
// const [nameInput, ageInput, cityInput] = input.split(" ");
// const person = { name: nameInput, age: Number(ageInput), city: cityInput };
// const { name, age, city } = person;
// console.log(`Name: ${name}, Age: ${age}, City: ${city}`);

//Q5

// let n = parseInt(prompt("Enter number of rows: "));
// for (let i = n; i >= 1; i--) {
//     let row = "";
//     for (let j = 1; j <= i; j++) {
//         row += "*";
//     }
//     console.log(row);
// }

//Q6

// const input = prompt("Enter numbers: ").split(" ").map(Number);
// function sumAll(...nums) {
//     Math.max(...nums);
//     let total = 0;
//     for (let num of nums){ 
//          total += num
//     };
//     return total;
// }
// const result = sumAll(...input);
// console.log(`Sum = ${result}`);

//Q7
// const userProfile = {
//   name: "Ananya",
//   age: 22,
//   address: {
//     city: "Chennai",
//     country: "India"
//   }
// };
// const { name, address: { city } } = userProfile;
// console.log(name);
// console.log(city);

//Q8
// function withdraw(balance, amount) {
//   if (amount > balance) {
//     throw new Error("Insufficient balance");
//   } else {
//     console.log(`Withdrawal successful. Remaining balance: ${balance - amount}`);
//   }
// }
// withdraw(500, 200);

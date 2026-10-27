
//template literals
//Mulitline string
const stringname=`hello
lirthisha
how are you`;
console.log(stringname);

//string interpolation
const prompt=require("prompt-sync")();
let data=prompt("Enter your name");
console.log(`This is name: ${data}`)


let name=prompt("Enter name:");
let dep=prompt("Enter department:");
let sec=prompt("Enter section:");
console.log(`Name:${name}
Department:${dep}
Section: ${sec}`);
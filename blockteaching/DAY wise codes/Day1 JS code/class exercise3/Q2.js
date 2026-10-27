function add(a,b){
    let sum=a+b;
    return sum;
}
let prompt=require("prompt-sync")();
let a=parseInt(prompt("enter a number"));
let b=parseInt(prompt("enter another number"));
console.log(add(a,b));
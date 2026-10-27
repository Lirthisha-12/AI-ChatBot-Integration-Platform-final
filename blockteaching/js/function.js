/*
//function declaration-both bottom up and top down approach
function greet(){
    console.log("Hello Wolrd!");
}
greet();

//Function Expression - only top down
const greet=function(){
    console.log("Hello world");
}
greet();

//Arrow function - only top down
const greet=()=>{
    console.log("Hello World");
}
greet();
*/

//Tip Calculator
function calculateTip(billamount,serviceQuality){
    if(serviceQuality=="excellent"){
        let tip=billamount*0.2;
        console.log("Total amount=",billamount+tip);
    }
    else if(serviceQuality=="good"){
        let tip=billamount*0.15;
        console.log("Total amount=",billamount+tip);
    }
    else if(serviceQuality=="poor"){
        let tip=billamount*0.1;
        console.log("Total amount=",billamount+tip);
    }
}
const prompt=require("prompt-sync")();
let billamount=prompt("Enter bill amount");
let ba=parseInt(billamount);
let sq=prompt("Enter service quality");
calculateTip(ba,sq);
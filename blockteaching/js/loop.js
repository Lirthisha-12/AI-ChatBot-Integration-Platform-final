/*
//multiplication table
for(let i=1;i<=5;i++){
    console.log("5*",i,"=",5*i);
}

//reversing the number
const prompt=require("prompt-sync")();
let number=prompt("Enter a number to reverse:");
let sum=0;
while(number>0){
    let rem=number%10;
    sum=sum*10+rem;
    number=Math.floor(number/10);
}
console.log("Reversed no is:",sum);

//number guessing game(while)
const prompt=require("prompt-sync")();
const secretno=5;

while (true){
    let guess=prompt("Guess a number between 1 and 10");
    if(guess==secretno){
        console.log("You guessed the secret number");
        break;
    }
    else{
        console.log("Try again , You didn't guess the secret number");
    }
}

//do while
let i=0;
do{
    console.log(i);
}
while(i>5);
*/
//for each loop
const arr=["hello",'hi',"welcome"];
for(let data of arr){
    console.log(data);
    
}
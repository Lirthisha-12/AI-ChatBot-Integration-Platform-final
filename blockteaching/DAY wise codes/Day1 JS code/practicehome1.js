//Q1
console.log("Welcome to the World of Programming!" );


//Q2
let a=34;
let b=36;
console.log("The value of a before swapping:",a);
console.log("The value of b before swapping:",b);
let temp=a;
a=b;
b=temp;
console.log("The value of a after swapping:",a);
console.log("The value of b after swapping:",b);


//Q3
let div=15/6;
let rem=15%6;
console.log(div);
console.log(rem);


//Q4
process.stdin.on('data', number => {
let x=parseInt(number);
let ans=Math.pow(2,x);
console.log(ans);
process.exit();
});


//Q5
let mul=4*56*33*22;
console.log("The product is: ",mul);
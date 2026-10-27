//using for loop
let arrayno=[1,2,3,4,5,6,7,8,9,10,15];
for(let no in arrayno){
    if(no%3===0 || no%5===0){
        console.log(no);
    }
}
//using filter method
let arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let b=arr.filter((value)=>value%3===0 || value%5===0);
console.log(b);
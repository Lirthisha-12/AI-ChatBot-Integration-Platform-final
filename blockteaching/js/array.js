/*
//common methods
// an array in js can contain data of different data types
let arr=[1,2,4,5];
console.log(arr);
arr.push(33);//insert element at last
console.log(arr);
arr.pop();//removes last element
console.log(arr);
arr.shift();//to remove first element
console.log(arr);
arr.unshift(87);//to insert first element
console.log(arr);
console.log(arr.length);//length
//special methods
//map function
const number=[10,20,31,41,50];
number.map((value,index)=>{
    console.log(index+"data"+value);
})
//filter function

let even=number.filter(num=>num%2===0);
console.log(even);

//reduce function
const number=[20,12,33,65];
let result=number.reduce((start,current)=>start+current,100);
console.log(result);

//task-double numbers (given an array of numbers,use map() to create a new array where each number is doubled)
const num=[10,3,4,65];
let double=num.map((value,index)=>{
    console.log(value*2);

})
//filter words longer than 5 letters 
const words=["apple","banana","kiwi","cherry","grape"];
let newwords=words.filter(word=>word.length>5);
console.log(newwords);

//multiply all the elements with reduce()
const  number=[2,3,4,5,6];
let result=number.reduce((start,current)=>start*current,1);
console.log(result);


//destucturing an array
const arr=[10,20,30,40,50];
let [a,b,c]=arr;
console.log(a);
console.log(b);
console.log(c);

//destucturing an array with rest parameter
const arr=[10,20,30,40,50];
let [a,b,...c]=arr;
console.log(a);
console.log(b);
console.log(c);

//task-destructuring-get first two fruits
const words=["apple","banana","kiwi","cherry","grape"];
let [a,b]=words;
console.log(a);
console.log(b);
*/
//spread operator
const arr1=[1,2,3,4];
const arr2=[4,7,8,9];
let combine=[...arr1]+[...arr2];
console.log(combine);

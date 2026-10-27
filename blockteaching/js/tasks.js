/*
//task 1
class Book{
    title;
    author;
    year;
    constructor(title,author,year){
        this.title=title;
        this.author=author;
        this.year=year;
    }
}
const prompt=require("prompt-sync")();
//book1
let title=prompt("Enter book 1 title:");
let author=prompt("Enter Book 1 name:");
let year=prompt("Enter 1 year:");
const b1=new Book(title,author,year);
console.log(b1.title,b1.author,b1.year);
//book2
let title1=prompt("Enter book 2 title:");
let author1=prompt("Enter Book 2 name:");
let year1=prompt("Enter 2 year:");
const b2=new Book(title1,author1,year1);
console.log(b2.title,b2.author,b2.year);
*/
//task 2

class Book{
    title;
    author;
    year;
    constructor(title,author,year){
        this.title=title;
        this.author=author;
        this.year=year;
    }
    getDetails(){
        console.log(this.title,this.author,this.year);
    }
    getBookAge(CurrentYear){
        return CurrentYear-this.year;
    }
}
const prompt=require("prompt-sync")();
let title=prompt("Enter title:");
let author=prompt("Enter author:");
let year=prompt("Enter year");
let currentyear=prompt("CurrentYear:");

const b=new Book(title,author,year);
b.getDetails();
console.log(b.getBookAge(currentyear));


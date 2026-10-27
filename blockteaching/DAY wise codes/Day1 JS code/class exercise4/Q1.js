class Student{
    constructor(name,marks){
        this.name=name;
        this.marks=marks;
    }
    getGrade(){
        if(this.marks>=90){
            return 'A';
        }
        else if(this.marks>=75){
            return 'B';
        }
        else{
            return 'C';
        }
    }
}
let prompt=require("prompt-sync")();
let name=prompt("enter name");
let marks=parseInt(prompt("enter marks"));
let a=new Student(name,marks);
console.log(`${a.name}'s Grade: ${a.getGrade()}`);
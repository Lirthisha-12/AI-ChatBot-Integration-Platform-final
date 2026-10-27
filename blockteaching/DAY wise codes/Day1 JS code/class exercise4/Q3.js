class Employee{
    constructor(name,basicSalary,bonus){
        this.name=name;
        this.basicSalary=basicSalary;
        this.bonus=bonus;
    }
    getTotalSalary(){
        return (this.basicSalary+this.bonus);
    }
}

let prompt=require("prompt-sync")();
let name=prompt("Enter name");
let basicSalary=parseInt(prompt("Enter basic salary"));
let bonus=parseInt(prompt("Enter bonus"));
let a=new Employee(name,basicSalary,bonus);
console.log(`${name}'s Total Salary: ${a.getTotalSalary()}`);
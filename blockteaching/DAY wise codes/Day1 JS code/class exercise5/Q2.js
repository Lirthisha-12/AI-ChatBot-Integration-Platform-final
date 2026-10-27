const employeeTemplate={
    name:"",
    designation:"",
    salary:0,
    getDetails:function(){
        return `${this.name},${this.designation},Salary:${this.salary}`;
    }
};
const emp1=Object.create(employeeTemplate);
emp1.name="Aman";
emp1.designation="Frontend Developer";
emp1.salary=45000;
const emp2=Object.create(employeeTemplate);
emp2.name="Priya";
emp2.designation="Backend Developer";
emp2.salary=50000;
console.log(emp1.getDetails()); 
console.log(emp2.getDetails())

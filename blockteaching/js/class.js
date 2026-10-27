/*
class Person{
    pername;
    perage;
    perphone;
    constructor(pername="Lir",perage=18,perphone=9876){//default constructor
        this.pername=pername;
        this.perage=perage;
        this.perphone=perphone;
    }
}
const p=new Person();
console.log(p.pername);
console.log(p.perage);
console.log(p.perphone);
//another

class Person{
    pername;
    perage;
    perphone;
    constructor(){//this is also default
    }
}
const p=new Person();
console.log(p.pername);
console.log(p.perage);
console.log(p.perphone);

//parameterised constructor
class Person{
    pername;
    perage;
    perphone;
    constructor(pername,perage,perphone){//default constructor
        this.pername=pername;
        this.perage=perage;
        this.perphone=perphone;
    }
}
const p=new Person("lir",18,9873);
console.log(p.pername);
console.log(p.perage);
console.log(p.perphone);
*/
// parameterised constructor in user input
class Person{
    pername;
    perage;
    perphone;
    constructor(pername,perage,perphone){//default constructor
        this.pername=pername;
        this.perage=perage;
        this.perphone=perphone;
    }
}
const prompt=require("prompt-sync")();
let name=prompt("Enter name");
let age=prompt("Enter age");
let phone=prompt("Enter phone");
const p=new Person(name,age,phone);
console.log(p.pername);
console.log(p.perage);
console.log(p.perphone);
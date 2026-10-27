//bind method
// const person={
// firstname:"lir",
// lastname:"sha"
// }
// function data(){
//     console.log(this.firstname+" "+this.lastname);
// }
// const fetch=data.bind(person);
// fetch();


//apply method
const person={
firstname:"lir",
lastname:"sha"
}
function data(a,b){
    console.log(this.firstname+" "+this.lastname+" "+a+" "+b);
}
data.apply(person,["hello","how"]);


/*
//reference error handling
try{
function add(){
    let a=10;
    let b=20;
    console.log(a);
}
add();
console.log(b);
}
catch(err){
    console.log(err.message);
}
finally{
    console.log("The process is done");
}

//type error  handling
try{
    let a=10;
    console.log(a.toUpperCase());
}
catch(err){
    console.log(err.message);
}
finally{
    console.log("The process is done");
}
*/
//syntax error handling
try{
    let let=30;
    console.log(let);
}
catch(err){
    console.log(err.message);
}
finally{
    console.log("The process is done");
}
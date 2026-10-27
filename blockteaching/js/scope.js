/*
//global and local scope
{
    let check="Local 1";
    const check1="Local 2";
    var check2="global";
    console.log(check2);
    console.log(check1);
    console.log(check);
}
console.log(check2);
console.log(check1);
console.log(check);
*/
// Lexical scope
function outer(){
    let data=10;
    function inner(){
        let newdata=14;
        console.log(data);
    }
    inner();
    console.log(newdata);
}
outer();

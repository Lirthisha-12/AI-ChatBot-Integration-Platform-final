//is and else control statemets(checking password length)
const pwd=87263637;
if(pwd.length>8){
    console.log("Create a strong password");
}
else{
    console.log("Password accepted.");
}
//else if control statements(ticket)
let age=20;
if(age<5){
    console.log("Free ticket");
}
else if(age>=5 && age<=12){
    console.log("Chile ticket=$5");
}
else if(age>=13 && age<=60){
    console.log("Adult ticket=$10");
}
else{
    console.log("Senior ticket=$7");
}
//switch control statement(vending machine selection)
let choice=2;
switch(choice){
    case 1:
        console.log("Coke");
        break;
    case 2:
        console.log("Pepsi");
        break;
    case 3:
        console.log("Water");
        break;
    case 4:
        console.log("Juice");
        break;
    default:
        console.log("Invalid choice");
        break;

}

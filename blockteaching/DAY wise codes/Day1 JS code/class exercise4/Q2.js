class Bill{
    constructor(name,price,quantity){
        this.name=name;
        this.price=price;
        this.quantity=quantity;
    }
    billamt(){
        return (this.price*this.quantity);
    }
}
let prompt=require("prompt-sync")();
let name=prompt("Enter name");
let price=prompt("Enter price");
let quantity=prompt("Enter quantity");
const obj=new Bill(name,price,quantity);
console.log(`Total bill for ${obj.name}: ${obj.billamt(price,quantity)}`);

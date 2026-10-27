

//Q1

// let prompt=require("prompt-sync")();
// const productTemplate={
//     name:"",
//     price:0,
//     quantity:0,
//     totalAmount(){
//         return this.price*this.quantity;
//     },
//     printBill(){
//         console.log(`Product:${this.name}`);
//         console.log(`Total Bill:${this.totalAmount()}`);
//     }
// };
// const product=Object.create(productTemplate);
// product.name=prompt("Enter name of product");
// product.price=parseInt(prompt("Enter price"));
// product.quantity=parseInt(prompt("Enter quantity"));
// product.printBill();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Q2

let prompt = require("prompt-sync")();
let n = parseInt(prompt("Enter number of items: "));
const discountPercent = 10;
function calculateDiscount(discount, price, quantity) {
  let total = price * quantity;
  return total - (total * discount) / 100;
}
let maxBill = -Infinity;
let maxItem = "";
for (let i = 0; i < n; i++) {
  console.log(`\nItem ${i + 1} details:`);
  let name = prompt("Enter item name: ");
  let price = parseFloat(prompt("Enter item price: "));
  let qty = parseInt(prompt("Enter item quantity: "));

  let boundCalc = calculateDiscount.bind(null, discountPercent);
  let discountedBill = boundCalc(price, qty);

  if (discountedBill > maxBill) {
    maxBill = discountedBill;
    maxItem = name;
  }
}
console.log(`\n${maxItem} has the highest discounted bill: ${maxBill}`);

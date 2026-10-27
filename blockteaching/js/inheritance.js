/*
//single inheritance
class Parent{
asset;
money;
house;
constructor(asset,money,house){
    this.asset=asset;
    this.money=money;
    this.house=house;
}
}
class Child extends Parent{
bike;
constructor(asset,money,house,bike){
    super(asset,money,house);
    this.bike=bike;
}
}
let c=new Child("land",100000,"villa","KTM");
console.log(c.asset,c.house,c.money,c.bike);

//single inheritance with method (method overriding)
class Parent{
greet(){
    console.log("This is parent method")
}
}
class Child extends Parent{
greet(){
    console.log("This is child method");
}
}
let c=new Child();
console.log(c.greet());
*/
//with super keyword-to prevent method overriding
class Parent{
greet(){
    console.log("This is parent method")
}
}
class Child extends Parent{
greet(){
    super.greet();
    console.log("This is child method");
}
}
let c=new Child();
console.log(c.greet());


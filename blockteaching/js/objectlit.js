/*
//object literal
let person={
    name:"Lirthisha",
    age:18,
    place:"cbe"
}
console.log(person.name);

//nested object literal
let person1={
    name:"Saran",
    age:15,
    place:{
        village:"thenpathy",
        taluk:"Sirkali",
        pincode:609111
    }
}
console.log(person1.name);
console.log(person1.place.taluk);
//create an object comapny with companyName,loaction(nested object with city and country) and employees
let company={
    companyName:"TCS",
    location:{
        city:"Chennai",
        country:"India"
    },
    employees:"Ruby"
}
console.log(company.location.city);

//destruturing object literal
let person={
    pname:"Lirthi",
    page:18,
    pcity:"Chennai"
}
let{pname,...page}=person;
console.log(pname);
console.log(page)
*/
//task-extrcat book info -object destructuring
let book={
    bookname:"the count of monte cristo",
    parts:10,
    bauthor:"alexander dumas"
}
let {bookname,bauthor}=book;
console.log(bookname);
console.log(bauthor);
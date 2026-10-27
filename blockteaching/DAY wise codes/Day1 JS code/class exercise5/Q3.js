function calculateFare(distance,rate,extraCharges){
    let baseFare=distance*rate+extraCharges;
    let totalFare=baseFare+(baseFare*this.tax);
    return totalFare;
}
const driver1={name:"Kiran",tax:0.05};
const driver2={name:"Sneha",tax:0.12};
const args=[10,12,30];

const fare1 = calculateFare.apply(driver1, args);
const fare2 = calculateFare.apply(driver2, args);
console.log(`${driver1.name}'s Total Fare: ₹${fare1.toFixed(2)}`); // ₹186.90
console.log(`${driver2.name}'s Total Fare: ₹${fare2.toFixed(2)}`); // ₹201.60


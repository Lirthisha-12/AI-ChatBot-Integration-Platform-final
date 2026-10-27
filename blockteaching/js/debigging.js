const arr=[10,80,3,58,9];
let min=arr[0];
for(let num of arr){
    if(num<min){
        min=num;
    }
}
console.log(`Minimum Number:${min}`);
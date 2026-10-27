const arr1 = [12,13,45,65]
let max=arr1[0];
for(let i=0;i<=arr1.length;i++){
	if(arr1[i]>max){
		max=arr1[i];
	}
}
console.log(`Maximum value in array = ${max}`);


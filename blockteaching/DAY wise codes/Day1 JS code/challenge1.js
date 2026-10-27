//Q1

// process.stdin.on('data',celsius=>{
//     let cel=parseInt(celsius);
//     let fahr=(cel*9/5)+32;
//     console.log(`${cel} degree celsius is equal to ${fahr} degree fahrenheit`)
//     process.exit();
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Q2

function countVowels(str){
    let vowels="aeiouAEIOU";
    let count=0;
    for(let char of str){
        if(vowels.includes(char)){
            count++;
        }
    }
    console.log(count);
}
let prompt=require("prompt-sync")();
let input=prompt("Enter word");
countVowels(input);
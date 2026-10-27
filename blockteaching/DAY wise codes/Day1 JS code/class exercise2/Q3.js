process.stdin.on('data',number=>{
    let a=parseInt(number);
    let temp=a;
    let sum=0;
    let len=a.toString().length;
    while(temp>0){
        let digit=temp%10;
        sum=sum+(digit**len);
        temp=Math.floor(temp/10);
    }
    if(sum===a){
        console.log("It is an Armstrong number");
    }
    else{
        console.log("It is not Armstrong number");
    }
    process.exit();
});
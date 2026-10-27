process.stdin.on('data',number=>{
    let no=parseInt(number);
    let sum=0;
    for(let i=1;i<=no;i++){
        sum+=i;
    }
    console.log("Sum is,",sum);
process.exit();
});



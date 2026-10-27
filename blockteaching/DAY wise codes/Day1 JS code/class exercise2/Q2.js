process.stdin.on('data',number=>{
    let no=parseInt(number);
    if(no%2===0){
        console.log("Even");
    }
    else{
        console.log("Odd");
    }
    process.exit();
});
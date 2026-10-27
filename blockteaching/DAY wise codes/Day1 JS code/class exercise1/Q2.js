process.stdin.on('data',data=>{
    let a=parseInt(data);
    console.log(a+5);
process.exit();
});
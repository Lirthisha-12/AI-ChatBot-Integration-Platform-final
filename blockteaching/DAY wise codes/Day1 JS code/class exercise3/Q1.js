process.stdin.on('data', marks => {
let score=parseInt(marks);
if(score<40){
    console.log("You fail the exam.");
}
else{
    console.log("You pass the exam.");
}
process.exit();
});
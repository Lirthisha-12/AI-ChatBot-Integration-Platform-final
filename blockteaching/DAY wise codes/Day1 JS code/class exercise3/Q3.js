process.stdin.on('data',cash=>{
function minNotes(N) {
    let n100 = parseInt(N/ 100);
    N = N % 100;

    let n50 = parseInt(N / 50);
    N = N % 50;

    let n10 = parseInt(N / 10);
    N = N % 10;

    let n5 = parseInt(N / 5);
    N = N % 5;

    let n2 = parseInt(N / 2);
    N = N % 2;

    let n1 = N;

    return n100 + n50 + n10 + n5 + n2 + n1;
}
let N=parseInt(cash);
console.log(minNotes(cash))
process.exit();
});

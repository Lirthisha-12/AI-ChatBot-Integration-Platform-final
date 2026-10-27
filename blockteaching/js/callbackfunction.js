//call back function
const share=(value,sharedata)=>{
    console.log("The number",value);
    sharedata();
}
const process=()=>{
    console.log("Call back function");
}
share(12,process);
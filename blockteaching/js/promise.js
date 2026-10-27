const mypromise=new Promise((successful,failure)=>{
    let data=true;
    if(data){
        successful();
    }
    else{
        failure();
    }
}).then(()=>console.log("Completed"))

.catch(()=>console.log("Failed"));
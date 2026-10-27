const vehicleTemplate={
    start:function(){
        console.log("car is starting...");
    },
    stop:function(){
        console.log("car is stopping");
    }
};
const car=Object.create(vehicleTemplate);
car.start();
car.stop();

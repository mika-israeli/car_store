const fs = require('fs'); 
const parse = require('csv-parser');
const result = [];
const filterdCar=[]

fs.createReadStream(__dirname+'/cars.csv').pipe(parse()).on('data',(data)=> result.push(data)).on('end',(cars)=>{ 
    result.forEach((car) => {
        car.image = "http://dummyimage.com/250x250.png/ff4444/ffffff"
        car.description= "Nondisp fx of lateral cuneiform of unspecified foot, sequela"
    })
    for(let i = 0;i<result.length; i+=250){
        filterdCar.push(result[i])
    }
});

module.exports = filterdCar
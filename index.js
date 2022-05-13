const fs = require('fs');
const { resolve } = require('path');
const sa = require("superagent");

//////////////we will create a new file

const newfilePro = file => {
    /////////it will return a function 
    return new Promise((resolve,reject) => {
        /////////now here inside this callback function we will do all the asynchronous work
        fs.readFile(file,(err , data) => {

            if(err){
                /////////reject is func which is used whrn our promise is not fullfilled (if error comes)
                reject("sorry error arised!!");
            }
    ///////////////////resolve is a function which is used to send the data to then function in case of successful promise    
            resolve(data);
        })
       
    })
}


const writeFilePro = (file,data) => {
    return new Promise((resolve,reject) => {
        fs.writeFile(file,data,err => {
            if(err) return reject("err occured");
            resolve("success");
        })
    })
}


///////////creating a function with async await to consume the promises
const getDogPic = async () => {
    try{
    const data  = await newfilePro(__dirname+'/dog.txt');
    const res = await sa.get("https://dog.ceo/api/breed/"+data+"/images/random");
    console.log(res.body.message);
    await writeFilePro("dog-img.txt",res.body.message);
    console.log("saved successfully");
    return "GOT THE PIC";

}catch(err){
    console.log(err.message);
    throw(err);
};
};

//////////calling the function:
(async()=>{
    try{
    console.log("ready to get the pic");
const x = await getDogPic();
console.log(x);
    }catch(err){
        console.log(err.message);
    }

})();


/*   
newfilePro(__dirname+'/dog.txt').
then(data => {

    return sa.get("https://dog.ceo/api/breed/"+data+"/images/random")}).


    then(result => {
         console.log(result.body.message);
         return writeFilePro("dog-img.txt",result.body.message);
    }).
    
    
    then(()=>{
        console.log("saved successfully");
    }).
    
    catch(err =>{
            console.log(err.message);
          });

          */



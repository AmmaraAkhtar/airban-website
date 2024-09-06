const mongoose=require("mongoose");
const List=require("../models/allData");
const initData=require("./listes");

main().then(()=>{
    console.log("connection sucessfully");
  })
.catch((err)=>{
 console.log(err);
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }


const initDB=async()=>{
    //await List.deleteMany({});
    await List.insertMany(initData.data);
    console.log("data was initalized");
}
initDB();


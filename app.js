const express=require("express");
const app=express();
const mongoose=require("mongoose");
const  path=require('path');
const List=require("./models/allData");
const methodOverride = require('method-override');
const engine = require('ejs-mate');

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


app.set("view-engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.get("/list",async(req,res)=>{
      
       let data=await List.find({});
       res.render("listing/index.ejs",{data});


}); 
app.get("/show/:id",async(req,res)=>{
 let {id}=req.params;

 let data= await List.findById(id);
        res.render("listing/show.ejs",{data});
});

app.get("/new",(req,res)=>{
          res.render("listing/new.ejs");
});
app.post("/create",async (req,res)=>{
  let {title,description,price,location,country}=req.body;
  let list1=new List ({
      title:title,
      description:description,
      // image:image,
      price:price,
      location:location,
      country:country,

  });
  await list1.save();
  console.log(list1);
  res.redirect("/list");
});


app.get("/edit/:id", async(req,res)=>{
    let {id}=req.params;
    
 let data= await List.findById(id);
    res.render("listing/edit.ejs",{data});
});

app.patch("/edit/:id",async(req,res)=>{
    let {id}=req.params;
    let {title:til,description:des,price:pri,location:loc,country:cou}=req.body;
  // await List.findByIdAndUpdate(id,{title:til},{description:des},{price:pri},{location:loc},{country:cou});
  await List.findByIdAndUpdate(id,{price:pri});
  await List.findByIdAndUpdate(id,{title:til});
  await List.findByIdAndUpdate(id,{description:des});
  await List.findByIdAndUpdate(id,{location:loc});
  await List.findByIdAndUpdate(id,{country:cou});
   res.redirect("/list");
});
app.delete("/delete/:id",async(req,res)=>{
  let {id}=req.params;
  await List.findByIdAndDelete(id);
  res.redirect("/list");

});
let port=3000;
app.listen(port,()=>{
        console.log(`app is listening at ${port}`);
});
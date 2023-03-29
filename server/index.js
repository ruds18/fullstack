const express = require("express");
const mongoose = require("mongoose");
const app = express();
const {config} = require("dotenv")
const cors = require('cors')
const foodModel = require('./models/food')

// Middleware
app.use(express.json());
config();
app.use(cors());

// Server
mongoose.connect(process.env.DBKEY,{
    useNewURLParser:true
})

//Routes
app.post('/insert', async(req,res)=>{

  const foodName = req.body.foodName;
  const days = req.body.days
  const food = new foodModel({ foodName : foodName, daysSinceIAte: days });

  try{
      await food.save();
       res.send({message:"inserted data"}).redirect("/");
  }
  catch(error){
    res.status(404).send("Missing fields !");
    console.log(error);
  }
})

app.get('/read' , async(req,res)=>{
    const allData =  await foodModel.find({});
    res.send(allData);
})



app.delete('/delete/:id' , async(req,res)=>{
   const id = req.params.id;
   await foodModel.findByIdAndRemove(id).exec();

   res.status(200).send("Deleted!");
})


app.put('/update' , async(req,res)=>{
  const foodName = req.body.newFoodName;
  const id = req.body.id;

  console.log(foodName);

  try{
   const updatedFood =  await foodModel.findById(id);

   updatedFood.foodName = foodName;
   updatedFood.save();
  }
  catch(error){
    console.log(error);
  }
})


app.listen(process.env.PORT , ()=>{
    console.log(`server running at http://localhost:${process.env.PORT}`);
})
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();


const app = express();


app.get("/",(req,res) => {
     res.status(200).json({message:"response"})
})

app.listen(process.env.PORT || 3000,() => {
    console.log("Server is running") 
})

module.exports = app;
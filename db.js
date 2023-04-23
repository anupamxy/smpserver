const mongoose =require('mongoose');
const mongoURI="mongodb+srv://anupam2k321:2k321anupam@cluster0.p5kouvn.mongodb.net/test"
mongoose.set('strictQuery', true);
const connectToMongo=()=>

{
    mongoose.connect(mongoURI,()=>{
        console.log("All fine");

    })
}
module.exports=connectToMongo;
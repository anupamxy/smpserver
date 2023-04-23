const connectToMongo=require('./db');
var cors=require('cors')
connectToMongo();
const express = require('express')
const app = express()
const port = 8001;
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.use("/",(req,res)=>{
  console.log("home route");
  res.send("home route");
})
app.listen(port, () => {
  console.log(`inotebookbackend listening on port http://localhost:${port}`)
})
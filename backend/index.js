const express = require('express'); 
const cors = require('cors');
const formRoutes = require('./routes/fomrs');
const { connection } = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/forms', formRoutes);



app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log(`server is running at ${PORT}`);
    } catch (error) {
        console.log(error)
    }
})
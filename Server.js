const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
require('dotenv').config()
const mongoose = require('mongoose')
const taskRoutes = require('./Routes/taskRoutes')
const cors = require('cors')

//Middle-Ware
app.use((req,res,next)=>{
    console.log('Path',req.path,'Method',req.method);
    next() //To go nect to listen in 4000, Or else it stops here    
})

app.use(cors());

//DB connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Mongo DB atlas connnectrd successfully and Listening ',process.env.PORT)
    })
}).catch((er)=>console.log('Error',er))

app.use(express.json())

// Base Route
app.use('/api/orders',taskRoutes);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// List Server //////////////////////////////////////////// Foods //////////////////////////////

// Define routes
app.get('/Foods', (req, res) => {
    // Serve Location JSON file
    res.sendFile(__dirname + '/Foods.json');
});

app.get('/Restaurant', (req, res) => {
    // Serve Restaurant JSON file
    res.sendFile(__dirname + '/location.json');
}); 

app.get('/Food/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(path.join(__dirname, 'Foods.json'), (err, data) => {
        if (err) {
            console.error('Error reading Foods.json file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const foods = JSON.parse(data);
        const food = foods.find(food => food.id === id);

        if (!food) {
            return res.status(404).json({ error: 'Food not found' });
        }

        res.json(food);
    });
});

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const restaurantRoutes = require('./routes/restaurants');
const userRoutes = require('./routes/users');

const app = express();

// Check for 'users.json' and create if not exists
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'users.json'); // Adjust the directory if necessary

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
    console.log(`Created an empty users.json file at ${filePath}`);
} // This closing bracket was missing

app.use(bodyParser.json());
app.use('/restaurants', restaurantRoutes);
app.use('/users', userRoutes);

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));

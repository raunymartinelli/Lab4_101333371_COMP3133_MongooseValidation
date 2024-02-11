// routes/users.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
const {v4: uuidv4} = require('uuid')
const User = require('../models/User')

// Helper function to read users data from file
const readUsersDataFromFile = () => {
    try {
        const usersData = fs.readFileSync(path.join(__dirname, '../users.json'), 'utf8');
        return JSON.parse(usersData);
    } catch (error) {
        console.error('Error reading or parsing users.json:', error);
        throw error; // Rethrow the error to be caught by the calling function
    }
};

// GET all users
router.get('/', (req, res) => {
    try {
        const users = readUsersDataFromFile();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET single user by ID
router.get('/:id', (req, res) => {
    try {
        const userId = req.params.id;
        const users = readUsersDataFromFile();
        const user = users.find(user => user.id === userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST a new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save(); // Mongoose applies schema validation here
        res.status(201).json(newUser);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        console.error('POST /users error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


router.put('/:id', (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;
        const users = readUsersDataFromFile();
        const index = users.findIndex(user => user.id === userId);
        if (index !== -1) {
            // Preserve the existing user's `id` and overwrite other properties.
            users[index] = { ...users[index], ...updatedUserData };
            fs.writeFileSync(path.join(__dirname, '../users.json'), JSON.stringify(users, null, 2));
            res.json({ message: 'User updated successfully', user: users[index] });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// DELETE a user by ID
router.delete('/:id', (req, res) => {
    try {
        const userId = req.params.id;
        const users = readUsersDataFromFile();
        const filteredUsers = users.filter(user => user.id !== userId);
        fs.writeFileSync(path.join(__dirname, '../users.json'), JSON.stringify(filteredUsers, null, 2));
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;

const express = require('express');
const app = express();
const Restaurant = require('../models/Restaurant');

// Get all restaurants
// http://localhost:3000/restaurants
app.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all restaurant details by cuisine
// http://localhost:3000/restaurants/cuisine/Japanese (or /cuisine/Bakery, /cuisine/Italian)
app.get('/cuisine/:cuisine', async (req, res) => {
    try {
        const { cuisine } = req.params;
        const restaurants = await Restaurant.find({ cuisine: cuisine });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get restaurant details, sorted by restaurant_id
app.get('/sort', async (req, res) => {
    try {
        const sortQuery = req.query.sortBy === 'DESC' ? '-restaurant_id' : 'restaurant_id';
        const restaurants = await Restaurant.find({}, 'id cuisines name city restaurant_id').sort(sortQuery);
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get restaurants where cuisine is 'Delicatessen' and city is not 'Brooklyn', sorted by name
app.get('/Delicatessen', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({
            cuisine: 'Delicatessen',
            city: { $ne: 'Brooklyn' }
        }, 'cuisines name city -_id').sort('name');
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/', async (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name,
        cuisine: req.body.cuisine,
        city: req.body.city,
        restaurant_id: req.body.restaurant_id,
        address: req.body.address // Ensure that the address object structure matches the request body
    });

    try {
        const newRestaurant = await restaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get a single restaurant by id
app.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ message: 'Cannot find restaurant' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/:id', async (req, res) => {
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Cannot find restaurant' });
        }

        // Update fields that are provided in the request body
        restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json(restaurant);
    } catch (error) {
        // If the id is not valid, it will throw a CastError
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid restaurant ID format' });
        }
        res.status(500).json({ message: error.message });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Restaurant.deleteOne({ _id: id });

        if (result.deletedCount === 1) {
            res.json({ message: 'Deleted Restaurant' });
        } else {
            res.status(404).json({ message: 'Cannot find restaurant' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = app;

// db.Restaurants.insertMany(
//     [{
//         "address": {
//             "building": "1008",
//             "street": "Morris Park Ave",
//             "zipcode": "10462"
//         },
//         "city": "Bronx",
//         "cuisine": "Bakery",
//         "name": "Morris Park Bake Shop",
//         "restaurant_id": "30075445"
//     },
//         {
//             "address": {
//                 "street": "Thai Son Street",
//                 "zipcode": null
//             },
//             "city": "Manhattan",
//             "cuisine": "Vietnamese",
//             "name": "Pho Me Long Time",
//             "restaurant_id": "30075455"
//         },
//         {
//             "address": {
//                 "building": "253",
//                 "street": "East 167 Street",
//                 "zipcode": null
//             },
//             "city": "Bronx",
//             "cuisine": "Chicken",
//             "name": "Mom's Fried Chicken",
//             "restaurant_id": "40382900"
//         },
//         {
//             "address": {
//                 "building": "120",
//                 "street": "East 56 Street",
//                 "zipcode": "19800"
//             },
//             "city": "Mahattan",
//             "cuisine": "Italian",
//             "name": "Montebello Restaurant",
//             "restaurant_id": "40397082"
//         },
//         {
//             "address": {
//                 "building": "195",
//                 "street": "Soprano Street",
//                 "zipcode": "17500"
//             },
//             "city": "Staten Island",
//             "cuisine": "Hamburgers",
//             "name": "Joeys Burgers",
//             "restaurant_id": "40397555"
//         },
//         {
//             "address": {
//                 "building": "200",
//                 "street": "Queens Boulevard",
//                 "zipcode": "19700"
//             },
//             "city": "Queens",
//             "cuisine": "American",
//             "name": "Brunos on the Boulevard",
//             "restaurant_id": "40397678"
//         },
//         {
//             "address": {
//                 "building": "555",
//                 "street": "Sushi Street",
//                 "zipcode": "17700"
//             },
//             "city": "Brooklyn",
//             "cuisine": "Japanese",
//             "name": "Iron Chef House",
//             "restaurant_id": "40397699"
//         },
//         {
//             "address": {
//                 "building": "555",
//                 "street": "Fontana Street",
//                 "zipcode": null
//             },
//             "city": "Brooklyn",
//             "cuisine": "Japanese",
//             "name": "Wasabi Sushi",
//             "restaurant_id": "40398000"
//         },
//         {
//             "address": {
//                 "building": "900",
//                 "street": "Goodfellas Street",
//                 "zipcode": "17788"
//             },
//             "city": "Brooklyn",
//             "cuisine": "Delicatessen",
//             "name": "Sal's Deli",
//             "restaurant_id": "40898000"
//         },
//         {
//             "address": {
//                 "building": "909",
//                 "street": "44 Gangster Way",
//                 "zipcode": "17988"
//             },
//             "city": "Queens",
//             "cuisine": "Delicatessen",
//             "name": "Big Tony's Sandwich Buffet",
//             "restaurant_id": "40898554"
//         },
//         {
//             "address": {
//                 "building": "1201",
//                 "street": "121 Canolli Way",
//                 "zipcode": "17989"
//             },
//             "city": "Queens",
//             "cuisine": "Delicatessen",
//             "name": "The Godfather Panini Express",
//             "restaurant_id": "40898554"
//         }]
// )

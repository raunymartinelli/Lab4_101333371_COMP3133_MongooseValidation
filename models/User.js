const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema({
    lat: String,
    lng: String
});

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: [true, 'Please enter street']
    },
    suite: {
        type: String,
        required: [true, 'Please enter suite']
    },
    city: {
        type: String,
        required: [true, 'Please enter city name'],
        match: /^[a-zA-Z\s]+$/
    },
    zipcode: {
        type: String,
        required: [true, 'Please enter zipcode'],
        match: /^\d{5}-\d{4}$/
    },
    geo: geoSchema
});

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter company name']
    },
    catchPhrase: String,
    bs: String
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    username: {
        type: String,
        required: [true, 'Please enter username'],
        minLength: [4, 'Username must be at least 4 characters long']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        validate: {
            validator: function (v) {
                return /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    address: addressSchema,
    phone: {
        type: String,
        required: [true, 'Please enter phone number'],
        validate: {
            validator: function(v) {
                return /^1-\d{3}-\d{3}-\d{4}$/.test(v);
            },
            message: 'Please enter a valid phone number with the format 1-XXX-XXX-XXXX'
        }
    },
    website: {
        type: String,
        required: [true, 'Please enter website'],
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/\S+$/.test(v);
            },
            message: 'Please enter a valid URL with http or https'
        }
    },
    company: companySchema
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        // required: [true, "NAME IS REQUIRED!"],
        min: [10, "MINIMUM 10 CHARACTERS ARE REQUIRED!"]
    },
    email: {
        type: String,
        index: false,
        // required: true,
        unique: false, 
        // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    org_id: {
        type: String,
    },
    customer_id: {
        type: String,
        // unique: true,
    },
    pass: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        // required: [true, "ROLE IS REQUIRED!"],
        max: [10, "MAXIMUM 10 CHARACTERS ARE REQUIRED!"]
    },
}, { versionKey: false });

module.exports = mongoose.model("User", userSchema);
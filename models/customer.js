const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        // required: [true, "NAME IS REQUIRED!"],
        // min: [10, "MINIMUM 10 CHARACTERS ARE REQUIRED!"]
    },
    permission: {
        type: Array,
        // required: true
    }
});

module.exports = mongoose.model("Customer", customerSchema);
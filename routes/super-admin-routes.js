const express = require("express");
const mongoose = require("mongoose");
// const body_parser = require("body-parser");
const super_admin_router = express.Router();

//////////////////////// DATABASE CONNECTION ////////////////////////
// making a connection to our MongoDB server
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if(error) console.log(`ERROR: ${error}`);
    else console.log("CONNTECTED TO THE DATABASE!");
  }
);
const db = mongoose.connection;
db.on("error", (err) => console.log(err));

///////////////////////// MODELS //////////////////////////////////////
const user = require("../models/user");
const customer = require("../models/customer");
const complaint = require("../models/complaint");
//////////////////////////////////////////////////////////////////////

///////////////////////// ROUTES ///////////////////////////////////////
// GET ROUTES

// super_admin_router.get("/api/login", (req, res, next) => {
//     user.findOne({role: "superadmin"}).exec((err, user) => {
//         if(err) return next(err);
//         else res.json(user);
//     });
// });

super_admin_router.get("/api/customers", (req, res, next) => {
    customer.find({}, (err, data) => {
        if(err) return next(err);
        // else console.log(data);
        else res.send(data);
    });
});

super_admin_router.get("/api/superadmin/profile", (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    user.findById(id, (err, data) => {
        if(err) return next(err);
        else res.json(data);
    });
});

// super_admin_router.get("/api/complaints", (req, res, next) => {
//     complaint.find({}, (err, complaints) => {
//         if(err) console.log("ERROR");
//         // else console.log(typeof complaints);
//     });
// });

// super_admin_router.post("/api/login", (req, res, next) => {
//     user.findOne({role: "superadmin"}).exec(function (err, user_details) {
//         if(err) return next(err);
//         else {
//             const email = req.body.email;
//             const password = req.body.password;
//             if(user_details.email == email && user_details.password == password) {
//                 res.json(1);
//             } else res.json(0); 
//         }
//     });
// });

// POST ROUTES
super_admin_router.post("/api/login", (req, res, next) => {
    const email = req.body.email;
    const pass = req.body.pass;
    // console.log(email, pass);
    user.findOne({email: email, pass: pass}, "role").exec((err, user) => {
        if(err) return next(err);
        // console.log(user);
        else res.json(user);
    });
});

super_admin_router.post("/api/addCustomer", (req, res, next) => {
    const name = req.body.name;
    const permissions = req.body.permissions;
    // console.log(name, permissions);
    customer.create({name: name, permissions: permissions}, (err, data) => {
        if(err) return next(err);
        else {
            res.sendStatus(200);
            // console.log(data);
        }
    });
});

super_admin_router.post("/api/add_admin", (req, res, next) => {
    const id = req.body.customer_id;
    // console.log(req.body);
    // console.log(id);

    const obj = {
        name: req.body.name,
        email: req.body.email,
        customer_id: req.body.customer_id,
        pass: req.body.pass,
        role: "admin"
    };

    user.create(obj, (err, data) => {
        if(err) return next(err);
        else res.sendStatus(200);
    });
});


// DELETE ROUTES
super_admin_router.delete("/api/del_customer", (req, res, next) => {
    // console.log(req.body);
    customer.deleteOne({_id: req.body.id}, (err) => {
        if(err) return next(err);
        else res.json(1);
    })
})

// PUT ROUTES
super_admin_router.put("/api/superadminsettings", (req, res, next) => {
    console.log(req.body.name, req.body.email);
    user.findOneAndUpdate({role: "superadmin"}, {name: req.body.name, email: req.body.email}, (err, result) => {
        if(err) return next(err);
        // else res.send(1);
    });
});


module.exports = super_admin_router;


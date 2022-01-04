const e = require("express");
const express = require("express");
const mongoose = require("mongoose");
const admin_router = express.Router();

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
const complaint = require("../models/complaint");
const user = require("../models/user");
//////////////////////////////////////////////////////////////////////

/////////////////////////// ROUTES //////////////////////////////////

// GET ROUTES
admin_router.get('/api/users', (req, res, next) => {
  user.find({}, (err, users) => {
    if(err) console.log(err);
    else {
      users.filter(user => user.role != "admin" || user.role != "superadmin");
      res.json(users);
    }
  });
});

admin_router.get("/api/view-user", (req, res, next) => {
  user.findOne({id: req.params.id}, (err, user) => {
    if(err) console.log(err);
    else res.json(user);
  });
});


// POST ROUTES
admin_router.post("/api/add-user", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const role = req.body.role;
  const password = req.body.password;

  const user_obj = {
    name: name,
    email: email,
    role: role,
    password: password
  };

  user.create(user_obj, (err, data) => {
    if(err) return next(err);
    else {
      // res.json(data);
      console.log(data);
    }
  });
  
});

// PUT ROUTES
admin_router.put("/api/update", (req, res, next) => {
  user.findOneAndUpdate({name: req.body.name}, (err, result) => {
    if(err) return next(err);
    // else res.json(result);
    else console.log(result);
  });
});

// DELETE ROUTES
admin_router.delete('/api/del_user', (req, res, next) => {
  user.deleteOne({_id: req.body.id}, (err) => {
    if(err) return next(err);
    else res.json(1);
  });
});

module.exports = admin_router;

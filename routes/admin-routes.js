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
      users = users.filter(user => user.role != "superadmin");
      res.json(users);
      // console.log(users);
    }
  });
});

admin_router.get("/api/view-user", (req, res, next) => {
  console.log(req.body.name)
  user.findOne({name: req.body.name}, (err, user) => {
    if(err) console.log(err);
    else res.json(user);
  });
});

admin_router.get("/api/complaints", (req, res, next) => {
  complaint.find({}, (err, complaints) => {
      if(err) console.log("ERROR");
      else res.json(complaints);
      // else console.log("Complaints: "+complaints);
  });
});

admin_router.get("/api/view-complaint", (req, res, next) => {
  console.log(req.body);
  complaint.findOne({_id: req.body._id}, (err, complaint) => {
    if(err) return next(err);
    else res.json(complaint);
    // else console.log(complaint);
  });
});

// POST ROUTES
admin_router.post("/api/add-user", (req, res, next) => {
  const org_id = req.body.orgID;
  const id = req.body.customer_id;

  const user_obj = {
    org_id: org_id,
    customer_id: id,
    name: "",
    email: "",
    role: "employee",
    pass: ""
  };
  
  // console.log(org_id);

  user.create(user_obj, (err, data) => {
    if(err) return next(err);
    else {
      res.sendStatus(200); 
      // console.log(data);
    }
  });
  
});

// PUT ROUTES
admin_router.put("/api/update", (req, res, next) => {
  console.log("id: "+req.params);
  user.findOneAndUpdate({id: req.body.id}, (err, result) => {
    if(err) return next(err);
    else res.json(result);
    // else console.log(result);
  });
});

// DELETE ROUTES
admin_router.delete('/api/del_user', (req, res, next) => {
  // console.log(req.body.id);
  user.deleteOne({_id: req.body.id}, (err) => {
    if(err) return next(err);
    else res.json(1);
  });
});

admin_router.delete('/api/del_complaint', (req, res, next) => {
  complaint.deleteOne({_id: req.body.id}, (err) => {
    if(err) return next(err);
    else res.sendStatus(200);
  });
});

module.exports = admin_router;

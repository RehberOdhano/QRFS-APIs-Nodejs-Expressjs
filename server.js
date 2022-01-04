require("dotenv").config();
const express = require("express");
// creating a database using the mongoose
const mongoose = require("mongoose");
const body_parser = require("body-parser");

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
db.on("error", err => console.log(err));
///////////////////////////////////////////////////////////////////////

//////////////////////// ROUTES //////////////////////////////////
const adminRoutes = require("./routes/admin-routes");
const superAdminRoutes = require("./routes/super-admin-routes");
/////////////////////////////////////////////////////////////////


const app = express();
// setting up the server to accept the JSON
app.use(express.json());

// MIDDLEWARE
app.use("/", adminRoutes);
app.use("/", superAdminRoutes);

// Body-parser middleware
app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json())


// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}...`);
});

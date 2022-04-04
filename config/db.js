const mongoose = require("mongoose");
require('dotenv/config');

mongoose.connect(process.env.dbconnect)
  .then(() => {
    console.log("connected to database successfully :)");
  })
  .catch(() => {
    console.log("connexion failed :( ");
  });

module.exports = mongoose;

const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DATABASE_CONNECTION).then((con) => {
    console.log(`Database connected with server: ${con.connection.host}`);
  });
};

module.exports = connectDatabase;

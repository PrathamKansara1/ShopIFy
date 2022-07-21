require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')
const path = require("path")

app.use(express.json({limit: "50mb"}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit: "100mb",extended: true}));
app.use(fileUpload({useTempFiles: true}));


// // Routes
const user = require('./routes/userRoute')
const product = require('./routes/productRoute');
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1",user);
app.use("/api/v1",product);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

app.use(errorMiddleware);

module.exports = app;
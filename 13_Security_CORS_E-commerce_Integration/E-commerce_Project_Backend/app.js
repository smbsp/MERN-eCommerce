
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// including env variables
dotenv.config();
const { PORT, DB_PASSWORD, DB_USER } = process.env;
/**********************connection to our DB********************************/
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gn4citi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// once 
mongoose.connect(dbURL)
    .then(function (connection) {
        console.log("connected to db");
    }).catch(err => console.log(err))

// with this your creating simple app -> api
const app = express();
const UserRouter = require("./src/routers/UserRouter");
const ProductRouter = require("./src/routers/ProductRouter");
const AuthRouter = require("./src/routers/AuthRouter");
const BookingRouter = require("./src/routers/BookingRouter");
const ReviewRouter = require("./src/routers/ReviewRouter");


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('x-api-secret-key', 'dsghfvsd123GH');
    next();
});


app.use(cors());


app.use(express.json());
app.use(cookieParser());

app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/booking", BookingRouter);
app.use("/api/review", ReviewRouter);

/******************handler functions ***************/
// 404 route not found
app.use(function cb(req, res) {
    // console.log("");
    // response 
    res.status(404).json({
        status: "failure",
        message: " route not found"
    })
});
// server -> run on a port 
app.listen(PORT, function () {
    console.log(` server is listening to port ${PORT}`);
})

/***
 * At code level -> prevent Repetiton -> Factory(controllers)
 * At file level -> structure to segregate the code  -> MVC
 * **/










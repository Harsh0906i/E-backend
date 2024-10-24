require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const Item = require('./models/Items');
const ItemRoute = require('./routes/Items');
app.use(express.json());

app.use(cors({
    origin: 'https://e-com-frontend-omega.vercel.app', // Adjust this to match your frontend URL
    methods: ['GET', 'POST','DELETE'], // Allow specific methods if needed
    credentials: true // If you're using cookies or authentication
}));
app.options('*', cors()); // Allow preflight requests for all routes

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', AuthRouter);
app.use('/api/item', ItemRoute);
main()
    .then(() => {
        console.log("success");
    }).catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(process.env.MONGOURI);
};


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.get('/', (req, res) => {
    res.send('working!');
});

app.listen('8080', () => {
    console.log('server is listening')
});
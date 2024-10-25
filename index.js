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

// 'https://e-com-frontend-omega.vercel.app'

app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
}));
app.options('*', cors());

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
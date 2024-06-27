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
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
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


async function Images() {
    const item1 = new Item({
        name: "Huawei",
        discountedPrice: 20000,
        regularPrice: 25000,
        category: 'mobile',
        storage: {
            RAM: 16,
            ROM: 128
        },
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D'
    })
    const item3 = new Item({
        name: "Huawei",
        discountedPrice: 17500,
        regularPrice: 20000,
        category: 'mobile',
        storage: {
            RAM: 8,
            ROM: 64
        },
        image: 'https://images.unsplash.com/photo-1627542557169-5ed71c66ed85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D'
    })
    const item4 = new Item({

        name: "samsung",
        discountedPrice: 17500,
        regularPrice: 20000,
        category: 'mobile',
        storage: {
            RAM: 8,
            ROM: 64
        },
        image: 'https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D'
    })
    const item5 = new Item({

        name: "samsung",
        discountedPrice: 30000,
        regularPrice: 45000,
        category: 'mobile',
        storage: {
            RAM: 16,
            ROM: 256
        },
        image: 'https://images.unsplash.com/photo-1548094891-c4ba474efd16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8'
    })
    const item6 = new Item({

        name: "Apple",
        discountedPrice: 30000,
        regularPrice: 45000,
        category: 'mobile',
        storage: {
            RAM: 8,
            ROM: 64
        },
        image: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxoQ2tNM0ZRQlUyc3x8ZW58MHx8fHx8'
    })
    const item7 = new Item({

        name: "Apple",
        discountedPrice: 45000,
        regularPrice: 55000,
        category: 'mobile',
        storage: {
            RAM: 16,
            ROM: 64
        },
        image: 'https://images.unsplash.com/photo-1551651653-c5186a1fbba2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTF8aENrTTNGUUJVMnN8fGVufDB8fHx8fA%3D%3D'
    })
    const item8 = new Item({

        name: "BlackBerry",
        discountedPrice: 35000,
        regularPrice: 45000,
        category: 'mobile',
        storage: {
            RAM: 16,
            ROM: 128
        },
        image: 'https://images.unsplash.com/photo-1553368047-78340407b97a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8aENrTTNGUUJVMnN8fGVufDB8fHx8fA%3D%3D'
    })
    const item9 = new Item({

        name: "BlackBerry",
        discountedPrice: 68500,
        regularPrice: 75000,
        category: 'mobile',
        storage: {
            RAM: 16,
            ROM: 256
        },
        image: 'https://images.unsplash.com/photo-1563341933-896ada1d6903?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTd8aENrTTNGUUJVMnN8fGVufDB8fHx8fA%3D%3D'
    })
    const item10 = new Item({

        name: "Vivo",
        discountedPrice: 8500,
        regularPrice: 10000,
        category: 'mobile',
        storage: {
            RAM: 8,
            ROM: 64
        },
        image: 'https://images.unsplash.com/photo-1519124080359-bfc4bb96f9aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D'
    })
    const item11 = new Item({

        name: "Vivo",
        discountedPrice: 18500,
        regularPrice: 20000,
        category: 'mobile',
        storage: {
            RAM: 12,
            ROM: 128
        },
        image: 'https://images.unsplash.com/photo-1579639853320-f4b53733960c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8'
    })
    const item12 = new Item({

        name: "Samsung",
        discountedPrice: 50000,
        regularPrice: 70000,
        category: 'Computer',
        storage: {
            RAM: 16,
            ROM: 512
        },
        image: 'https://images.unsplash.com/photo-1532529867795-3c83442c1e5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D'
    })
    const item13 = new Item({

        name: "Samsung",
        discountedPrice: 50000,
        regularPrice: 70000,
        category: 'Computer',
        storage: {
            RAM: 8,
            ROM: 512
        },
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    })
    const item14 = new Item({

        name: "Google",
        discountedPrice: 56000,
        regularPrice: 70000,
        category: 'Computer',
        storage: {
            RAM: 16,
            ROM: 512
        },
        image: 'https://images.unsplash.com/photo-1516905041604-7935af78f572?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8'
    })
    const item15 = new Item({

        name: "Google",
        discountedPrice: 60000,
        regularPrice: 75000,
        category: 'Computer',
        storage: {
            RAM: 16,
            ROM: 512
        },
        image: 'https://plus.unsplash.com/premium_photo-1700830193308-73775665bcb0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    })
    const item16 = new Item({

        name: "Apple",
        discountedPrice: 90000,
        regularPrice: 100000,
        category: 'Computer',
        storage: {
            RAM: 8,
            ROM: 512
        },
        image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNvbXB1dGVyfGVufDB8fDB8fHww'
    })
    const item17 = new Item({

        name: "Apple",
        discountedPrice: 95000,
        regularPrice: 110000,
        category: 'Computer',
        storage: {
            RAM: 16,
            ROM: 512
        },
        image: 'https://plus.unsplash.com/premium_photo-1681336999444-c6fea7f5c36f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGNvbXB1dGVyfGVufDB8fDB8fHww'
    })
    const item18 = new Item({

        name: "Ryzen",
        discountedPrice: 65000,
        regularPrice: 80000,
        category: 'Computer',
        storage: {
            RAM: 8,
            ROM: 512
        },
        image: 'https://plus.unsplash.com/premium_photo-1681666713680-fb39c13070f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNvbXB1dGVyfGVufDB8fDB8fHww'
    })
    const item19 = new Item({

        name: "Ryzen",
        discountedPrice: 75000,
        regularPrice: 90000,
        category: 'Computer',
        storage: {
            RAM: 16,
            ROM: 512
        },
        image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNvbXB1dGVyfGVufDB8fDB8fHww'
    })
    const item20 = new Item({

        name: "Microsoft",
        discountedPrice: 85000,
        regularPrice: 100000,
        category: 'Computer',
        storage: {
            RAM: 16,
            ROM: 512
        },
        image: 'https://images.unsplash.com/photo-1494173853739-c21f58b16055?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGNvbXB1dGVyfGVufDB8fDB8fHww'
    })
    const item21 = new Item({

        name: "Microsoft",
        discountedPrice: 80000,
        regularPrice: 100000,
        category: 'Computer',
        storage: {
            RAM: 16,
            ROM: 512
        },
        image: 'https://images.unsplash.com/photo-1455894127589-22f75500213a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGNvbXB1dGVyfGVufDB8fDB8fHww'
    })
    const item22 = new Item({

        name: "Electronics",
        discountedPrice: 80000,
        regularPrice: 100000,
        category: 'CPU',
        storage: {
            RAM: 32,
            ROM: 1024
        },
        image: 'https://images.unsplash.com/photo-1588382472578-8d8b337b277a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    })
    const item23 = new Item({

        name: "Electronics",
        discountedPrice: 195000,
        regularPrice: 250000,
        category: 'CPU',
        storage: {
            RAM: 32,
            ROM: 1024
        },
        image: 'https://media.istockphoto.com/id/1393274674/photo/bright-new-pc-desktop-computer-with-colorful-light-parts-workstation-device.webp?s=170667a&w=0&k=20&c=wsZyF8A6SHJVSiltIyXCjwPaSINncSbIr7a192bRUi0='
    })
    const item24 = new Item({

        name: "Electronics",
        discountedPrice: 80000,
        regularPrice: 100000,
        category: 'CPU',
        storage: {
            RAM: 32,
            ROM: 1024
        },
        image: 'https://media.istockphoto.com/id/1075436310/photo/heavy-duty-desktop-pc-for-gaming-designing-rendering-and-crypto-currency-mining.webp?s=170667a&w=0&k=20&c=u1iCqB2kpJRP2FtGB0xS82Pbe_6T5mN79FRhygItJLg='
    })
    const item25 = new Item({

        name: "Electronics",
        discountedPrice: 80000,
        regularPrice: 100000,
        category: 'CPU',
        storage: {
            RAM: 32,
            ROM: 1024
        },
        image: 'https://media.istockphoto.com/id/1314343964/photo/top-end-system-unit-for-gaming-computer-close-up.webp?s=170667a&w=0&k=20&c=yOUmPvBzAswPgsFxwn-eij0QkHAqA8DuDG8oWRhLNjQ='
    })
    const item26 = new Item({

        name: "Electronics",
        discountedPrice: 85000,
        regularPrice: 100000,
        category: 'CPU',
        storage: {
            RAM: 32,
            ROM: 1024
        },
        image: 'https://plus.unsplash.com/premium_photo-1671439429636-6d8d66247143?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D'
    })
    const item27 = new Item({

        name: "Electronics",
        discountedPrice: 75000,
        regularPrice: 100000,
        category: 'CPU',
        storage: {
            RAM: 32,
            ROM: 1024
        },
        image: 'https://plus.unsplash.com/premium_photo-1671439543718-9e4d009827e8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8'
    })
    const item28 = new Item({

        name: "Electronics",
        discountedPrice: 80000,
        regularPrice: 100000,
        category: 'CPU',
        storage: {
            RAM: 32,
            ROM: 1024
        },
        image: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D'
    })
    const item29 = new Item({

        name: "Electronics",
        discountedPrice: 80000,
        regularPrice: 100000,
        category: 'CPU',
        storage: {
            RAM: 32,
            ROM: 1024
        },
        image: 'https://media.istockphoto.com/id/1927300127/photo/side-view-of-computers-computer-repair-display-cards.webp?s=170667a&w=0&k=20&c=rRleu1IQgD-1Qufigren-kl-nsuJ4WGfwbzd5l7u0-c='
    })
    const item30 = new Item({

        name: "Electronics",
        discountedPrice: 125000,
        regularPrice: 130000,
        category: 'CPU',
        storage: {
            RAM: 32,
            ROM: 1024
        },
        image: 'https://images.unsplash.com/photo-1495627009230-9e30e647c7cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D'
    })
    const item31 = new Item({

        name: "Electronics",
        discountedPrice: 115000,
        regularPrice: 120000,
        category: 'CPU',
        storage: {
            RAM: 32,
            ROM: 1024
        },
        image: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D'
    })

    await Item.insertMany([item22, item23, item24, item25, item26, item27, item28, item29, item30, item31, item1, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14, item15, item16, item17, item18, item19, item20, item21]);
    console.log('saved');
}

// Images();

app.get('/', (req, res) => {
    res.send('working!');
});


app.listen('8080', () => {
    console.log('server is listening')
});
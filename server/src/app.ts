import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import mongoose from 'mongoose';

import { Product } from './models/product';
import { Comment } from './models/comment';

// Initialize express app and HTTP server
const app = express();
const server = createServer(app);

const PORT = 5000
const DB = "mongodb+srv://admin:Admin1111@cluster0.wanapkv.mongodb.net/inforce?retryWrites=true&w=majority"

mongoose.connect(DB)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error))


// Configure CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: '*',
    credentials: true
}));

app.get('/products', async (_, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/products', (req, res) => {
    const product = new Product({
        imageURL: "asd",
        name: "Name",
        count: 4,
        size: {
            width: 23,
            height: 34
        },
        weight: 500,
        comments: []
    })
    console.log(product)
    product
        .save()
        .then(() => res.status(200).send())
        .catch((error) => res.status(400).send(error))
})


// Start server and load initial data
server.listen(PORT, async () => {
    console.log("Running on " + PORT)
});

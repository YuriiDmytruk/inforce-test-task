import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import mongoose from 'mongoose';

import { Product } from './models/product';
import { Comment } from './models/comment';

const app = express();
app.use(express.json());
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

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Product.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send('Product not found');
        }
        res.status(200).json({ message: 'Product deleted successfully', product: result });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/products', (req, res) => {
    const { imageURL, name, count, size, weight, comments } = req.body;
    const product = new Product({
        imageURL,
        name,
        count,
        size: {
            width: size.width,
            height: size.height,
        },
        weight,
        comments
    });
    product
        .save()
        .then((respond) => res.status(200).send(respond))
        .catch((error) => res.status(400).send(error))
})


// Start server and load initial data
server.listen(PORT, async () => {
    console.log("Running on " + PORT)
});

const Product = require('../models/productModel');
const dotenv = require('dotenv');
const connectDataBase = require('../config/database')
const data = require('../data.json')

dotenv.config({path:'backend/config/config'});

connectDataBase()

const seedProducts=async ()=>{
    try {
        await Product.deleteMany();
        console.log("Deleting all products");

        await Product.insertMany(data)
        console.log("adding all products from file");
        
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

seedProducts()
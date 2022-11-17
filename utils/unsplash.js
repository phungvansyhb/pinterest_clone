const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

module.exports = axios.create({
    baseURL : "https://api.unsplash.com",
    headers : {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
})
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Restaurant = require('../models/restaurant');

mongoose.connect('mongodb://localhost:27017/halal-foodie', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected and restaurants populated");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Restaurant.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const phone = Math.floor(Math.random() * 20) + 10;
        const rest = new Restaurant({
            //YOUR USER ID
            author: '6069daa57171744c74458926',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            phone,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/halal-foodie/ahfnenvca4tha00h2ubt.png',
                    filename: 'halal-foodie/ahfnenvca4tha00h2ubt'
                },
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/halal-foodie/ruyoaxgf72nzpi4y6cdi.png',
                    filename: 'halal-foodie/ruyoaxgf72nzpi4y6cdi'
                }
            ]
        })
        await rest.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
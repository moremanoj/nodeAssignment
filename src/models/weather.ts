const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
        temp: Number,
        pressure: Number,
        humidity: Number,
        temp_min: Number,
        temp_max: Number
});
 
const WeatherModel = mongoose.model('Weather', WeatherSchema);
 
export { WeatherModel }
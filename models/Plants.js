const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = mongoose.Schema({
        plantName: {
            type: String
        },
        quantity: {
            type: Number
        },
        ph: {
            type: Number
        },
        temp: {
            type: Number
        },
        spacing: {
            type: Number
        },
        growthTime: {
            type: Number
        },
        flag: {
            type: String
        }

});

const Plants = mongoose.model("Plants", PlantSchema);

module.exports = Plants;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlotSchema = mongoose.Schema({
  plotName: {
    type: String,
    required: [true, "plotName is required."]
  },
  plotSize: {
    type: Number,
    required: [true, "plotSize is required."]
  },
  Plants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Plants"
    }
  ],

});

const Plots = mongoose.model("Plots", PlotSchema);

module.exports = Plots;

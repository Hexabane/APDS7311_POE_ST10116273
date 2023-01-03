const mongoose = require("mongoose");

const fruitschema = mongoose.Schema({
  // id: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Fruit", fruitschema);

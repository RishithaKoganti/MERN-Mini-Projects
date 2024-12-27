const mongoose = require('mongoose');

main()
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat', {
  });
}

// Define the schema
const msgSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msgA: {
    type: String,
    maxlength: 50,
  },
  create_at: {
    type: Date,
    required: true,
  },
});

// Create the model
const Msg = mongoose.model("Msg", msgSchema);

// Export the model
module.exports = Msg;

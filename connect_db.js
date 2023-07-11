const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

exports.ConnectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/tasks", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

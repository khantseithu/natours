const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

// console.log(process.env);

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('DB connection successful!')) // return a promise

const tourSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, "a tour must have a name"],
    unique: true
  },
   
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, "a tour must have a price"]
  }
})

const Tour = mongoose.model('Tour', tourSchema)

const testTour = new Tour({
  name: "The Forest Hiker",
  rating: 4.7,
  price: 497
})

testTour.save()
  .then((document)=> console.log(document))
  .catch(err => console.log("ERROR: ", err))


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

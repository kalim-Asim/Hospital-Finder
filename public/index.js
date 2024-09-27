
const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./model/userModel")
const connectDB = require("./model/connectDB")
const templatePath = path.join(__dirname, '../templates')
const route = require("./routes/userRoute")
const dotenv = require("dotenv")
// const { toast } = require('react-toastify');
app.use(express.static(path.join(__dirname, '../src')));

dotenv.config();

// // Import Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.min.css';

// // Import Bootstrap JavaScript (for functionality like modals, dropdowns)
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

connectDB();

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Assuming 'img' folder is inside 'public'
app.use('/img', express.static('public/img'));
app.use(express.urlencoded({ extended: false }))

app.use("/", route)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
})

const express = require("express");
const app = express();
const {
  EditProfile,
  Signup,
  Login,
  ForgotPassword,
  ResetPassword,
  Bookappointment } = require("../controller/userController")
const route = express.Router();
const path = require("path");
const User = require("../model/userModel");
const templatePath = path.join(__dirname, '../../templates')
app.use(express.static(path.join(__dirname, '../../src')));

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.static('public'));
app.use('/img', express.static('public/img'));    // Assuming 'img' folder is inside 'public'
app.use(express.urlencoded({ extended: false }))

route.get("/", (req, res) => res.render("homepage"))
route.get("/login", (req, res) => res.render("login"))
route.get("/signup", (req, res) => res.render("signup"))
route.get("/user-profile", (req, res) => res.render("user-profile"))
route.get("/forgot-password", (req, res) => {
  res.render("forgot-password");
})
route.get('/Admin-Dashboard', (req, res) => {
  // Handle the request to the admin dashboard
  res.render("Admin-Dashboard");
});

route.get("/reset-password/:token", (req, res) => {
  res.render("reset-password", { token: req.params.token });
});
route.get("/edit-profile", async (req, res) => {
  res.render("edit-profile");
});
route.get("/book-appointment", (req, res) => {
  res.render("book-appointment");  // Render your appointment booking page
});


route.post("/signup", Signup);
route.post("/login", Login);

route.post("/forgot-password", ForgotPassword);
route.post("/reset-password/:token", ResetPassword);
route.post("/edit-profile", EditProfile);
route.post("/book-appointment", Bookappointment);

module.exports = route;
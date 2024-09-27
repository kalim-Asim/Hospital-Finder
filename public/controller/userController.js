const express = require("express")
const app = express()
const path = require("path")
// const hbs = require("hbs")
const collection = require("../model/userModel")
const templatePath = path.join(__dirname, '../../templates')
app.use(express.static(path.join(__dirname, '../../src')));
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.static('public'));
const EditProfile = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const updateData = {
      bloodGroup: req.body.bloodGroup,
      height: req.body.height,
      weight: req.body.weight,
      age: req.body.age,
      generalHealth: req.body.generalHealth,
      waterBalance: req.body.waterBalance
    };

    // Update the user's profile in the database
    await collection.updateOne({ email: email }, { $set: updateData });

    // Redirect to the user's profile or home page after successful update
    res.redirect("/login"); // Or redirect to another page, e.g., `/home` or `/dashboard`
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("An error occurred while updating your profile.");
  }
};


const Signup = async (req, res) => {
  try {
    const data = {
      email: req.body.email.toLowerCase().trim(),
      name: req.body.name,
      password: req.body.password
    }
    await collection.insertMany([data]);
    res.render("login")
  }
  catch (error) {
    res.status(500).json({ error: "Internal Server Error." })
  }
};


const Login = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password;
    const check = await collection.findOne({ email: email });

    if (email === "admin123@gmail.com" && password === "admin123") {
      res.render("Admin-Dashboard");
    }
    else if (!check) {
      res.send("Email not found");
    }
    else if (check.password === req.body.password) {
      res.render("user-profile", { name: check.name, email: check.email, enrollmentnumber: check.enrollmentnumber });
    } else {
      res.send("Wrong Password");
    }
  } catch (error) {
    console.error("Error during login: ", error);
    res.send("An error occurred while processing your request");
  }
}

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rahul.pallabothula2005@gmail.com",
    pass: "xahx xtud izeh ckpc"
  }
});
const ForgotPassword = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const user = await collection.findOne({ email: email });

    if (!user) {
      return res.send("Email not found");
    }

    const resetToken = Math.random().toString(36).substr(2);
    const resetLink = `http://localhost:3001/reset-password/${resetToken}`;
    console.log(`Reset Link: ${resetLink}`);

    const mailOptions = {
      from: "iit2023219@iiita.ac.in",
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. 
      Click the link to reset your password: ${resetLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        return res.send("Error sending email");
      }
      console.log("Email sent: " + info.response);
      res.send("Password reset link sent to your email.");
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error!!" })
  }
};


const ResetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    await collection.updateOne({ email: email }, { $set: { password: newPassword } });
    res.send("Password has been reset successfully. You can now log in.");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error!!" })
  }
}

module.exports = {
  EditProfile,
  Signup,
  Login,
  ForgotPassword,
  ResetPassword
}
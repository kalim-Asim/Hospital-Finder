const express = require("express")
const app = express()
const path = require("path")
const User = require("../model/userModel")
const templatePath = path.join(__dirname, '../../templates')
app.use(express.static(path.join(__dirname, '../../src')));
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.static('public'));

const Signup = async (req, res) => {
  try {
    const data = {
      email: req.body.email.toLowerCase().trim(),
      name: req.body.name,
      password: req.body.password
    }
    await User.insertMany([data]);
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
    const check = await User.findOne({ email: email });

    if (email === "admin123@gmail.com" && password === "admin123") {
      res.render("Admin-Dashboard");
    }
    else if (!check) {
      res.render("Error");
    }
    else if (check.password === req.body.password) {
     
                
      res.json({ email: email, redirectUrl: "/user-profile" });
    } else {
      res.render("Error");
    }
  } catch (error) {
    console.error("Error during login: ", error);
    res.render("Error");
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
    await User.updateOne({ email: email }, { $set: updateData });

    // Redirect to the user's profile or home page after successful update
    res.redirect("/login"); // Or redirect to another page, e.g., `/home` or `/dashboard`
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).render("Error");
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const user = await User.findOne({ email: email });

    if (!user) {
      res.render("Error");
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
        return res.render("Error");
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
    await User.updateOne({ email: email }, { $set: { password: newPassword } });
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
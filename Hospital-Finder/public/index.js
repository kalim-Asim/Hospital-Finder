const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")
const templatePath = path.join(__dirname, '../templates')
const nodemailer = require("nodemailer");
// const { toast } = require('react-toastify');
app.use(express.static(path.join(__dirname, '../src')));


app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Assuming 'img' folder is inside 'public'
app.use('/img', express.static('public/img'));

app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render("front")
})
app.get("/login", (req, res) => {
    res.render("login")
})
// app.get("/edit-profile", (req, res) => {
//     res.render("edit-profile")
// })
app.post("/edit-profile", async (req, res) => {
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
});
app.get("/signup", (req, res) => {
    res.render("signup")
})

app.post("/signup", async (req, res) => {
    const data = {
        email: req.body.email.toLowerCase().trim(),
        name: req.body.name,
        password: req.body.password
    }
    await collection.insertMany([data]);
    res.render("login")
})
app.post("/login", async (req, res) => {
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
            res.render("home", { name: check.name, email: check.email, enrollmentnumber: check.enrollmentnumber });
        } else {
            res.send("Wrong Password");
        }
    } catch (error) {
        console.error("Error during login: ", error);
        res.send("An error occurred while processing your request");
    }
})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rahul.pallabothula2005@gmail.com",
        pass: "xahx xtud izeh ckpc"
    }
});

app.get("/forgot-password", (req, res) => {
    res.render("forgot-password");
});

app.post("/forgot-password", async (req, res) => {
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
});

app.get("/reset-password/:token", (req, res) => {
    res.render("reset-password", { token: req.params.token });
});

app.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { email, newPassword } = req.body;
    await collection.updateOne({ email: email }, { $set: { password: newPassword } });
    res.send("Password has been reset successfully. You can now log in.");
});
app.post("/reset-password/:token", async (req, res) => {
    const { email, newPassword } = req.body;
    await collection.updateOne({ email: email }, { $set: { password: newPassword } });
    res.send("Password has been reset successfully. You can now log in.");
});

// Update Profile Route
app.get("/edit-profile", async (req, res) => {
    res.render("edit-profile");
});

app.post("/edit-profile", async (req, res) => {
    const email = req.body.email.toLowerCase().trim();
    const updateData = {
        name: req.body.newName,
        enrollmentnumber: req.body.newEnrollmentnumber,
    };

    await collection.updateOne({ email: email }, { $set: updateData });
    res.send("Profile updated successfully");
});

app.get("/user.hbs", (req, res) => {
    res.render("user");
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
})
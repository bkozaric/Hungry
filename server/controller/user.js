const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.jwt_secret;

class User {
    async getUsers(req, res) {
        try {
            let Users = await userModel
                .find({})
                .select("email")
                .sort({ _id: -1 });
            if (Users) {
                return res.json({ Users });
            }
        } catch (err) {
            console.log(err);
        }
    }


    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.sendStatus(404);
            }
        });
        res.sendStatus(200);
    }

    async register(req, res) {
        try {

            /*let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.email_user, // generated ethereal user
                    pass: process.env.email_password
                },
            });*/

            const { firstName, lastName, email, password, address, phone, city, zipcode } = req.body;

            const token = jwt.sign({
                email: email
            }, JWT_SECRET, { expiresIn: '1d' });


            if (email.length < 4) {
                return res.status(500).json({ success: 0, message: "Email too short." })
            }
            if (password.length < 6) {
                return res.status(500).json({ success: 0, message: "Password too short." })
            }

            const fetchExisting = await userModel.findOne({ email: email });
            if (fetchExisting) {
                return res.status(500).json({ success: 0, message: "This email address is taken." })
            }

            const hashedPass = await bcrypt.hash(password, 10);

            try {
                let newUser = new userModel({
                    firstName,
                    lastName,
                    email,
                    password: hashedPass,
                    token,
                    address,
                    phone,
                    city,
                    zipcode
                });
                let save = await newUser.save();
                if (save) {
                    return res.status(200).json({ success: 1, message: "User created successfully" });
                }
            } catch (err) {
                return res.json({ error: err });
            }

            /*const results = await db.insertUser(username, hashedPass, email, firstName, lastName, contact, address, city, zipcode, token);
    
            const { affectedRows: success } = results;*/

            /*
            if (success) {
                await transporter.sendMail({
                    from: '"eSell" <bymplayer213@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "Please confirm your account", // Subject line
                    html: `<h2>Hello ${username}</h2><p>To finish the registration process please verify your account by click on <a href="http://localhost:3000/confirm/${token}">this</a> link.</p><p>- eSell</p>`, // html body
                });
            }*/

        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: err, success: 0 });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            let User = await userModel.findOne({ email: email });
            if (User) {
                const correctPass = await bcrypt.compare(password, User.password);
                if (correctPass) {
                    if (User.verified === 'true') {
                        req.session.email = email;
                        req.session.userId = User.id;
                        req.session.save();
                        return res.status(200).json({ login: 1, message: "Login successful!" });
                    }
                    return res.status(200).json({ login: 0, message: "Email not confirmed! Please check your email to verify your account." });
                }
            };
            return res.status(200).json({ login: 0, message: "Incorrect email and/or password" });
        }
        catch (err) {
            console.log(err);
            res.sendStatus(500);
        }

    }

    async checkSession(req, res) {
        if (!req.session.userId) {
            return res.json({ "logged": 0 });
        }
        return res.json({ "logged": 1, "email": req.session.email, "userId": req.session.userId });
    }


    async verifyAccount(req, res) {
        try {
            jwt.verify(req.params.token, JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(404).json({ success: 0, message: "Invalid token" });
                } else {
                    let User = await userModel.findOne({ token: req.params.token });
                    if (!User) {
                        return res.status(404).json({ success: 0, message: "Token doesn't exist" });
                    }
                    else {
                        if (User.verified === 'true') {
                            return res.status(200).json({ success: 0, message: "Email already verified." });
                        }
                        userModel
                            .findOneAndUpdate(
                                { token: req.params.token },
                                { verified: 'true' },
                                { new: true, useFindAndModify: false })
                            .then(data => {
                                if (data.verified === 'true') {
                                    return res.status(200).json({ success: 1, message: "Email succesfully verified. You can now login with your email and password." });
                                }
                            })
                            .catch(err => { return res.status(500).json({ success: 0, message: err }) });
                    }
                }
            });
        }
        catch (err) {
            return res.status(500).json({ success: 0 });
        }
    }
}

const usersController = new User();
module.exports = usersController;
const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const JWT_SECRET = process.env.jwt_secret;

class User {
    async getUsers(req, res) {
        if (!req.params.uId) {
            return res.status(403).json({ message: "Missing parameters" });
        }
        if (!req.session.userId) {
            return res.status(403).json({ message: "Access denied" });
        }
        if (req.params.uId != req.session.userId) {
            return res.status(401).json({ message: "Access denied" });
        }

        if (!req.session.isAdmin) {
            return res.status(403).json({ success: 0, message: "Insufficent permissions" });
        }

        try {
            let Users = await userModel
                .find({})
                .select("firstName lastName email address city zipcode phone verified createdAt userRole disabled")
                .sort({ _id: -1 });
            if (Users) {
                return res.json(Users);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async changeRole(req, res) {
        let { uIdAdmin, userIdForPromotion, userRole } = req.body;
        if (!uIdAdmin || !userIdForPromotion || ![0, 1].includes(userRole)) {
            return res.status(400).json({ success: 0, message: "All fields are required" });
        }
        if (!req.session.userId) {
            return res.status(403).json({ success: 0, message: "Access denied" });
        }
        if (uIdAdmin != req.session.userId) {
            return res.status(401).json({ success: 0, message: "Access denied" });
        }
        if (!req.session.isAdmin) {
            return res.status(403).json({ success: 0, message: "Insufficent permissions" });
        }

        const data = await userModel.findById(userIdForPromotion);
        if (!data) {
            return res.status(404).json({
                success: 0, message: "User does not exist",
            });
        } else {
            let userChange = userModel.findByIdAndUpdate(userIdForPromotion, {
                userRole
            }, { useFindAndModify: false });
            userChange.exec((err, result) => {
                if (err) console.log(err);
                return res.status(200).json({ success: 1, message: "User role updated successfully!" });
            });
        }
    }

    async getUserInfo(req, res) {
        if (!req.params.uId) {
            return res.status(403).json({ message: "Missing parameters" });
        }
        if (!req.session.userId) {
            return res.status(403).json({ message: "Access denied" });
        }
        if (req.params.uId != req.session.userId) {
            return res.status(401).json({ message: "Access denied" });
        }
        try {

            let User = await userModel
                .findById(req.params.uId)
                .select("firstName lastName address zipcode city phone email");
            if (User) {
                return res.json(User);
            }
            return res.status(404).json({ message: "User doesn't exist" })
        } catch (err) {
            return res.status(500).json({ message: err });
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

            let transporter = nodemailer.createTransport({
                service: "Hotmail",
                auth: {
                    user: process.env.email_user,
                    pass: process.env.email_password
                }
            });

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
                    await transporter.sendMail({
                        from: '"Hungry" <hungryconfirmation@hotmail.com>', // sender address
                        to: email, // list of receivers
                        subject: "Please verify your account", // Subject line
                        html: `<h2>Hello ${firstName}</h2><p>To finish the registration process please verify your account by clicking on <a href="http://${process.env.cur_host}/verify/${token}">this</a> link.</p><p>- Hungry Ltd.</p>`, // html body
                    });
                    return res.status(200).json({ success: 1, message: "User created successfully" });
                }
            } catch (err) {
                return res.json({ error: err });
            }

        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: err, success: 0 });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            let User = await userModel.findOne({ email: email, disabled: "false" });
            if (User) {
                const correctPass = await bcrypt.compare(password, User.password);
                if (correctPass) {
                    if (User.verified === 'true') {
                        req.session.email = email;
                        req.session.userId = User.id;
                        req.session.isAdmin = User.userRole === 1 ? true : false;
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

    async changePassword(req, res) {
        let { uId, oldPassword, newPassword } = req.body;
        if (!uId || !oldPassword || !newPassword) {
            return res.status(400).json({ success: 0, message: "All fields are required" });
        }

        if (!req.session.userId) {
            return res.status(403).json({ success: 0, message: "Access denied" });
        }
        if (uId != req.session.userId) {
            return res.status(401).json({ success: 0, message: "Access denied" });
        }

        const data = await userModel.findById(uId);
        if (!data) {
            return res.status(404).json({
                success: 0, message: "User does not exist",
            });
        } else {
            const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
            if (oldPassCheck) {
                newPassword = bcrypt.hashSync(newPassword, 10);
                let passChange = userModel.findByIdAndUpdate(uId, {
                    password: newPassword,
                }, { useFindAndModify: false });
                passChange.exec((err, result) => {
                    if (err) console.log(err);
                    return res.status(200).json({ success: 1, message: "Password updated successfully!" });
                });
            } else {
                return res.status(400).json({ success: 0, message: "Invalid old password" });
            }
        }
    }

    async changeUserInfo(req, res) {
        //return res.status(200).json({ success: 1, message: "req received" })
        let { uId, firstName, lastName, zipcode, city, address, phone } = req.body;
        if (!uId || !firstName || !lastName || !zipcode || !address || !city || !phone) {
            return res.status(400).json({ success: 0, message: "All fields are required" });
        }
        if (!req.session.userId) {
            return res.status(403).json({ success: 0, message: "Access denied" });
        }
        if (uId != req.session.userId) {
            return res.status(401).json({ success: 0, message: "Access denied" });
        }
        const data = await userModel.findById(uId);
        if (!data) {
            return res.status(404).json({
                success: 0, message: "User does not exist",
            });
        } else {
            let userChange = userModel.findByIdAndUpdate(uId, {
                firstName,
                lastName,
                zipcode,
                city,
                address,
                phone
            }, { useFindAndModify: false });
            userChange.exec((err, result) => {
                if (err) console.log(err);
                return res.status(200).json({ success: 1, message: "User info updated successfully!" });
            });
        }
    }

    async checkSession(req, res) {
        if (!req.session.userId) {
            return res.json({ "logged": 0 });
        }
        return res.json({ "logged": 1, "email": req.session.email, "userId": req.session.userId, "isAdmin": req.session.isAdmin });
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

    async changeAccountStatus(req, res) {
        let { uIdAdmin, userIdForChangeStatus, newStatus } = req.body;
        if (!uIdAdmin || !userIdForChangeStatus || !["true", "false"].includes(newStatus)) {
            return res.status(400).json({ success: 0, message: "All fields are required" });
        }
        if (!req.session.userId) {
            return res.status(403).json({ success: 0, message: "Access denied" });
        }
        if (uIdAdmin != req.session.userId) {
            return res.status(401).json({ success: 0, message: "Access denied" });
        }
        if (!req.session.isAdmin) {
            return res.status(403).json({ success: 0, message: "Insufficent permissions" });
        }

        const data = await userModel.findById(userIdForChangeStatus);
        if (!data) {
            return res.status(404).json({
                success: 0, message: "User does not exist",
            });
        } else {
            let userChange = userModel.findByIdAndUpdate(userIdForChangeStatus, {
                disabled: newStatus
            }, { useFindAndModify: false });
            userChange.exec((err, result) => {
                if (err) console.log(err);
                return res.status(200).json({ success: 1, message: "User status updated successfully!" });
            });
        }
    }

    async deleteAccount(req, res) {
        if (!req.params.uId) {
            return res.status(403).json({ message: "Missing parameters" });
        }
        if (!req.session.userId) {
            return res.status(403).json({ message: "Access denied" });
        }
        if (req.params.uId != req.session.userId) {
            return res.status(401).json({ message: "Access denied" });
        }
        try {
            let User = await userModel.findByIdAndUpdate(req.params.uId, { disabled: "true" }, { useFindAndModify: false });
            if (User) {
                return res.status(200).json({ success: 1, message: "Account deleted." });
            }
            return res.status(404).json({ message: "User doesn't exist" })
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }
}

const usersController = new User();
module.exports = usersController;
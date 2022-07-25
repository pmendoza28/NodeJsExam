const UserAccountModel = require("./useraccount.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config/index");

module.exports = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const userAccount = await UserAccountModel.findOne({ username })
            if (!userAccount) {
                return res.status(404).json("Username or Password are incorrect")
            }
            const passwordMatch = await bcrypt.compare(password, userAccount.password);
            if (passwordMatch) {
                const token = jwt.sign({
                    _id: userAccount._id
                },
                    SECRET,
                    {
                        expiresIn: "6h"
                    })
                return res.status(201).json({
                    message: `Welcome ${userAccount.firstName} ${userAccount.lastName}`,
                    userAccount,
                    token
                })
            }
            else {
                return res.status(404).json("Username or Password are incorrect")
            }

        } catch (error) {
            console.error(error)
        }
    },
    get: async (req, res) => {
        try {
            const options = {
                page: req.query.page,
                limit: req.query.limit,
            }
            const filter = req.query.filter ? req.query.filter : "";
            const userAccounts = await UserAccountModel.paginate({
                $or: [
                    { firstName: { $regex: filter, $options: "i" } },
                    { lastName: { $regex: filter, $options: "i" } },
                    { role: { $regex: filter, $options: "i" } },
                    { username: { $regex: filter, $options: "i" } },
                ]
            }, options)
            return res.status(200).json(userAccounts)
        } catch (error) {
            console.log(error)
        }
    },
    createUserAccount: async (req, res) => {
        try {
            const userAccount = await UserAccountModel.find({
                username: req.body.username
            })
            if (userAccount.length > 0) {
                return res.status(422).json("Username already exists")
            }

            const password = await bcrypt.hash(req.body.password, 12);
            const createdUserAccount = await UserAccountModel.create({ ...req.body, password });
            return res.status(201).json({
                createdUserAccount,
                message: "User Account Successfully Created!"
            })
        } catch (error) {
            console.error(error);
        }
    },
    updateUserAccount: async (req, res) => {
        try {
            const userAccount = await UserAccountModel.findById(req.params.id);
            if (!userAccount) {
                return res.status(404).json("No User Account Found")
            }
            let password;
            if (req.body.password) password = await bcrypt.hash(req.body.password, 12);

            userAccount.set({ ...req.body, password });

            const updatedUserAccount = await userAccount.save();
            res.status(201).json({
                message: "User Account Successfully updated",
                updatedUserAccount
            })

        } catch (error) {
            console.error(error)
        }
    },
    deleteUserAccount: async (req, res) => {
        try {
            const userAccount = await UserAccountModel.findById(req.params.id)
            if (!userAccount) return res.status(422).json({
                message: "No User Account Found"
            })
            await userAccount.remove();
            return res.status(201).json({
                message: "User Account Successfully deleted",
                deletedUserAccount: userAccount
            })

        } catch (error) {
            console.error(error)
        }
    }
}
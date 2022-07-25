const { object, string } = require("yup")

let CreateUserAccountSchema = object({
    firstName: string().required(),
    lastName: string().required(),
    role: string().required(),
    username: string().required(),
})

const CreateUserAccountDTO = async (req, res, next) => {
    try {
        await CreateUserAccountSchema.validate(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ error })
    }
}

module.exports = {
    CreateUserAccountDTO
}
const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const UserAccountSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Client"]
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

UserAccountSchema.plugin(mongoosePaginate)

module.exports = model("user-accounts", UserAccountSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please give a name"],
    },
    email: {
        type: String,
        required: [true, "Please give an email"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please give a password"],
        minLength: [8, "Password must be at least 8 characters long"],
        select: false,
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    avatar: {
        public_id: String,
        url: String,
    }
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

module.exports = mongoose.model("User", userSchema);
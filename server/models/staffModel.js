import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const staffSchema = new mongoose.Schema({
    email:{
        type:String,
        required: [true, "Email is Required"],
        unique: true
    },
    password:{
        type:String,
        required: [true, "Password is Required"],
    },
    username:{
        type: String,
        unique: true,
        required: [true, "username is Required"],
    }
})

staffSchema.pre("save", async function(next) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
})

const Staff = mongoose.model("staff", staffSchema);

export default Staff
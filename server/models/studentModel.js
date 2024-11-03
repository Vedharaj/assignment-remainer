import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const studentSchema = new mongoose.Schema({
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
        required: [true, "username is Required"],
    }
})

studentSchema.pre("save", async function(next) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
})

const Student = mongoose.model("student", studentSchema);

export default Student
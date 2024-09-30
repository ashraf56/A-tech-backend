import { model, Schema } from "mongoose";
import { UserInterface, Usermodels } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config/config";


const UserSchema = new Schema<UserInterface, Usermodels>({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    },
    password: { type: String, required: true },
  
    address: { type: String },
    profile:{type:String}

}, {
    timestamps: true
})


UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.saltNumber))
    next()
})
UserSchema.post('save', function (doc, next) {
    doc.password = ""
    next()
})


UserSchema.statics.isMatchpass = async function name( inputPassword,hashpassword) {
    return await bcrypt.compare(inputPassword, hashpassword)
}


export const User = model<UserInterface,Usermodels>('Users', UserSchema)
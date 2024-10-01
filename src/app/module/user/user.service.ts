import config from "../../config/config";
import throwError from "../../utills/throwError";
import { UserInterface } from "./user.interface";
import { User } from "./user.model";
import jwt from 'jsonwebtoken'

const RegisterUserDB = async (payload: UserInterface) => {
    const isUserexist = await User.findOne({ email: payload.email })
    if (isUserexist) {
        return throwError('this  email already Registered')
    }
    const createUser = await User.create(payload)
    return createUser
}


const logIn = async (payload: UserInterface) => {


    const users = await User.findOne({ email: payload.email })

    if (!users) {
        throwError('User not found')
    }


    const passwordMatcher = await User.isMatchpass(payload.password, users?.password)

    if (!passwordMatcher) {
        throwError('password not match')
    }

    const tokenplayload = {
        id: users?._id,
        role: users?.role
    }

    const token = jwt.sign(tokenplayload, config.JWT_sec_Token as string, { expiresIn: '365D' })


    return {
        token, users
    }

}

const updateUserDB = async (id: string, payload: Partial<UserInterface>) => {

    const result = await User.findByIdAndUpdate(
        { _id: id }, payload, { new: true })

    return result

}


const SingleUserDB = async (id: string) => {

    const result = await User.findById(id)
    return result

}


export const UsersService = {
    RegisterUserDB,
    logIn,
    updateUserDB,
    SingleUserDB
}
/* eslint-disable no-unused-vars */
import { Model } from "mongoose"
import { UserRoles } from "./user.constant"

export interface UserInterface {
    name: string
    email: string
    role: 'user' | 'admin'
    password: string
    profile?: string
    address?:string
}



export type UserRoletypes = keyof typeof UserRoles

export interface Usermodels extends Model<UserInterface> {
    isMatchpass( inputPassword: string | unknown, hashpassword: string | unknown): Promise<boolean>
}

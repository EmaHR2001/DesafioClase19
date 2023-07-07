import mongoose from "mongoose";
import { userModel } from "./db/model/user.model.js";

export const getAll = async () => {
    let result;
    try {
        result = await userModel.find()
    } catch (error) {
        console.log(error)
    }

    return result;
}

export const loginVerification = async email => {
    let result;
    try {
        result = email ? await userModel.findOne({ email }, { first_name: 1, _id: 0 }) : null;
        console.log(result)
    } catch (error) {
        console.log(error)
    }

    return result;
}

export const getByEmail = async email => {
    let result;
    try {
        result = await userModel.findOne({ email })
    } catch (error) {
        console.log(error)
    }

    return result;
}

export const createUser = async user => {
    let result;
    try {
        result = await userModel.create(user)
    } catch (error) {
        console.log(error)
    }

    return result;
}
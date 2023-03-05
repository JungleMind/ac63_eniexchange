import { BASE_URL } from "../utils/constant";

export const createUserApi = async(data) => {
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };

    return await fetch(`${BASE_URL}/user/register`, options)
}

export const verifyEmailApi = async(data) => {
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };

    return await fetch(`${BASE_URL}/user/confirm`, options)
}

export const loginUserApi = async(data) => {
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };

    return await fetch(`${BASE_URL}/user/login`, options)
}
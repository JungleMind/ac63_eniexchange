import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserApi } from "../../../services/UserServices";

// Register user
export const registerUser = createAsyncThunk(
    'user/register', 
    async ({userData}, { rejectWithValue }) => {
        const res =  await(await(createUserApi(userData)))?.json();
        console.log(res);

        if(res.status !== 200 && res.status !== 201) {
            console.log(rejectWithValue(res.message));
            return rejectWithValue(res.message)
        } else {
            return res;
        }
})
import { createAsyncThunk } from "@reduxjs/toolkit";
import { verifyEmailApi } from "../../../services/UserServices";

// Verify Email
export const verifyEmail = createAsyncThunk(
    'user/verifyEmail', 
    async ({userData}, { rejectWithValue }) => {
        const res =  await(await(verifyEmailApi(userData)))?.json();
        console.log(res);

        if(res.status !== 200 && res.status !== 201) {
            console.log(rejectWithValue(res.message));
            return rejectWithValue(res.message)
        } else {
            return res;
        }
})
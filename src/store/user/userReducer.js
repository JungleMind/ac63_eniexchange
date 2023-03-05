import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { registerUser } from "./UserAction/registerUser";
import { verifyEmail } from "./UserAction/verifyEmail";

const initialState = {
    register: {
        error: null,
        success: false,   
        loading: false,
        userInfo: {
            email: ""
        },
    },
    verifyEmail: {
        error: null,
        success: false,    
        loading: false,
    },
    // login: {
    //     error: null,
    //     success: false,
    //     loading: false,
    //     userInfo: {
    //         id: "",
    //         email: "",
    //         firstName: "",
    //         lastName: "",
    //         phoneNumber: "",
    //         role: "",
    //     },
    //     accessToken: "",
    //     refreshToken: "",
    //     loggedIn: false
    // }
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: (state) => initialState,
        logout: (state) => initialState,
        setNewAccessToken: (state, action) => {
            state.login.accessToken = action.payload.accessToken
            state.login.refreshToken = action.payload.newRefreshToken
        }
    },
    extraReducers: (builder) => {
        // Register user
        builder.addCase(registerUser.pending, (state) => {
            state.register.loading = true;
            state.register.error = null; 
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.register.loading = true;
            state.register.success = true; // registration successful
            
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.register.loading = false;

            if (action.payload) {
                state.register.error = action.payload;
            } else {
                state.register.error = action.error;
            }
        })

        // Verify user email
        builder.addCase(verifyEmail.pending, (state) => {
            state.verifyEmail.loading = true;
            state.verifyEmail.error = null; 
        })
        builder.addCase(verifyEmail.fulfilled, (state) => {
            state.verifyEmail.loading = true;
            state.verifyEmail.success = true; // email verified
        })
        builder.addCase(verifyEmail.rejected, (state, action) => {
            state.verifyEmail.loading = false;

            if (action.payload) {
                state.verifyEmail.error = action.payload;
            } else {
                state.verifyEmail.error = action.error;
            }
        })

        // // Login user
        // builder.addCase(loginUser.pending, (state) => {
        //     state.login.loading = true;
        //     state.login.error = null; 
        // })
        // builder.addCase(loginUser.fulfilled, (state, action) => {
        //     state.login.loading = true;
        //     state.login.success = true; // login success
        //     state.login.accessToken = action.payload.data.accessToken;
        //     state.login.refreshToken = action.payload.data.refreshToken;
        //     state.login.userInfo.id = action.payload.data._id;
        //     state.login.userInfo.email = action.payload.data.email;
        //     state.login.userInfo.firstName = action.payload.data.firstName;
        //     state.login.userInfo.lastName = action.payload.data.lastName;
        //     state.login.userInfo.phoneNumber = action.payload.data.phoneNumber;
        //     state.login.userInfo.role = action.payload.data.role;
        //     state.login.accessToken = action.payload.data.accessToken;
        //     state.login.refreshToken = action.payload.data.refreshToken;
        //     state.login.loggedIn = true;

        // })
        // builder.addCase(loginUser.rejected, (state, action) => {
        //     state.login.loading = false;

        //     if (action.payload) {
        //         state.login.error = action.payload;
        //     } else {
        //         state.login.error = action.error;
        //     }
        // })

    },
})

export const { resetState } = userReducer.actions
export const { logout } = userReducer.actions
export const { setNewAccessToken } = userReducer.actions


export default userReducer.reducer
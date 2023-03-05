import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userReducer";

const persistConfig = {
    key: "root",
    storage,
};
  
const rootReducer = combineReducers({
user: userReducer,
});

const persitedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
reducer: persitedReducer,
middleware: [thunk],
});

export const persistor = persistStore(store);
  
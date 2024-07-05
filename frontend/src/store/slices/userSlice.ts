import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../configurations/environment"
import { RequestConfig } from "../../helpers/requestConfig";
import { IUser } from "../../interfaces/User";


export interface IUserState {
    loading: boolean;
    message: string;
    users: any[];
}

const initialState: IUserState = {
    loading: false,
    message: "",
    users: [],
};

export const getAllUsers = createAsyncThunk<{ users: IUser[] }, void, { rejectValue: string }>(
    "userState/getAllUsers",
    async () => {
        const response = await axios.get(`${baseURL}/api/user/getAllUsers`, RequestConfig());
        return response.data;
    }
)

export const userSlice = createSlice({
    name: "userState",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.message = "Success";
            state.users = action.payload.users;
        }).addCase(getAllUsers.pending, (state) => {
            state.loading = true;
            state.message = "Loading";
            state.users = [];
        }).addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message || "Failed";
            state.users = [];
        })
    },
});

export default userSlice.reducer;
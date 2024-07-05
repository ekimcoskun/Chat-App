import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/User";

export interface IMessageState {
    loading: boolean;
    messages: any[];
    selectedConversation: IUser;
}

const initialState: IMessageState = {
    loading: false,
    messages: [],
    selectedConversation: {} as IUser,
};

export const messageSlice = createSlice({
    name: "messageState",
    initialState,
    reducers: {
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload;
        },
    },

});

export const { setSelectedConversation } = messageSlice.actions;
export default messageSlice.reducer;
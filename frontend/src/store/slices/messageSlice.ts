import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/User";
import axios from "axios";
import { baseURL } from "../../configurations/environment";
import { RequestConfig } from "../../helpers/requestConfig";
import { ISendMessageBody } from "../../interfaces/SendMessageBody";
import toast from "react-hot-toast";

export interface IMessageState {
    sendMessageLoading: boolean;
    loading: boolean;
    messages: any[];
    selectedConversation: IUser;
}

const initialState: IMessageState = {
    sendMessageLoading: false,
    loading: false,
    messages: [],
    selectedConversation: {} as IUser,
};

export const sendMessage = createAsyncThunk<ISendMessageBody, ISendMessageBody, { rejectValue: string }>(
    "messageState/sendMessage",
    async (formData: ISendMessageBody) => {
        try {
            const response = await axios.post(`${baseURL}/api/message/send`, formData, RequestConfig());
            return response.data;
        } catch (error: any) {
            toast.error("Failed to send message. Please try again later.");
        }
    });

export const messageSlice = createSlice({
    name: "messageState",
    initialState,
    reducers: {
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendMessage.fulfilled, (state) => {
            state.sendMessageLoading = false;
        }).addCase(sendMessage.pending, (state) => {
            state.sendMessageLoading = true;
        }).addCase(sendMessage.rejected, (state) => {
            state.sendMessageLoading = false;
        });
    }
});

export const { setSelectedConversation } = messageSlice.actions;
export default messageSlice.reducer;
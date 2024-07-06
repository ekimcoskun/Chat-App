import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/User";
import axios from "axios";
import { baseURL } from "../../configurations/environment";
import { RequestConfig } from "../../helpers/requestConfig";
import { ISendMessageReqBody, ISendMessageResBody } from "../../interfaces/SendMessage";
import toast from "react-hot-toast";
import { IGetMessageReqBody } from "../../interfaces/GetMessageReqBody";
import { IMessage } from "../../interfaces/Message";

export interface IMessageState {
    sendMessageLoading: boolean;
    loading: boolean;
    messages: IMessage[];
    selectedConversation: IUser;
}

const initialState: IMessageState = {
    sendMessageLoading: false,
    loading: false,
    messages: [],
    selectedConversation: {} as IUser,
};

export const sendMessage = createAsyncThunk<ISendMessageResBody, ISendMessageReqBody, { rejectValue: string }>(
    "messageState/sendMessage",
    async (formData: ISendMessageReqBody) => {
        try {
            const response = await axios.post(`${baseURL}/api/message/send`, formData, RequestConfig());
            return response.data;
        } catch (error: any) {
            toast.error("Failed to send message. Please try again later.");
        }
    });

export const getMessages = createAsyncThunk<any, any, { rejectValue: string }>(
    "messageState/getMessages",
    async (formData: IGetMessageReqBody) => {
        try {
            const response = await axios.post(`${baseURL}/api/message/get`, formData, RequestConfig());
            return response.data.data;
        } catch (error: any) {
            toast.error("Failed to fetch messages. Please try again later.");
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
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.sendMessageLoading = false;
            state.messages = [...state.messages, action.payload.data]
        }).addCase(sendMessage.pending, (state) => {
            state.sendMessageLoading = true;
        }).addCase(sendMessage.rejected, (state) => {
            state.sendMessageLoading = false;
        }).addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
            state.loading = false;
        }).addCase(getMessages.pending, (state) => {
            state.loading = true;
        }).addCase(getMessages.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const { setSelectedConversation } = messageSlice.actions;
export default messageSlice.reducer;
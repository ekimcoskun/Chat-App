import { Dispatch, SetStateAction } from "react";
import { IUser } from "../User";

export interface IAuthContext {
    authUser: IUser | null;
    setAuthUser: Dispatch<SetStateAction<IUser | null>>;
}
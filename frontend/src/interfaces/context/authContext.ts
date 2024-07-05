import { Dispatch, SetStateAction } from "react";
import { IAuthUser } from "./authUser";

export interface IAuthContext {
    authUser: IAuthUser | null;
    setAuthUser: Dispatch<SetStateAction<IAuthUser | null>>;
}
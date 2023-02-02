import {createContext} from "react";
import {UserProps} from "../types";

export type AppContextProps = {
    apiUrl: string,
    user: UserProps | null | undefined,
    setUser: (user: UserProps | null | undefined) => void,
    token: string | null | undefined,
    setToken: (token: string | null) => void,
}

const defaultAppContext: AppContextProps = {
    apiUrl: "",
    user: undefined,
    setUser: () => {},
    token: null,
    setToken: () => {},
}

export const AppContext = createContext<AppContextProps>(defaultAppContext);
import {createContext, ReactNode, useContext, useState} from "react";

export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    location: string;
} | null;

type UserContextType = {
    user: User;
    setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserContextProvider({ children }: { children : ReactNode }) {
    const [user, setUser] = useState<User>(null)
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export function UseUserContext(){
    const context = useContext(UserContext);
    if(!context){
        throw new Error('useUserContext must be defined');
    }
    return context;
}
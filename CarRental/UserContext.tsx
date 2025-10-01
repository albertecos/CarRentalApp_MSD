import {createContext, ReactNode, useContext, useState} from "react";

type UserContextType = {
    userId: string | null;
    setUserId: (userId: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserContextProvider({ children }: { children : ReactNode }) {
    const [userId, setUserId] = useState<string | null>('user1');//test
    return (
        <UserContext.Provider value={{userId, setUserId}}>
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
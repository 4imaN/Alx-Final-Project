import { createContext, PropsWithChildren, useContext , useState } from "react";
import { Admin } from "../type/Admin";


const AuthContext = createContext<Admin | null >(null);

type AuthProviderProps = PropsWithChildren & {
    isSignedIn?: boolean;
}
export default function AuthProvider({
    children,
    isSignedIn,
}: AuthProviderProps){
    const [Admin] = useState<Admin | null>(isSignedIn ? {id : 1}: null);
    return <AuthContext.Provider value ={Admin}>{children}</AuthContext.Provider>;
}

export const useAuth = () =>{
    const context = useContext(AuthContext);
    
    if (context === undefined){
        throw new Error('useAuth must be used within an Authprovider');

    }
    return context
}

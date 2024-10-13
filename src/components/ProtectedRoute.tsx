import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";


type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({children}: ProtectedRouteProps){
 const Admin = useAuth();
 const navigate = useNavigate();

 useEffect (() => {
 if (Admin === null){
    navigate('/',{ replace : true});
 }

 },[navigate,Admin]);

    return children
}


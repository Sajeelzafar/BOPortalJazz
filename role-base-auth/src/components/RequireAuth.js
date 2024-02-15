import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ( { allowedPermissions } ) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.permissions?.find(permission => permission === allowedPermissions)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
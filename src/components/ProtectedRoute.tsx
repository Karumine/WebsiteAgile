import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const CHANGE_PASSWORD_PATH = '/management-portal/account';

export function ProtectedRoute() {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/management-portal" state={{ from: location }} replace />;
    }

    // Accounts on a temporary password may only use the change-password page.
    if (user?.mustChangePassword && location.pathname !== CHANGE_PASSWORD_PATH) {
        return <Navigate to={CHANGE_PASSWORD_PATH} replace />;
    }

    return <Outlet />;
}

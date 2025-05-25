import { ReactNode } from 'react';
interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: string;
}
declare const ProtectedRoute: ({ children, requiredRole }: ProtectedRouteProps) => import("react").JSX.Element;
export default ProtectedRoute;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, token } = (0, react_redux_1.useSelector)((state) => state.auth);
    const location = (0, react_router_dom_1.useLocation)();
    if (!token) {
        return <react_router_dom_1.Navigate to="/login" state={{ from: location }} replace/>;
    }
    if (requiredRole && user?.role !== requiredRole) {
        return <react_router_dom_1.Navigate to="/" replace/>;
    }
    return <>{children}</>;
};
exports.default = ProtectedRoute;
//# sourceMappingURL=ProtectedRoute.js.map
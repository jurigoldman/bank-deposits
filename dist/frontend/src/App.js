"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const styles_1 = require("@mui/material/styles");
const CssBaseline_1 = require("@mui/material/CssBaseline");
const react_redux_1 = require("react-redux");
const store_1 = require("./store");
const authSlice_1 = require("./features/auth/authSlice");
const theme_1 = require("./styles/theme");
const MainLayout_1 = require("./components/Layout/MainLayout");
const HomePage_1 = require("./pages/HomePage");
const ProfilePage_1 = require("./pages/ProfilePage");
const LoginPage_1 = require("./pages/LoginPage");
const DepositsPage_1 = require("./pages/DepositsPage");
const CreateBankOffer_1 = require("./components/CreateBankOffer");
const CompareBankOffers_1 = require("./components/CompareBankOffers");
const ProtectedRoute_1 = require("./components/auth/ProtectedRoute");
const AppContent = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { token } = (0, react_redux_1.useSelector)((state) => state.auth);
    (0, react_1.useEffect)(() => {
        if (token) {
            dispatch((0, authSlice_1.loadUser)());
        }
    }, [dispatch, token]);
    return (<styles_1.ThemeProvider theme={theme_1.default}>
      <CssBaseline_1.default />
      <react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/login" element={<LoginPage_1.default />}/>
          <react_router_dom_1.Route path="/" element={<MainLayout_1.default />}>
            <react_router_dom_1.Route index element={<HomePage_1.default />}/>
            <react_router_dom_1.Route path="profile" element={<ProtectedRoute_1.default>
                  <ProfilePage_1.default />
                </ProtectedRoute_1.default>}/>
            <react_router_dom_1.Route path="deposits" element={<ProtectedRoute_1.default>
                  <DepositsPage_1.default />
                </ProtectedRoute_1.default>}/>
            <react_router_dom_1.Route path="create-deposit" element={<ProtectedRoute_1.default requiredRole="admin">
                  <CreateBankOffer_1.default />
                </ProtectedRoute_1.default>}/>
            <react_router_dom_1.Route path="compare-deposits" element={<ProtectedRoute_1.default>
                  <CompareBankOffers_1.default />
                </ProtectedRoute_1.default>}/>
          </react_router_dom_1.Route>
          
          <react_router_dom_1.Route path="*" element={<react_router_dom_1.Navigate to="/" replace/>}/>
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </styles_1.ThemeProvider>);
};
const App = () => {
    return (<react_redux_1.Provider store={store_1.store}>
      <AppContent />
    </react_redux_1.Provider>);
};
exports.default = App;
//# sourceMappingURL=App.js.map
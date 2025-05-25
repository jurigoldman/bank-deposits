"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const authSlice_1 = require("../../features/auth/authSlice");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const MainLayout = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { user } = (0, react_redux_1.useSelector)((state) => state.auth);
    const [anchorEl, setAnchorEl] = react_1.default.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch((0, authSlice_1.logout)());
        handleClose();
    };
    return (<material_1.Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <material_1.AppBar position="static">
        <material_1.Container>
          <material_1.Toolbar disableGutters>
            <material_1.Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
              Bank Deposits
            </material_1.Typography>

            {user ? (<div>
                <material_1.IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                  {user.email ? (<material_1.Avatar sx={{ bgcolor: 'secondary.main' }}>
                      {user.email[0].toUpperCase()}
                    </material_1.Avatar>) : (<icons_material_1.AccountCircle />)}
                </material_1.IconButton>
                <material_1.Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} keepMounted transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} open={Boolean(anchorEl)} onClose={handleClose}>
                  <material_1.MenuItem disabled>{user.email}</material_1.MenuItem>
                  <material_1.MenuItem onClick={handleLogout}>Logout</material_1.MenuItem>
                </material_1.Menu>
              </div>) : (<material_1.Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </material_1.Button>)}
          </material_1.Toolbar>
        </material_1.Container>
      </material_1.AppBar>

      <material_1.Container component="main" sx={{ flex: 1, py: 4 }}>
        <react_router_dom_1.Outlet />
      </material_1.Container>

      <material_1.Box component="footer" sx={{ py: 3, backgroundColor: (theme) => theme.palette.grey[200] }}>
        <material_1.Container maxWidth="lg">
          <material_1.Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Bank Deposits. All rights reserved.
          </material_1.Typography>
        </material_1.Container>
      </material_1.Box>
    </material_1.Box>);
};
exports.default = MainLayout;
//# sourceMappingURL=MainLayout.js.map
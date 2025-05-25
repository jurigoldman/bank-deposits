"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const AppBar_1 = require("@mui/material/AppBar");
const Toolbar_1 = require("@mui/material/Toolbar");
const Typography_1 = require("@mui/material/Typography");
const Button_1 = require("@mui/material/Button");
const IconButton_1 = require("@mui/material/IconButton");
const MonetizationOn_1 = require("@mui/icons-material/MonetizationOn");
const Settings_1 = require("@mui/icons-material/Settings");
const Box_1 = require("@mui/material/Box");
const Navbar = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleLogoClick = () => {
        navigate('/');
    };
    const handleDepositsClick = () => {
        navigate('/deposits');
    };
    const handlePortfolioClick = () => {
        navigate('/portfolio');
    };
    const handleSettingsClick = () => {
        console.log('Settings clicked');
    };
    const handleConnectWallet = () => {
        console.log('Connect wallet clicked');
    };
    return (<AppBar_1.default position="static">
      <Toolbar_1.default>
        <IconButton_1.default edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }} onClick={handleLogoClick}>
          <MonetizationOn_1.default sx={{ fontSize: 40 }}/>  
        </IconButton_1.default>
        
        <Typography_1.default variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
          Bank Deposits
        </Typography_1.default>

        <Button_1.default color="inherit" onClick={handleDepositsClick}>
          Deposits
        </Button_1.default>
        <Button_1.default color="inherit" onClick={handlePortfolioClick}>
          My Portfolio
        </Button_1.default>
        
        <Box_1.default sx={{ flexGrow: 1 }}/> 

        <IconButton_1.default color="inherit" onClick={handleSettingsClick}>
          <Settings_1.default />
        </IconButton_1.default>

        <Button_1.default variant="contained" color="primary" onClick={handleConnectWallet} sx={{ backgroundColor: 'secondary.main', color: 'background.default' }}>
          Connect Wallet
        </Button_1.default>
      </Toolbar_1.default>
    </AppBar_1.default>);
};
exports.Navbar = Navbar;
//# sourceMappingURL=Navbar.js.map
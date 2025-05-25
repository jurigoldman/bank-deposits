"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const ProfilePage = () => {
    const user = (0, react_redux_1.useSelector)((state) => state.auth.user);
    return (<material_1.Container maxWidth="md">
      <material_1.Box sx={{ mt: 4, mb: 4 }}>
        <material_1.Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </material_1.Typography>
        <material_1.Paper sx={{ p: 3 }}>
          <material_1.Typography variant="h6" gutterBottom>
            User Information
          </material_1.Typography>
          {user ? (<>
              <material_1.Typography variant="body1">
                Email: {user.email}
              </material_1.Typography>
              <material_1.Typography variant="body1">
                Role: {user.role}
              </material_1.Typography>
            </>) : (<material_1.Typography variant="body1" color="error">
              User information is not available
            </material_1.Typography>)}
        </material_1.Paper>
      </material_1.Box>
    </material_1.Container>);
};
exports.default = ProfilePage;
//# sourceMappingURL=ProfilePage.js.map
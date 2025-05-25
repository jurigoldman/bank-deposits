"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const HomePage = () => {
    return (<material_1.Container maxWidth="lg">
      <material_1.Box sx={{ mt: 4, mb: 4 }}>
        <material_1.Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Bank Deposits System
        </material_1.Typography>
        <material_1.Typography variant="body1" paragraph>
          Here you can find and compare various bank deposits, as well as manage your own deposits.
        </material_1.Typography>
      </material_1.Box>
    </material_1.Container>);
};
exports.default = HomePage;
//# sourceMappingURL=HomePage.js.map
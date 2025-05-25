"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = require("axios");
const react_router_dom_1 = require("react-router-dom");
const Login = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleLogin = async () => {
        try {
            const response = await axios_1.default.post('/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.access_token);
            navigate('/deposits');
        }
        catch (err) {
            console.error('Login failed:', err);
            if (axios_1.default.isAxiosError(err)) {
                const axiosError = err;
                const errorMessage = (axiosError.response?.data?.message || axiosError.message);
                alert(`Login failed: ${errorMessage}`);
            }
            else {
                alert('Login failed. An unexpected error occurred.');
            }
        }
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    return (<div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
      <button onClick={handleLogin}>Login</button>
    </div>);
};
exports.default = Login;
//# sourceMappingURL=Login.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const apiClient_1 = require("../api/apiClient");
const axios_1 = require("axios");
const Login = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleLogin = async () => {
        setLoading(true);
        try {
            console.log('Sending login request to:', `${apiClient_1.default.defaults.baseURL}/auth/login`);
            const response = await apiClient_1.default.post('/auth/login', {
                email,
                password,
            });
            console.log('Login response:', response.data);
            localStorage.setItem('token', response.data.access_token);
            navigate('/deposits');
        }
        catch (err) {
            console.error('Login failed:', err);
            if (err instanceof axios_1.AxiosError) {
                const axiosError = err;
                const errorMessage = axiosError.response?.data?.message || axiosError.message;
                alert(`Login failed: ${errorMessage}`);
            }
            else {
                alert('Login failed. An unexpected error occurred.');
            }
        }
        finally {
            setLoading(false);
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
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} disabled={loading}/>
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} disabled={loading}/>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Loading...' : 'Login'} 
      </button>
    </div>);
};
exports.default = Login;
//# sourceMappingURL=Login.js.map
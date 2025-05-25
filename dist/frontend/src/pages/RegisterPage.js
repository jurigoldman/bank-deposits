"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const authSlice_1 = require("../features/auth/authSlice");
const material_1 = require("@mui/material");
const RegisterPage = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    const [passwordError, setPasswordError] = (0, react_1.useState)('');
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { status, error } = (0, react_redux_1.useSelector)((state) => state.auth);
    (0, react_1.useEffect)(() => {
        return () => {
            dispatch((0, authSlice_1.clearError)());
        };
    }, [dispatch]);
    const validateForm = () => {
        if (password !== confirmPassword) {
            setPasswordError('Пароли не совпадают');
            return false;
        }
        if (password.length < 6) {
            setPasswordError('Пароль должен содержать не менее 6 символов');
            return false;
        }
        setPasswordError('');
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const resultAction = await dispatch((0, authSlice_1.register)({ email, password }));
        if (authSlice_1.register.fulfilled.match(resultAction)) {
            navigate('/');
        }
    };
    return (<material_1.Container component="main" maxWidth="xs">
      <material_1.Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
        <material_1.Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <material_1.Typography component="h1" variant="h5" align="center" gutterBottom>
            Регистрация
          </material_1.Typography>
          
          {error && (<material_1.Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </material_1.Alert>)}
          
          <material_1.Box component="form" onSubmit={handleSubmit} noValidate>
            <material_1.TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === 'loading'}/>
            <material_1.TextField margin="normal" required fullWidth name="password" label="Пароль" type="password" id="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} error={!!passwordError} helperText={passwordError} disabled={status === 'loading'}/>
            <material_1.TextField margin="normal" required fullWidth name="confirmPassword" label="Подтвердите пароль" type="password" id="confirmPassword" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={!!passwordError} helperText={passwordError} disabled={status === 'loading'}/>
            <material_1.Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={status === 'loading'}>
              {status === 'loading' ? <material_1.CircularProgress size={24}/> : 'Зарегистрироваться'}
            </material_1.Button>
            <material_1.Box sx={{ textAlign: 'center' }}>
              <react_router_dom_1.Link to="/login" style={{ textDecoration: 'none' }}>
                <material_1.Button color="primary">Уже есть аккаунт? Войти</material_1.Button>
              </react_router_dom_1.Link>
            </material_1.Box>
          </material_1.Box>
        </material_1.Paper>
      </material_1.Box>
    </material_1.Container>);
};
exports.default = RegisterPage;
//# sourceMappingURL=RegisterPage.js.map
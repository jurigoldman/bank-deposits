"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositForm = void 0;
const react_1 = require("react");
const TextField_1 = require("@mui/material/TextField");
const Button_1 = require("@mui/material/Button");
const Box_1 = require("@mui/material/Box");
const Grid_1 = require("@mui/material/Grid");
const InputAdornment_1 = require("@mui/material/InputAdornment");
const DepositForm = ({ params, onParamsChange }) => {
    const handleChange = (event) => {
        onParamsChange({
            ...params,
            [event.target.name]: event.target.value,
        });
    };
    return (<Box_1.default component="form" noValidate autoComplete="off">
      <Grid_1.default container spacing={2}>
        <Grid_1.default item xs={12}>
          <TextField_1.default fullWidth label="Сумма депозита" name="amount" type="number" value={params.amount} onChange={handleChange} variant="outlined" InputProps={{
            endAdornment: <InputAdornment_1.default position="end">₽</InputAdornment_1.default>,
        }}/>
        </Grid_1.default>
        <Grid_1.default item xs={12}>
          <TextField_1.default fullWidth label="Срок депозита" name="term" type="number" value={params.term} onChange={handleChange} variant="outlined" InputProps={{
            endAdornment: <InputAdornment_1.default position="end">мес.</InputAdornment_1.default>,
        }}/>
        </Grid_1.default>
         
        
        
        <Grid_1.default item xs={12} sx={{ mt: 1 }}>
            <Button_1.default variant="contained" color="secondary" fullWidth sx={{
            py: 1.5,
            fontSize: '1.1rem',
            backgroundColor: 'secondary.main',
            '&:hover': {
                backgroundColor: 'secondary.dark',
            }
        }}>
                Подобрать предложения
            </Button_1.default>
        </Grid_1.default>
      </Grid_1.default>
    </Box_1.default>);
};
exports.DepositForm = DepositForm;
//# sourceMappingURL=DepositForm.js.map
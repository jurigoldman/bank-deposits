"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositsPage = void 0;
const react_1 = require("react");
const Box_1 = require("@mui/material/Box");
const Typography_1 = require("@mui/material/Typography");
const Grid_1 = require("@mui/material/Grid");
const Paper_1 = require("@mui/material/Paper");
const DepositForm_1 = require("../features/deposits/DepositForm");
const BankOffersTable_1 = require("../features/deposits/BankOffersTable");
const mockOffers = [
    {
        id: '1',
        bankName: 'SberBank',
        rate: 0.075,
        minAmount: 50000,
        maxAmount: 1000000,
        minTerm: 6,
        maxTerm: 24,
        currency: 'RUB',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Sberbank_Logo_2020.svg/2560px-Sberbank_Logo_2020.svg.png',
        compoundingFrequency: 'monthly',
    },
    {
        id: '2',
        bankName: 'Tinkoff Bank',
        rate: 0.082,
        minAmount: 10000,
        minTerm: 3,
        currency: 'RUB',
        logoUrl: 'https://acdn.tinkoff.ru/static/documents/19a28a7a-7465-4397-8949-279cb3b49996.png',
        compoundingFrequency: 'end_of_term',
    },
    {
        id: '3',
        bankName: 'VTB',
        rate: 0.070,
        minAmount: 30000,
        minTerm: 12,
        maxTerm: 36,
        currency: 'RUB',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/VTB_logo_2018.svg/1200px-VTB_logo_2018.svg.png',
        specialConditions: ['Online only', 'New clients']
    },
];
const DepositsPage = () => {
    const [offers, setOffers] = react_1.default.useState(mockOffers);
    const [depositParams, setDepositParams] = react_1.default.useState({ amount: '', term: '' });
    const handleFormChange = (newParams) => {
        setDepositParams(newParams);
        console.log('Form params changed:', newParams);
    };
    return (<Box_1.default sx={{ flexGrow: 1 }}>
      <Grid_1.default container spacing={3}>
         
        <Grid_1.default item xs={12} md={4}>
          <Paper_1.default sx={{ p: 2 }}>
            <Typography_1.default variant="h6" gutterBottom component="div">
              Рассчитать депозит
            </Typography_1.default>
            <DepositForm_1.DepositForm params={depositParams} onParamsChange={handleFormChange}/>
          </Paper_1.default>
        </Grid_1.default>

         
        <Grid_1.default item xs={12} md={8}>
          <Typography_1.default variant="h5" gutterBottom component="div" sx={{ mb: 2 }}>
            Предложения банков
          </Typography_1.default>
          <BankOffersTable_1.BankOffersTable offers={offers}/>
        </Grid_1.default>
      </Grid_1.default>
    </Box_1.default>);
};
exports.DepositsPage = DepositsPage;
//# sourceMappingURL=DepositsPage.js.map
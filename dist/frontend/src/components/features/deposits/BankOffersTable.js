"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankOffersTable = void 0;
const react_1 = require("react");
const Table_1 = require("@mui/material/Table");
const TableBody_1 = require("@mui/material/TableBody");
const TableCell_1 = require("@mui/material/TableCell");
const TableContainer_1 = require("@mui/material/TableContainer");
const TableHead_1 = require("@mui/material/TableHead");
const TableRow_1 = require("@mui/material/TableRow");
const Paper_1 = require("@mui/material/Paper");
const Button_1 = require("@mui/material/Button");
const Avatar_1 = require("@mui/material/Avatar");
const Box_1 = require("@mui/material/Box");
const Typography_1 = require("@mui/material/Typography");
const formatRate = (rate) => {
    return `${(rate * 100).toFixed(2)}%`;
};
const formatTerm = (minTerm, maxTerm) => {
    if (maxTerm !== undefined) {
        if (minTerm === maxTerm)
            return `${minTerm} мес.`;
        return `${minTerm} - ${maxTerm} мес.`;
    }
    return `от ${minTerm} мес.`;
};
const formatAmount = (amount) => {
    if (amount === undefined)
        return '-';
    return `${amount.toLocaleString('ru-RU')} ₽`;
};
const BankOffersTable = ({ offers }) => {
    if (!offers || offers.length === 0) {
        return (<Paper_1.default sx={{ textAlign: 'center', p: 3 }}>
        <Typography_1.default variant="subtitle1">Нет доступных предложений по вашему запросу.</Typography_1.default>
      </Paper_1.default>);
    }
    return (<TableContainer_1.default component={Paper_1.default} sx={{}}>
      <Table_1.default sx={{ minWidth: 650 }} aria-label="bank offers table">
        <TableHead_1.default sx={{}}>
          <TableRow_1.default>
            <TableCell_1.default>Банк</TableCell_1.default>
            <TableCell_1.default align="right">Ставка</TableCell_1.default>
            <TableCell_1.default align="right">Срок</TableCell_1.default>
            <TableCell_1.default align="right">Сумма</TableCell_1.default>
            <TableCell_1.default align="center">Условия</TableCell_1.default>
            <TableCell_1.default align="center">Действие</TableCell_1.default>
          </TableRow_1.default>
        </TableHead_1.default>
        <TableBody_1.default>
          {offers.map((offer) => (<TableRow_1.default key={offer.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell_1.default component="th" scope="row">
                <Box_1.default sx={{ display: 'flex', alignItems: 'center' }}>
                  {offer.logoUrl && (<Avatar_1.default src={offer.logoUrl} sx={{ mr: 1.5, width: 32, height: 32 }} variant="rounded"/>)}
                  <Typography_1.default variant="body2" component="span" sx={{ fontWeight: 'medium' }}>{offer.bankName}</Typography_1.default>
                </Box_1.default>
              </TableCell_1.default>
              <TableCell_1.default align="right">
                <Typography_1.default variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{formatRate(offer.rate)}</Typography_1.default>
              </TableCell_1.default>
              <TableCell_1.default align="right">{formatTerm(offer.minTerm, offer.maxTerm)}</TableCell_1.default>
              <TableCell_1.default align="right">
                {offer.minAmount !== undefined ? `от ${formatAmount(offer.minAmount)}` : 'Любая'}
                {offer.maxAmount !== undefined ? ` до ${formatAmount(offer.maxAmount)}` : ''}
              </TableCell_1.default>
              <TableCell_1.default align="center">
                {offer.specialConditions && offer.specialConditions.length > 0
                ? offer.specialConditions.join(', ')
                : '-'}
                </TableCell_1.default>
              <TableCell_1.default align="center">
                <Button_1.default variant="outlined" color="secondary" size="small">
                  Выбрать
                </Button_1.default>
              </TableCell_1.default>
            </TableRow_1.default>))}
        </TableBody_1.default>
      </Table_1.default>
    </TableContainer_1.default>);
};
exports.BankOffersTable = BankOffersTable;
//# sourceMappingURL=BankOffersTable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = require("axios");
const CompareBankOffers = () => {
    const [results, setResults] = (0, react_1.useState)([]);
    const [amount, setAmount] = (0, react_1.useState)('');
    const [term, setTerm] = (0, react_1.useState)('');
    const handleCompare = async () => {
        const numericAmount = parseInt(amount, 10);
        const numericTerm = parseInt(term, 10);
        if (isNaN(numericAmount) || isNaN(numericTerm) || numericAmount <= 0 || numericTerm <= 0) {
            alert('Please enter valid positive numbers for amount and term.');
            return;
        }
        try {
            const response = await axios_1.default.get('/bank-offers/compare', {
                params: {
                    amount: numericAmount,
                    term: numericTerm
                },
            });
            setResults(response.data);
        }
        catch (error) {
            console.error('Failed to compare bank offers:', error);
            if (axios_1.default.isAxiosError(error)) {
                const axiosError = error;
                let errorMessage = axiosError.message;
                if (axiosError.response) {
                    if (axiosError.response.data && typeof axiosError.response.data === 'object' && 'message' in axiosError.response.data) {
                        errorMessage = axiosError.response.data.message;
                    }
                    else if (typeof axiosError.response.data === 'string') {
                        errorMessage = axiosError.response.data;
                    }
                }
                alert(`Failed to compare offers: ${errorMessage}`);
            }
            else {
                alert('Failed to compare offers. An unexpected error occurred.');
            }
        }
    };
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };
    const handleTermChange = (e) => {
        setTerm(e.target.value);
    };
    return (<div>
      <h2>Compare Bank Offers</h2>
      <input type="number" placeholder="Amount" value={amount} onChange={handleAmountChange}/>
      <input type="number" placeholder="Term (months)" value={term} onChange={handleTermChange}/>
      <button onClick={handleCompare}>Compare</button>
      {results.length > 0 && (<ul>
          {results.map((offer) => (<li key={offer._id}>
              <strong>{offer.bankName}</strong> {offer.productName && `(${offer.productName})`}
              <br />
              Rate: {offer.interestRate}% | Term: {offer.termMonths} months
              <br />
              Min Amount: {offer.minAmount} 
              {offer.maxAmount !== null && offer.maxAmount !== undefined && offer.maxAmount !== Infinity ? ` | Max Amount: ${offer.maxAmount}` : ''}
              <br />
              For your deposit of {offer.depositAmount} over {offer.depositTermMonths} months:
              <br />
              <strong>Calculated Profit: {offer.profit}</strong>
            </li>))}
        </ul>)}
    </div>);
};
exports.default = CompareBankOffers;
//# sourceMappingURL=CompareBankOffers.js.map
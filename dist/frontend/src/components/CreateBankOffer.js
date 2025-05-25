"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = require("axios");
const react_router_dom_1 = require("react-router-dom");
const CreateBankOffer = () => {
    const [bankName, setBankName] = (0, react_1.useState)('');
    const [productName, setProductName] = (0, react_1.useState)('');
    const [interestRate, setInterestRate] = (0, react_1.useState)('');
    const [minAmount, setMinAmount] = (0, react_1.useState)('');
    const [maxAmount, setMaxAmount] = (0, react_1.useState)('');
    const [termMonths, setTermMonths] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = async () => {
        const rate = parseFloat(interestRate);
        const term = parseInt(termMonths, 10);
        const min = parseInt(minAmount, 10);
        const max = maxAmount ? parseInt(maxAmount, 10) : undefined;
        if (!bankName || isNaN(rate) || isNaN(term) || isNaN(min)) {
            alert('Please fill in all required fields correctly (Bank Name, Interest Rate, Term, Min Amount).');
            return;
        }
        if (rate <= 0 || term <= 0 || min < 0) {
            alert('Interest Rate, Term, and Min Amount must be positive values.');
            return;
        }
        if (max !== undefined && max < min) {
            alert('Max Amount cannot be less than Min Amount.');
            return;
        }
        const payload = {
            bankName,
            productName: productName || undefined,
            interestRate: rate,
            minAmount: min,
            maxAmount: max,
            termMonths: term,
        };
        try {
            const token = localStorage.getItem('token');
            await axios_1.default.post('/bank-offers', payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/bank-offers');
        }
        catch (error) {
            console.error('Failed to create bank offer:', error);
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
                alert(`Failed to create offer: ${errorMessage}`);
            }
            else {
                alert('Failed to create offer. An unexpected error occurred.');
            }
        }
    };
    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };
    return (<div>
      <h2>Create Bank Offer</h2>
      <input type="text" placeholder="Bank Name*" value={bankName} onChange={handleChange(setBankName)}/>
      <input type="text" placeholder="Product Name (optional)" value={productName} onChange={handleChange(setProductName)}/>
      <input type="number" placeholder="Interest Rate (%)*" value={interestRate} onChange={handleChange(setInterestRate)}/>
      <input type="number" placeholder="Min Amount*" value={minAmount} onChange={handleChange(setMinAmount)}/>
      <input type="number" placeholder="Max Amount (optional)" value={maxAmount} onChange={handleChange(setMaxAmount)}/>
      <input type="number" placeholder="Term (months)*" value={termMonths} onChange={handleChange(setTermMonths)}/>
      <button onClick={handleSubmit}>Create Offer</button>
    </div>);
};
exports.default = CreateBankOffer;
//# sourceMappingURL=CreateBankOffer.js.map
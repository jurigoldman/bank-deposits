"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = require("axios");
const BankOfferList = () => {
    const [bankOffers, setBankOffers] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchBankOffers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.warn('No token found, user might need to login.');
                    return;
                }
                const response = await axios_1.default.get('/bank-offers', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBankOffers(response.data);
            }
            catch (error) {
                console.error('Failed to fetch bank offers:', error);
                if (axios_1.default.isAxiosError(error)) {
                    const axiosError = error;
                    let errorMessage = axiosError.message;
                    if (axiosError.response?.data && typeof axiosError.response.data === 'object' && 'message' in axiosError.response.data) {
                        errorMessage = axiosError.response.data.message;
                    }
                    else if (typeof axiosError.response?.data === 'string') {
                        errorMessage = axiosError.response.data;
                    }
                    alert(`Failed to load offers: ${errorMessage}`);
                }
                else {
                    alert('Failed to load offers. An unexpected error occurred.');
                }
            }
        };
        fetchBankOffers();
    }, []);
    return (<div>
      <h2>Bank Offers</h2> 
      {bankOffers.length === 0 ? (<p>No bank offers available at the moment.</p>) : (<ul>
          {bankOffers.map((offer) => (<li key={offer._id}>
              <strong>{offer.bankName}</strong>
              {offer.productName && ` - ${offer.productName}`}
              <br />
              Rate: {offer.interestRate}% | Term: {offer.termMonths} months
              <br />
              Amount: {offer.minAmount} - {offer.maxAmount !== Infinity ? offer.maxAmount : 'No limit'}
            </li>))}
        </ul>)}
    </div>);
};
exports.default = BankOfferList;
//# sourceMappingURL=BankOfferList.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const DepositsPage = () => {
    const { user } = (0, react_redux_1.useSelector)((state) => state.auth);
    return (<div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Deposits</h1>
      {user ? (<div>
          <p className="mb-4">
            Welcome, {user.email}! View your deposits based on your role: {user.role}.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Deposit #1</h2>
              <p>Amount: $1,000</p>
              <p>Rate: 5%</p>
              <react_router_dom_1.Link to="/deposit/1" className="text-blue-500 hover:underline">
                View Details
              </react_router_dom_1.Link>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Deposit #2</h2>
              <p>Amount: $2,500</p>
              <p>Rate: 3.5%</p>
              <react_router_dom_1.Link to="/deposit/2" className="text-blue-500 hover:underline">
                View Details
              </react_router_dom_1.Link>
            </div>
          </div>
          {user.role === 'admin' && (<react_router_dom_1.Link to="/create-deposit" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Create New Deposit
            </react_router_dom_1.Link>)}
        </div>) : (<p className="text-red-500">Please log in to view your deposits.</p>)}
    </div>);
};
exports.default = DepositsPage;
//# sourceMappingURL=DepositsPage.js.map
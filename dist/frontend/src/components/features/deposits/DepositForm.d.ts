import React from 'react';
interface DepositFormParams {
    amount: string;
    term: string;
}
interface DepositFormProps {
    params: DepositFormParams;
    onParamsChange: (params: DepositFormParams) => void;
}
export declare const DepositForm: React.FC<DepositFormProps>;
export {};

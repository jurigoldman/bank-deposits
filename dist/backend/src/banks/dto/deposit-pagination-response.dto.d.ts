import { DepositResponseDto } from './deposit-response.dto';
export declare class DepositPaginationResponseDto {
    data: DepositResponseDto[];
    total: number;
    page: number;
    limit: number;
}

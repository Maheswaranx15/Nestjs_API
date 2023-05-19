import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class MintNftDto {
  @IsString()
  tokenURI: string;

  @IsNumber()
  royaltyFee: number;
}

export class MintRequestDTO {
  @IsString()
  tokenURI: string;

  @IsNumber()
  royaltyFee: number;
}

export class MintResponseDTO {
  @IsString()
  message: string;

  @IsString()
  transactionHash: string;

  @IsString()
  tokenId: string;
}

export class MultiplemintResponseDTO {
  @IsString()
  Transactionhash: string;

  @IsString()
  message: string;
}

export class ApproveTransferDto {
  @IsString()
  to: string;

  @IsNumber()
  tokenId: number;
}

export class BurnTokenDto {
  @IsNumber()
  tokenId: number;
}

export class MintMultipleDto {
  @IsString()
  account: string;

  @IsNumber()
  id: number;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  data?: string;
}

export class MintBatchDto {
  @IsString()
  to: string;

  @IsArray()
  ids: number[];

  @IsArray()
  amounts: number[];

  @IsOptional()
  @IsString()
  data?: string;
}

export class BatchmintResponseDTO {
  @IsString()
  Transactionhash: string;

  @IsString()
  message: string;
}
export class BatchMintToAddressesDto {
  @IsArray()
  accounts: string[];

  @IsNumber()
  id: number;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  data?: string;
}

export class BatchMintToAddressesResponseDto {
  @IsString()
  Transactionhash: string;

  @IsString()
  message: string;
}

export class burnResponseDTO {
  @IsString()
  message: string;

  @IsString()
  Transactionhash: string;
}

export class burnRequestDTO {
  @IsNumber()
  tokenId: number;
}

export class balanceResponseDTO {
  @IsString()
  balance: string;
}

export class balance1155DTO {
  @IsString()
  accounts: string;

  @IsNumber()
  id: number;
}

export class balanceOf1155ResponseDTO {
  @IsString()
  balance: number;
}

export class burn1155DTO {
  @IsString()
  accounts: string;

  @IsNumber()
  id: number;

  @IsNumber()
  value: number;
}

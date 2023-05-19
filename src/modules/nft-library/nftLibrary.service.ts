import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { erc1155 } from '../nft-library/abi/erc1155';
import { erc721 } from '../nft-library/abi/erc721';
import {
  BatchMintToAddressesResponseDto,
  BatchmintResponseDTO,
  MintResponseDTO,
  MultiplemintResponseDTO,
  balanceOf1155ResponseDTO,
  balanceResponseDTO,
  burnResponseDTO,
} from './nftLibrary.dto';

@Injectable()
export class NftLibraryService {
  constructor(private readonly httpService: HttpService) {}

  async getGasPrice(): Promise<{ maxFeePerGas: number; maxPriorityFeePerGas: number }> {
    const { data } = await this.httpService.axiosRef.get(process.env.GAS_STATION_URL);
    const maxFeePerGas = Math.ceil(data.standard.maxFee) * 10 ** 9;
    const maxPriorityFeePerGas = Math.ceil(data.standard.maxPriorityFee) * 10 ** 9;
    return { maxFeePerGas, maxPriorityFeePerGas };
  }
  async mintNft(tokenURI: string, royaltyFee: number): Promise<MintResponseDTO> {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
    const signer = new ethers.Wallet(process.env.MINTER_KEY, provider);
    const contract = new ethers.Contract(erc721.address, erc721.abi, signer);
    const { maxFeePerGas, maxPriorityFeePerGas } = await this.getGasPrice();
    const tx = await contract.mint(tokenURI, royaltyFee, { maxFeePerGas, maxPriorityFeePerGas });
    const receipt = await tx.wait();
    console.log(receipt);

    const tokenId = receipt.events[0].args[2];
    return {
      message: 'NFT minted successfully',
      transactionHash: receipt.transactionHash,
      tokenId: tokenId.toString(),
    };
  }

  async mintMultipleNfts(account: string, id: number, amount: number, data: string): Promise<MultiplemintResponseDTO> {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
    const signer = new ethers.Wallet(process.env.MINTER_KEY, provider);
    const contract = new ethers.Contract(erc1155.address, erc1155.abi, signer);
    const { maxFeePerGas, maxPriorityFeePerGas } = await this.getGasPrice();
    const tx = await contract.mint(account, id, amount, data, { maxFeePerGas, maxPriorityFeePerGas });
    const receipt = await tx.wait();
    return {
      Transactionhash: receipt.transactionHash,
      message: 'NFT minted successfully',
    };
  }

  async batchMint(to: string, ids: number[], amounts: number[], data: string): Promise<BatchmintResponseDTO> {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
    const signer = new ethers.Wallet(process.env.MINTER_KEY, provider);
    const contract = new ethers.Contract(erc1155.address, erc1155.abi, signer);
    const { maxFeePerGas, maxPriorityFeePerGas } = await this.getGasPrice();
    const tx = await contract.mintBatch(to, [ids], [amounts], data, { maxFeePerGas, maxPriorityFeePerGas });
    const receipt = await tx.wait();
    return {
      Transactionhash: receipt.transactionHash,
      message: 'NFT minted successfully',
    };
  }

  async batchMintToAddress(accounts: string[], id: number, amount: number, data: string): Promise<BatchMintToAddressesResponseDto> {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
    const signer = new ethers.Wallet(process.env.MINTER_KEY, provider);
    const contract = new ethers.Contract(erc1155.address, erc1155.abi, signer);
    const { maxFeePerGas, maxPriorityFeePerGas } = await this.getGasPrice();
    const tx = await contract.batchMintToAddresses(accounts, id, amount, data, { maxFeePerGas, maxPriorityFeePerGas });
    const receipt = await tx.wait();
    return {
      Transactionhash: receipt.transactionHash,
      message: 'NFT minted successfully',
    };
  }

  async balanceOf(owner: string): Promise<balanceResponseDTO> {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
    const signer = new ethers.Wallet(process.env.MINTER_KEY, provider);
    const contract = new ethers.Contract(erc721.address, erc721.abi, signer);
    const balance = await contract.balanceOf(owner);
    return {
      balance: balance.toString(),
    };
  }

  async burnNft(tokenId: number): Promise<burnResponseDTO> {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
    const signer = new ethers.Wallet(process.env.MINTER_KEY, provider);
    const contract = new ethers.Contract(erc721.address, erc721.abi, signer);
    const { maxFeePerGas, maxPriorityFeePerGas } = await this.getGasPrice();
    const tx = await contract.burn(tokenId, { maxFeePerGas, maxPriorityFeePerGas });
    const receipt = await tx.wait();
    return {
      message: 'NFT burn successfully',
      Transactionhash: receipt.transactionHash,
    };
  }

  async balanceOf1155(accounts: string, id: number): Promise<balanceOf1155ResponseDTO> {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
    const signer = new ethers.Wallet(process.env.MINTER_KEY, provider);
    const contract = new ethers.Contract(erc1155.address, erc1155.abi, signer);
    const balance = await contract.balanceOf(accounts, id);
    return {
      balance: balance.toString(),
    };
  }

  async burnMultipleNfts(account: string, id: number, value: number): Promise<burnResponseDTO> {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
    const signer = new ethers.Wallet(process.env.MINTER_KEY, provider);
    const contract = new ethers.Contract(erc1155.address, erc1155.abi, signer);
    const { maxFeePerGas, maxPriorityFeePerGas } = await this.getGasPrice();
    const tx = await contract.burn(account, id, value, { maxFeePerGas, maxPriorityFeePerGas });
    const receipt = await tx.wait();
    return {
      message: 'NFT burn successfully',
      Transactionhash: receipt.transactionHash,
    };
  }
}

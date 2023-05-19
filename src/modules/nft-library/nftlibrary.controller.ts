import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  BatchMintToAddressesDto,
  BatchMintToAddressesResponseDto,
  MintBatchDto,
  MintMultipleDto,
  MintRequestDTO,
  MintResponseDTO,
  MultiplemintResponseDTO,
  balance1155DTO,
  balanceOf1155ResponseDTO,
  balanceResponseDTO,
  burn1155DTO,
  burnResponseDTO,
} from './nftLibrary.dto';
import { NftLibraryService } from './nftLibrary.service';

@ApiTags('nftLibrary')
@Controller('/nfts')
export class NftLibraryController {
  constructor(private readonly nftLibraryService: NftLibraryService) {}
  @Get('/balance721/:address')
  @ApiOperation({ summary: 'Get balance of an address' })
  @ApiOkResponse({
    description: 'Returns the balance of an address',
  })
  async balanceOf(@Param('address') address: string): Promise<balanceResponseDTO> {
    try {
      console.log(address);

      return await this.nftLibraryService.balanceOf(address);
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Error retrieving balance');
    }
  }

  @Post('/mint')
  @ApiOperation({ summary: 'Mint ERC721 NFT' })
  @ApiOkResponse({
    description: 'Returns a success message with transaction hash and token ID',
    type: MintResponseDTO,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Invalid input parameters' })
  async mintNft(@Body() body: MintRequestDTO): Promise<MintResponseDTO> {
    try {
      const { tokenURI, royaltyFee } = body;
      console.log(body);
      // Validate input parameters
      if (!tokenURI || typeof tokenURI !== 'string' || !royaltyFee || typeof royaltyFee !== 'number') {
        throw new Error('Invalid input parameters');
      }
      return await this.nftLibraryService.mintNft(tokenURI, royaltyFee);
    } catch (error) {
      console.error(error);
      throw error; // Throw the original error object instead of creating a new one
    }
  }
  @Post('/burn/:tokenId')
  @ApiOperation({ summary: 'Burns ERC721 NFT' })
  @ApiOkResponse({
    description: 'Returns a success message with transaction hash and token ID',
    type: burnResponseDTO,
    isArray: false,
  })
  async burn(@Param('tokenId') tokenId: number): Promise<burnResponseDTO> {
    try {
      // Validate input parameters
      if (isNaN(tokenId)) {
        throw new Error('Invalid input parameter: tokenId must be a number');
      }

      return await this.nftLibraryService.burnNft(tokenId);
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Invalid input parameters');
    }
  }

  @Post('/mint/erc1155')
  @ApiOperation({ summary: 'Mint Multiple Tokens' })
  @ApiOkResponse({
    description: 'Returns a success message',
    type: MintMultipleDto,
    isArray: false,
  })
  async mint(@Body() body: MintMultipleDto): Promise<MultiplemintResponseDTO> {
    try {
      const { account, id, amount, data } = body;
      console.log(body);
      return await this.nftLibraryService.mintMultipleNfts(account, id, amount, data);
    } catch (error) {
      console.error(error);
      throw new Error('Error minting tokens');
    }
  }

  @Post('/batchMint/erc1155')
  @ApiOperation({ summary: 'BatchMint Multiple Tokens' })
  @ApiOkResponse({
    description: 'Returns a success message',
    type: MintBatchDto,
    isArray: false,
  })
  async batchMint(@Body() body: MintBatchDto): Promise<MultiplemintResponseDTO> {
    try {
      const { to, ids, amounts, data } = body;
      console.log(body);
      return await this.nftLibraryService.batchMint(to, ids, amounts, data);
    } catch (error) {
      console.error(error);
      throw new Error('Error minting tokens');
    }
  }

  @Post('/batchMintToAddress/erc1155')
  @ApiOperation({ summary: 'batchMintToAddress Multiple Tokens' })
  @ApiOkResponse({
    description: 'Returns a success message',
    type: BatchMintToAddressesDto,
    isArray: false,
  })
  async batchMintToAddress(@Body() body: BatchMintToAddressesDto): Promise<BatchMintToAddressesResponseDto> {
    {
      try {
        const { accounts, id, amount, data } = body;
        console.log(body);
        return await this.nftLibraryService.batchMintToAddress(accounts, id, amount, data);
      } catch (error) {
        console.error(error);
        throw new Error('Error minting tokens');
      }
    }
  }

  @Get('/balance1155')
  @ApiOperation({ summary: 'Get balance of an address' })
  @ApiOkResponse({
    description: 'Returns the balance of an address',
  })
  async balanceOf1155(@Body() body: balance1155DTO): Promise<balanceOf1155ResponseDTO> {
    try {
      const { accounts, id } = body;
      return await this.nftLibraryService.balanceOf1155(accounts, id);
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Error retrieving balance');
    }
  }

  @Post('/burn1155')
  @ApiOperation({ summary: 'Burns ERC1155 NFT' })
  @ApiOkResponse({
    description: 'Returns a success message with transaction hash and token ID',
    type: burnResponseDTO,
    isArray: false,
  })
  async burn1155(@Body() body: burn1155DTO): Promise<burnResponseDTO> {
    try {
      const { accounts, id, value } = body;
      return await this.nftLibraryService.burnMultipleNfts(accounts, id, value);
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Invalid input parameters');
    }
  }
}

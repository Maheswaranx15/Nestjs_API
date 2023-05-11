import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ethers } from 'ethers';
import { indigg721 } from './modules/indigg721';
import { indigg1155 } from './modules/indigg1155';
import { AppService } from './app.service';

@ApiTags('NFT')
@Controller()
export class AppController {
  private provider = new ethers.providers.JsonRpcProvider(
    'https://polygon-mumbai.infura.io/v3/23f6df0cf29e4939a55ac56bacfbb3a9',
  );

  private contract721 = new ethers.Contract(
    indigg721?.address,
    indigg721?.abi,
    this.provider,
  );
  private contract1155 = new ethers.Contract(
    indigg1155?.address,
    indigg1155?.abi,
    this.provider,
  );

  private signer = this.provider.getSigner();

  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get Hello' })
  @ApiOkResponse({ description: 'Returns a string with Hello World' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Get NFT Balance' })
  @ApiOkResponse({
    description: 'Returns the balance of NFTs for a given owner',
  })
  @ApiBadRequestResponse({ description: 'Invalid input parameters' })
  @Get('balanceOf/:owner')
  async getBalance(@Param('owner') owner: string): Promise<any> {
    console.log(`owner :`, owner);
    let bytes32 = ethers.utils.formatBytes32String('sample');
    console.log(bytes32);
    try {
      const balance = await this.contract721.balanceOf(owner);
      return {
        owner,
        balance: balance.toString(),
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error retrieving Balance');
    }
  }

  @ApiOperation({ summary: 'Mint NFT' })
  @ApiOkResponse({
    description: 'Returns a success message with transaction hash and token ID',
  })
  @ApiBadRequestResponse({ description: 'Invalid input parameters' })
  @Post('mint')
  async mintNft(@Body() body: any): Promise<any> {
    const { tokenURI, royaltyFee } = body;
    console.log(body);
    // Validate input parameters
    if (
      !tokenURI ||
      typeof tokenURI !== 'string' ||
      !royaltyFee ||
      typeof royaltyFee !== 'number'
    ) {
      throw new Error('Invalid input parameters');
    }
    try {
      const signer = new ethers.Wallet(
        '4c41ce02966d78bab56aafe767d27ec91ba5f170a7d01f6b548226fcc1b17968',
        this.provider,
      );
      console.log(signer);

      const contractWithSigner = this.contract721.connect(signer);
      // Mint thBody
      const transaction = await contractWithSigner.mint(tokenURI, royaltyFee);
      const receipt = await transaction.wait();
      const tokenId = receipt.events[0].args[2];
      // Return a success response
      return {
        message: 'NFT minted successfully',
        transactionHash: receipt.transactionHash,
        tokenId: tokenId.toString(),
      };
    } catch (error) {
      console.error(error);
      // Return an error response
      throw new Error('Error minting NFT');
    }
  }

  @ApiOperation({ summary: 'Approve NFT Transfer' })
  @ApiOkResponse({
    description: 'Returns a success message with transaction hash',
  })
  @ApiBadRequestResponse({ description: 'Missing parameters' })
  @Post('approve')
  async approveTransfer(@Body() body: any): Promise<any> {
    const { to, tokenId } = body;
    console.log(body);

    if (!to || !tokenId) {
      throw new Error('Missing parameters');
    }
    try {
      // Approve transfer
      const signer = new ethers.Wallet(
        '4c41ce02966d78bab56aafe767d27ec91ba5f170a7d01f6b548226fcc1b17968',
        this.provider,
      );
      console.log(signer);

      const contractWithSigner = this.contract721.connect(signer);
      const tx = await contractWithSigner.approve(to, tokenId);
      const receipt = await tx.wait();

      // Return a success response
      return {
        message: 'NFT transfer approved successfully',
        transactionHash: receipt.transactionHash,
      };
    } catch (error) {
      console.error(error);

      // Return an error response
      throw new Error('Error approving NFT transfer');
    }
  }

  @ApiOperation({ summary: 'Burn NFT' })
  @ApiOkResponse({ description: 'Returns a success message' })
  @Post('/burn')
  @HttpCode(HttpStatus.OK)
  async burnToken(
    @Body() body: { tokenId: number },
  ): Promise<{ message: string }> {
    const { tokenId } = body;
    try {
      const signer = new ethers.Wallet(
        '4c41ce02966d78bab56aafe767d27ec91ba5f170a7d01f6b548226fcc1b17968',
        this.provider,
      );
      console.log(signer);
      const contractWithSigner = this.contract721.connect(signer);
      const tx = await contractWithSigner.burn(tokenId);
      await tx.wait();
      return { message: `Token with ID ${tokenId} burned successfully` };
    } catch (error) {
      console.error(error);
      throw new Error('Error burning token');
    }
  }

  @ApiOperation({ summary: 'Mint Multiple Tokens' })
  @ApiOkResponse({ description: 'Returns a success message' })
  @Post('mintMultiple')
  @HttpCode(HttpStatus.OK)
  async mint(
    @Body() body: { account: string; id: number; amount: number; data: string },
  ): Promise<{ message: string }> {
    const { account, id, amount, data } = body;
    try {
      // Perform mint
      const signer = new ethers.Wallet(
        '4c41ce02966d78bab56aafe767d27ec91ba5f170a7d01f6b548226fcc1b17968',
        this.provider,
      );
      const contractWithSigner = this.contract1155.connect(signer);
      const tx = await contractWithSigner.mint(account, id, amount, data);
      const receipt = await tx.wait();
      return {
        message: `Minted ${amount} tokens of ID ${id} to account ${account} successfully`,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error minting tokens');
    }
  }

  @ApiOperation({ summary: 'Mint Batch of Tokens' })
  @ApiOkResponse({ description: 'Returns a success message' })
  @Post('mintBatch')
  @HttpCode(HttpStatus.OK)
  async mintBatch(
    @Body()
    body: {
      to: string;
      ids: number[];
      amounts: number[];
      data: string;
    },
  ): Promise<{ message: string }> {
    const { to, ids, amounts, data } = body;
    try {
      // Perform batch minting
      const signer = new ethers.Wallet(
        '4c41ce02966d78bab56aafe767d27ec91ba5f170a7d01f6b548226fcc1b17968',
        this.provider,
      );
      const contractWithSigner = this.contract1155.connect(signer);
      await contractWithSigner.mintBatch(to, ids, amounts, data);
      return { message: `Tokens minted successfully` };
    } catch (error) {
      console.error(error);
      throw new Error('Error minting tokens');
    }
  }

  @ApiOperation({ summary: 'Batch Mint to Multiple Addresses' })
  @ApiOkResponse({ description: 'Returns a success message' })
  @Post('batchMintToAddresses')
  @HttpCode(HttpStatus.OK)
  async batchMintToAddresses(
    @Body()
    body: {
      accounts: string[];
      id: number;
      amount: number;
      data: string;
    },
  ): Promise<{ message: string }> {
    const { accounts, id, amount, data } = body;
    console.log(body);
    try {
      // Perform batch mint
      const signer = new ethers.Wallet(
        '4c41ce02966d78bab56aafe767d27ec91ba5f170a7d01f6b548226fcc1b17968',
        this.provider,
      );
      console.log(signer);
      const contractWithSigner = this.contract1155.connect(signer);
      await contractWithSigner.batchMintToAddresses(accounts, id, amount, data);
      return {
        message: `Minted ${amount} tokens with ID ${id} to ${accounts.length} accounts successfully`,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error minting tokens');
    }
  }
}

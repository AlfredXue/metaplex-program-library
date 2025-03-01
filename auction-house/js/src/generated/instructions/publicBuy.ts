import * as splToken from '@solana/spl-token';
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

export type PublicBuyInstructionArgs = {
  tradeStateBump: number;
  escrowPaymentBump: number;
  buyerPrice: beet.bignum;
  tokenSize: beet.bignum;
};
const publicBuyStruct = new beet.BeetArgsStruct<
  PublicBuyInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['tradeStateBump', beet.u8],
    ['escrowPaymentBump', beet.u8],
    ['buyerPrice', beet.u64],
    ['tokenSize', beet.u64],
  ],
  'PublicBuyInstructionArgs',
);
/**
 * Accounts required by the _publicBuy_ instruction
 */
export type PublicBuyInstructionAccounts = {
  wallet: web3.PublicKey;
  paymentAccount: web3.PublicKey;
  transferAuthority: web3.PublicKey;
  treasuryMint: web3.PublicKey;
  tokenAccount: web3.PublicKey;
  metadata: web3.PublicKey;
  escrowPaymentAccount: web3.PublicKey;
  authority: web3.PublicKey;
  auctionHouse: web3.PublicKey;
  auctionHouseFeeAccount: web3.PublicKey;
  buyerTradeState: web3.PublicKey;
};

const publicBuyInstructionDiscriminator = [169, 84, 218, 35, 42, 206, 16, 171];

/**
 * Creates a _PublicBuy_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 */
export function createPublicBuyInstruction(
  accounts: PublicBuyInstructionAccounts,
  args: PublicBuyInstructionArgs,
) {
  const {
    wallet,
    paymentAccount,
    transferAuthority,
    treasuryMint,
    tokenAccount,
    metadata,
    escrowPaymentAccount,
    authority,
    auctionHouse,
    auctionHouseFeeAccount,
    buyerTradeState,
  } = accounts;

  const [data] = publicBuyStruct.serialize({
    instructionDiscriminator: publicBuyInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: wallet,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: paymentAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: transferAuthority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: treasuryMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: tokenAccount,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: metadata,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: escrowPaymentAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: authority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: auctionHouse,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: auctionHouseFeeAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: buyerTradeState,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId: new web3.PublicKey('hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk'),
    keys,
    data,
  });
  return ix;
}

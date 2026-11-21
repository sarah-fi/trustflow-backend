import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { STELLAR_ADDRESS_REGEX } from '../escrow/escrow.dto';

/** Stellar's hard limit for text memo content, in bytes. */
export const STELLAR_MEMO_MAX_BYTES = 28;

export class BuildReleaseTransactionQueryDto {
  @ApiProperty({
    description: 'Stellar address that will sign and submit the transaction',
    example: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(STELLAR_ADDRESS_REGEX, { message: 'sourceAccount must be a valid Stellar address' })
  sourceAccount!: string;

  @ApiPropertyOptional({
    description:
      `Optional text memo to attach to the transaction. ` +
      `Must not exceed ${STELLAR_MEMO_MAX_BYTES} bytes when UTF-8 encoded — ` +
      `Stellar's hard limit for text memos.`,
    example: 'escrow-payout-ref-001',
  })
  @IsOptional()
  @IsString()
  @MaxLength(STELLAR_MEMO_MAX_BYTES, {
    message: `memo must not exceed ${STELLAR_MEMO_MAX_BYTES} characters`,
  })
  memo?: string;
}

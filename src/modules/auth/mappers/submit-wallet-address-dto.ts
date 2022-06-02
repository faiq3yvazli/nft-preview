import { SubmitWalletAddressDto } from '../dtos/submit-wallet-address';

export class SubmitWalletAddressDtoMapper {
  public static toPersistence(dto: SubmitWalletAddressDto) {
    return {
      username: dto.username,
      address: dto.walletAddress,
    };
  }
}

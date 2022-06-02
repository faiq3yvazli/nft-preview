import { SignInDto } from '../dtos/sign-in';

export class SignInDtoMapper {
  public static toPersistence(dto: SignInDto) {
    return {
      address: dto.walletAddress,
      signature: dto.signature,
      token: dto.ssoToken,
    };
  }
}

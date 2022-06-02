import { SignUpDto } from '../dtos/sign-up';

export class SignUpDtoMapper {
  public static toPersistence(dto: SignUpDto) {
    return {
      address: dto.walletAddress,
      signature: dto.signature,
      username: dto.username,
      email: dto.email,
      enrollerId: 40019,
    };
  }
}

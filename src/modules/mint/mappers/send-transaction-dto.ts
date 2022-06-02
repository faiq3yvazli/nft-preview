import { SendTransactionDto } from '../dtos/send-transaction';

export class SendTransactionDtoMapper {
  public static toPersistence(values: SendTransactionDto) {
    return {
      hash: values.hash,
      phase: values.phase,
      tokenType: values.tokenType,
      amount: values.quantity,
      data: values.data,
      planId: values.planId,
    };
  }
}

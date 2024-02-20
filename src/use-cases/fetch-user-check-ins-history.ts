import { FetchUserCheckInsHistoryReply } from '@/interfaces/Iuse-cases/Ifetch-member-check-ins-history-reply';
import { FetchUserCheckInsHistoryRequest } from '@/interfaces/Iuse-cases/Ifetch-member-check-ins-history-request';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

export class FetchUserCheckInsHistoryUseCase {
  private checkInsRepository: CheckInsRepository;

  constructor(checkInsRepo: CheckInsRepository) {
    this.checkInsRepository = checkInsRepo;
  }

  async execute({ userId, page }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryReply> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);

    return {
      checkIns,
    };
  }
}

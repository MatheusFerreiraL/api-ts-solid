import { GetUserMetricsUseCaseReply } from '@/interfaces/Iuse-cases/Iget-user-metrics-reply';
import { GetUserMetricsUseCaseRequest } from '@/interfaces/Iuse-cases/Iget-user-metrics-request';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

export class GetUserMetricsUseCase {
  private checkInsRepository: CheckInsRepository;

  constructor(checkInsRepo: CheckInsRepository) {
    this.checkInsRepository = checkInsRepo;
  }

  async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseReply> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}

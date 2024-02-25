import { CheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { GetUserMetricsUseCase } from '../get-user-metrics';

export function makeGetUserProfileUseCase() {
  const checkinsRepository = new CheckInsRepository();
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkinsRepository);

  return getUserMetricsUseCase;
}

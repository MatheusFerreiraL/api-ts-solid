import { CheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history';

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInRepository = new CheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInRepository);

  return useCase;
}

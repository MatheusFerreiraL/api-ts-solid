import { CheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { GymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { CheckInUseCase } from '../check-in';

export function makeCheckInUseCase() {
  const checkInRepository = new CheckInsRepository();
  const gymsRepository = new GymsRepository();
  const useCase = new CheckInUseCase(checkInRepository, gymsRepository);

  return useCase;
}

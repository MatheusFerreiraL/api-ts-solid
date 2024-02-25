import { GymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms';

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new GymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}

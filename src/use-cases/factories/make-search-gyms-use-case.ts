import { GymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { SearchGymsUseCase } from '../search-gyms';

export function makeSearchGymsUseCase() {
  const gymsRepository = new GymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}

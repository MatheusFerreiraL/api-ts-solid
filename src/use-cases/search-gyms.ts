import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export interface SearchGymsRequest {
  query: string;
  page: number;
}

export interface SearchGymsReply {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  private gymsRepository: GymsRepository;

  constructor(gymsRepo: GymsRepository) {
    this.gymsRepository = gymsRepo;
  }

  async execute({ query, page }: SearchGymsRequest) {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return {
      gyms,
    };
  }
}

import { FetchNearbyGymsReply } from '@/interfaces/Iuse-cases/Ifetch-nearby-gyms-use-case-reply';
import { FetchNearbyGymsRequest } from '@/interfaces/Iuse-cases/Ifetch-nearby-gyms-use-case-request';
import { GymsRepository } from '@/repositories/gyms-repository';

export class FetchNearbyGymsUseCase {
  private gymsRepository: GymsRepository;

  constructor(gymsRepo: GymsRepository) {
    this.gymsRepository = gymsRepo;
  }

  async execute({ userLatitude, userLongitude }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsReply> {
    const gyms = await this.gymsRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude });

    return {
      gyms,
    };
  }
}

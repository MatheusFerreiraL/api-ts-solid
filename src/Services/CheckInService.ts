import { ICheckInServiceRequest } from '@/Interfaces/ICheckInServiceRequest';
import { ICheckInsRepositoy } from '@/Interfaces/ICheckInsRepository';

export class CheckInService {
  private checkInsRepository: ICheckInsRepositoy;

  constructor(checkInsRepo: ICheckInsRepositoy) {
    this.checkInsRepository = checkInsRepo;
  }

  async execute({ userId, gymId }: ICheckInServiceRequest) {
    const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId });

    return { checkIn };
  }
}

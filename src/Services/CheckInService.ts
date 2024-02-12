import { ICheckInServiceRequest } from '@/Interfaces/IServices/ICheckInServiceRequest';
import { ICheckInsRepositoy } from '@/Interfaces/IRepositories/ICheckInsRepository';
import { IGymsRepository } from '@/Interfaces/IRepositories/IGymsRepository';
import { ResourceNotFoundError } from '@/Errors/ResourceNotFoundError';
import { getDistanceBetweenCoordinates } from '@/Utils/GetDistanceBetweenCoordinates';

const MAX_DISTANCE_IN_KILOMETERS = 0.1;

export class CheckInService {
  private checkInsRepository: ICheckInsRepositoy;

  private gymsRepository: IGymsRepository;

  constructor(checkInsRepo: ICheckInsRepositoy, gymsRepo: IGymsRepository) {
    this.checkInsRepository = checkInsRepo;
    this.gymsRepository = gymsRepo;
  }

  async execute({ userId, gymId, userLatitude, userLongitude }: ICheckInServiceRequest) {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) throw new ResourceNotFoundError();

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    if (distance > MAX_DISTANCE_IN_KILOMETERS) throw new Error();

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());
    const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId });

    if (checkInOnSameDay) throw new Error();

    return { checkIn };
  }
}

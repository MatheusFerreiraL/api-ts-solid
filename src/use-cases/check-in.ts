import { ICheckInsRepository } from '@/interfaces/Irepositories/Icheck-ins-repository';
import { IGymsRepository } from '@/interfaces/Irepositories/Igyms-repository';
import { ICheckInUseCaseRequest } from '@/interfaces/Iuse-cases/Icheck-in-use-case-request';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

const MAX_DISTANCE_IN_KILOMETERS = 0.1;

export class CheckInUseCase {
  private checkInsRepository: ICheckInsRepository;

  private gymsRepository: IGymsRepository;

  constructor(checkInsRepo: ICheckInsRepository, gymsRepo: IGymsRepository) {
    this.checkInsRepository = checkInsRepo;
    this.gymsRepository = gymsRepo;
  }

  async execute({ userId, gymId, userLatitude, userLongitude }: ICheckInUseCaseRequest) {
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

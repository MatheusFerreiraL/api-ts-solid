import { ICheckInsRepository } from '@/interfaces/Irepositories/Icheck-ins-repository';
import { IValidateCheckInUseCaseRequest } from '@/interfaces/Iuse-cases/Ivalidate-check-in-use-case-request';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import dayjs from 'dayjs';
import { LateCheckInValidationErrro } from './errors/late-check-in-validation-error';

export class ValidateCheckInUseCase {
  private checkInsRepository: ICheckInsRepository;

  constructor(checkInsRepo: ICheckInsRepository) {
    this.checkInsRepository = checkInsRepo;
  }

  async execute({ checkInId }: IValidateCheckInUseCaseRequest) {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) throw new ResourceNotFoundError();

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes'); // metodo devolve a distancia entre duas datas (segundo parametro informa em que formato essa diferença deve vir)

    if (distanceInMinutesFromCheckInCreation > 20) throw new LateCheckInValidationErrro();

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}

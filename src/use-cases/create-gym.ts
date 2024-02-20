import { IGymsRepository } from '@/interfaces/Irepositories/Igyms-repository';
import { ICreateGymUseCaseReply } from '@/interfaces/Iuse-cases/Icreate-gym-use-case-reply';
import { ICreateGymUseCaseRequest } from '@/interfaces/Iuse-cases/Icreate-gym-use-case-request';

export class CreateGymUseCase {
  private gymsRepository: IGymsRepository;

  constructor(gymsRepo: IGymsRepository) {
    this.gymsRepository = gymsRepo;
  }

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: ICreateGymUseCaseRequest): Promise<ICreateGymUseCaseReply> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }
}

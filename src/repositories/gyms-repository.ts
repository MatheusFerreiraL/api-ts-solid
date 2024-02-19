import { IGymsRepository } from '@/interfaces/Irepositories/Igyms-repository';

export class GymsRepository implements IGymsRepository {
  findById(id: string) {
    return id;
  }
}

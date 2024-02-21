import { Gym, Prisma } from '@prisma/client';
import { FindManyNearbyParams } from '../Ifind-many-nearby-params';

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
}
